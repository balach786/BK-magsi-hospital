/**
 * Google Apps Script API client.
 *
 * Deploy the Apps Script (see `google-apps-script/Code.gs`) as a Web App
 * with "Execute as: Me" and "Who has access: Anyone" — then paste the
 * resulting /exec URL here or as VITE_APPS_SCRIPT_URL in your Vercel env.
 */
export const APPS_SCRIPT_URL =
  (import.meta.env.VITE_APPS_SCRIPT_URL as string | undefined) ||
  "https://script.google.com/macros/s/REPLACE_WITH_YOUR_DEPLOYMENT_ID/exec";

type Payload = Record<string, unknown>;

export async function callApi<T = unknown>(action: string, data: Payload = {}): Promise<T> {
  try {
    const res = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "cors",
      // Apps Script accepts text/plain to avoid CORS preflight
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ action, ...data }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    console.warn("[BKBH API] offline/mock:", err);
    return mockResponse<T>(action, data);
  }
}

/* ------------------------------------------------------------------ */
/* Mock fallback so the UI is fully usable before Apps Script is wired */
/* ------------------------------------------------------------------ */
function mockResponse<T>(action: string, data: Payload): T {
  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 999999)).padStart(6, "0");
  switch (action) {
    case "createAppointment":
      return {
        success: true,
        appointmentId: `BKBH-${year}-${seq}`,
        ...data,
      } as T;
    case "lookupPatient":
      return {
        success: true,
        found: true,
        patient: {
          name: "Demo Patient",
          cnic: (data as any).cnic ?? "",
          appointmentId: (data as any).appointmentId ?? `BKBH-${year}-${seq}`,
          doctor: "Dr. Balach Baloch",
          department: "Cardiology",
          date: new Date().toISOString().slice(0, 10),
          time: "10:30",
          status: "Confirmed",
          prescription: "Tab. Aspirin 75mg OD · Tab. Atorvastatin 20mg HS",
          reports: [],
        },
      } as T;
    case "submitFeedback":
    case "submitContact":
    case "submitCareer":
    case "submitAmbulance":
      return { success: true, message: "Saved (offline mock)" } as T;
    default:
      return { success: true, mock: true } as T;
  }
}

export function nextAppointmentId(): string {
  const year = new Date().getFullYear();
  const seq = String(Math.floor(Math.random() * 999999)).padStart(6, "0");
  return `BKBH-${year}-${seq}`;
}

export function qrUrl(text: string, size = 200): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}`;
}
