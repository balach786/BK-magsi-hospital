# BK Baloch Hospital — Google Apps Script Backend

This folder contains the Apps Script that powers every form on the
website (appointments, contact, feedback, ambulance, careers, lab reports).

## Setup

1. Create a new Google Sheet named **BKBH Database**.
2. Open **Extensions → Apps Script** and paste `Code.gs` into the editor.
3. Set:
   - `SPREADSHEET_ID` — the ID in your Sheet's URL.
   - `DRIVE_FOLDER_ID` — a Drive folder to store resumes & lab reports.
4. Click **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the generated `/exec` URL.
6. In Vercel (or `.env.local`) set:

   ```
   VITE_APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXX/exec
   ```

The frontend automatically falls back to a mock response when the URL
is missing, so the UI is fully usable during development.

## Deployment (GitHub + Vercel)

1. Push to GitHub.
2. Import the repo in Vercel.
3. Add the env var `VITE_APPS_SCRIPT_URL`.
4. Deploy. Done.
