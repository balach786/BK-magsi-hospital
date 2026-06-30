/**
 * BK Baloch Hospital — Google Apps Script Backend
 * --------------------------------------------------------------
 * 1. Open Google Sheets → create a spreadsheet "BKBH Database".
 * 2. Extensions → Apps Script → paste this file as Code.gs.
 * 3. Set SPREADSHEET_ID below to your spreadsheet ID.
 * 4. Set DRIVE_FOLDER_ID to a Drive folder for resumes/reports.
 * 5. Deploy → New deployment → Type "Web app" →
 *      Execute as: Me · Access: Anyone.
 * 6. Copy the /exec URL and paste into Vercel env VITE_APPS_SCRIPT_URL.
 *
 * Sheets auto-created on first run:
 *   Appointments | Doctors | Departments | Patients | LabReports
 *   Feedback | Careers | AmbulanceRequests | Announcements | Contacts
 */

const SPREADSHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';
const DRIVE_FOLDER_ID = 'PASTE_YOUR_DRIVE_FOLDER_ID_HERE';
const HOSPITAL = { name: 'BK Baloch Hospital', short: 'BKBH', email: 'info@bkbalochhospital.com' };

const HEADERS = {
  Appointments: ['Appointment ID','Timestamp','Patient Name','Father','Age','Gender','CNIC','Mobile','Email','Address','Department','Doctor','Date','Time','Problem','Status'],
  Doctors: ['Doctor ID','Name','Department','Qualification','Experience','Fee','Availability'],
  Departments: ['Department ID','Name','Description','Head Doctor'],
  Patients: ['Patient ID','Name','CNIC','Mobile','Email','Address'],
  LabReports: ['Report ID','CNIC','Test','Date','Drive Link','Status'],
  Feedback: ['Name','Rating','Comment','Timestamp'],
  Careers: ['Timestamp','Name','Email','Position','Resume Link','Status'],
  AmbulanceRequests: ['Request ID','Timestamp','Name','Phone','Address','Emergency','Status'],
  Announcements: ['Title','Description','Date'],
  Contacts: ['Timestamp','Name','Email','Subject','Message'],
};

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const action = body.action;
    let result;
    switch (action) {
      case 'createAppointment': result = createAppointment(body); break;
      case 'lookupPatient': result = lookupPatient(body); break;
      case 'getLabReport': result = getLabReport(body); break;
      case 'submitFeedback': result = appendRow_('Feedback', [body.name, body.rating, body.comment, new Date()]); break;
      case 'submitContact': result = appendRow_('Contacts', [new Date(), body.name, body.email, body.subject, body.message]); break;
      case 'submitCareer': result = submitCareer(body); break;
      case 'submitAmbulance': result = submitAmbulance(body); break;
      default: result = { success: false, error: 'Unknown action' };
    }
    return jsonOut_(result);
  } catch (err) {
    return jsonOut_({ success: false, error: String(err) });
  }
}

function doGet() {
  return ContentService.createTextOutput('BKBH Apps Script running.').setMimeType(ContentService.MimeType.TEXT);
}

/* ---------- handlers ---------- */
function createAppointment(b) {
  const sheet = getSheet_('Appointments');
  const id = nextAppointmentId_(sheet);
  sheet.appendRow([id, new Date(), b.fullName, b.fatherName, b.age, b.gender, b.cnic, b.mobile, b.email, b.address, b.department, b.doctor, b.date, b.time, b.problem, 'Confirmed']);
  if (b.email) {
    try {
      MailApp.sendEmail({
        to: b.email,
        subject: `${HOSPITAL.short} Appointment Confirmation — ${id}`,
        htmlBody: `<h2>${HOSPITAL.name}</h2><p>Dear ${b.fullName},</p>
          <p>Your appointment is confirmed.</p>
          <p><b>ID:</b> ${id}<br><b>Doctor:</b> ${b.doctor}<br><b>Date/Time:</b> ${b.date} ${b.time}</p>
          <p>Thank you for choosing ${HOSPITAL.name}.</p>`,
      });
    } catch (e) {}
  }
  return { success: true, appointmentId: id };
}

function lookupPatient(b) {
  const sheet = getSheet_('Appointments');
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if ((b.appointmentId && row[0] === b.appointmentId) || (b.cnic && row[6] === b.cnic)) {
      return { success: true, found: true, patient: {
        appointmentId: row[0], name: row[2], cnic: row[6], doctor: row[11], department: row[10],
        date: row[12], time: row[13], status: row[15], prescription: '', reports: [],
      }};
    }
  }
  return { success: true, found: false };
}

function getLabReport(b) {
  const data = getSheet_('LabReports').getDataRange().getValues();
  for (let i = 1; i < data.length; i++) if (data[i][0] === b.reportId) return { success: true, url: data[i][4] };
  return { success: false };
}

function submitCareer(b) {
  let link = '';
  if (b.resume && DRIVE_FOLDER_ID !== 'PASTE_YOUR_DRIVE_FOLDER_ID_HERE') {
    try {
      const m = b.resume.match(/^data:(.+);base64,(.+)$/);
      if (m) {
        const blob = Utilities.newBlob(Utilities.base64Decode(m[2]), m[1], `${b.name}_resume`);
        const file = DriveApp.getFolderById(DRIVE_FOLDER_ID).createFile(blob);
        link = file.getUrl();
      }
    } catch (e) {}
  }
  appendRow_('Careers', [new Date(), b.name, b.email, b.position, link, 'Received']);
  return { success: true };
}

function submitAmbulance(b) {
  const id = 'AMB-' + new Date().getFullYear() + '-' + Utilities.formatString('%06d', Math.floor(Math.random() * 999999));
  appendRow_('AmbulanceRequests', [id, new Date(), b.name, b.phone, b.address, b.emergency, 'Dispatched']);
  return { success: true, requestId: id };
}

/* ---------- helpers ---------- */
function jsonOut_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
function getSheet_(name) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let s = ss.getSheetByName(name);
  if (!s) { s = ss.insertSheet(name); s.appendRow(HEADERS[name]); }
  return s;
}
function appendRow_(name, row) { getSheet_(name).appendRow(row); return { success: true }; }
function nextAppointmentId_(sheet) {
  const year = new Date().getFullYear();
  const last = sheet.getLastRow();
  let seq = 1;
  if (last > 1) {
    for (let r = last; r >= 2; r--) {
      const id = sheet.getRange(r, 1).getValue();
      if (typeof id === 'string' && id.indexOf(HOSPITAL.short + '-' + year) === 0) {
        seq = parseInt(id.split('-')[2], 10) + 1; break;
      }
    }
  }
  return `${HOSPITAL.short}-${year}-${Utilities.formatString('%06d', seq)}`;
}
