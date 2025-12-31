import { google } from 'googleapis';

// Initialize Google Sheets API client
const getGoogleSheetsClient = () => {
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error('Missing Google Sheets credentials');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
};

const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

// Sheet names
export const SHEETS = {
  PROJECTS: 'Projects',
  PROJECT_DETAILS: 'Project Details',
  SKILLS: 'Skills',
  SOCIAL_LINKS: 'Social Links',
  SITE_COPY: 'Site Copy',
  VISITOR_LOGS: 'Visitor Logs',
  MESSAGES: 'Messages',
};

// Get all projects
export async function getProjects() {
  const sheets = getGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.PROJECTS}!A2:I`,
  });

  const rows = response.data.values || [];
  return rows.map((row) => ({
    id: row[0] || '',
    title: row[1] || '',
    description: row[2] || '',
    image: row[3] || '',
    techStack: row[4] ? row[4].split(',').map((t: string) => t.trim()) : [],
    githubUrl: row[5] || '',
    order: parseInt(row[6] || '0'),
    liveUrl: row[7] || '',
    specialTag: row[8] || '',
  }));
}

// Get project details by ID
export async function getProjectDetails(id: string) {
  const sheets = getGoogleSheetsClient();

  // Get project details (A-L: id, problem, whatIBuilt, architecture, hardProblems, tradeoffs, improvements, deepDive, demoUrl, tags, githubURL, ui_snapshots)
  const detailsResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.PROJECT_DETAILS}!A2:L`,
  });

  // Get basic project info (for title, liveUrl)
  const projectsResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.PROJECTS}!A2:I`,
  });

  const detailRows = detailsResponse.data.values || [];
  const projectRows = projectsResponse.data.values || [];

  const details = detailRows.find((row) => row[0] === id);
  const projectInfo = projectRows.find((row) => row[0] === id);

  if (!details) return null;

  // Parse ui_snapshots - remove brackets if present
  let uiSnapshots: string[] = [];
  if (details[11]) {
    let snapshotsStr = details[11].trim();
    // Remove surrounding brackets if present
    if (snapshotsStr.startsWith('[') && snapshotsStr.endsWith(']')) {
      snapshotsStr = snapshotsStr.slice(1, -1);
    }
    uiSnapshots = snapshotsStr.split('|').map((t: string) => t.trim()).filter(Boolean);
  }

  return {
    id: details[0] || '',
    title: projectInfo?.[1] || details[0] || '',
    liveUrl: projectInfo?.[7] || '',
    problem: details[1] || '',
    whatIBuilt: details[2] ? details[2].split('|').map((t: string) => t.trim()) : [],
    architecture: details[3] || '',
    hardProblems: details[4] ? details[4].split('|').map((t: string) => t.trim()) : [],
    tradeoffs: details[5] ? details[5].split('|').map((t: string) => t.trim()) : [],
    improvements: details[6] ? details[6].split('|').map((t: string) => t.trim()) : [],
    deepDive: details[7] || '',
    demoUrl: details[8] || '',
    tags: details[9] ? details[9].split(',').map((t: string) => t.trim()) : [],
    githubUrl: details[10] || '',
    uiSnapshots,
  };
}

// Get skills grouped by category
export async function getSkills() {
  const sheets = getGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.SKILLS}!A2:C`,
  });

  const rows = response.data.values || [];
  const grouped: Record<string, string[]> = {};

  rows.forEach((row) => {
    const category = row[0] || '';
    const skill = row[1] || '';
    if (category && skill) {
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(skill);
    }
  });

  return grouped;
}

// Get social links
export async function getSocialLinks() {
  const sheets = getGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.SOCIAL_LINKS}!A2:E`,
  });

  const rows = response.data.values || [];
  return rows.map((row) => ({
    name: row[0] || '',
    url: row[1] || '',
    icon: row[2] || '',
    iconLight: row[3] || '',
    iconDark: row[4] || '',
  }));
}

// Get site copy
export async function getSiteCopy() {
  const sheets = getGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.SITE_COPY}!A2:B`,
  });

  const rows = response.data.values || [];
  const copy: Record<string, string> = {};

  rows.forEach((row) => {
    const key = row[0] || '';
    const value = row[1] || '';
    if (key) copy[key] = value;
  });

  return copy;
}

// Save a message
export async function saveMessage(name: string, email: string, message: string) {
  const sheets = getGoogleSheetsClient();
  const timestamp = new Date().toISOString();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.MESSAGES}!A:D`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[timestamp, name, email, message]],
    },
  });

  return { success: true };
}

// Log visitor with comprehensive data
export async function logVisitor(visitorData: {
  timestamp: string;
  visitorId: string;
  ip: string;
  country: string;
  region: string;
  city: string;
  timezone: string;
  isp: string;
  userAgent: string;
  referrer: string;
  latitude: string;
  longitude: string;
  source: string;
  status: string;
  path: string;
}) {
  const sheets = getGoogleSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.VISITOR_LOGS}!A:O`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[
        visitorData.timestamp,
        visitorData.visitorId,
        visitorData.ip,
        visitorData.country,
        visitorData.region,
        visitorData.city,
        visitorData.timezone,
        visitorData.isp,
        visitorData.userAgent,
        visitorData.referrer,
        visitorData.latitude,
        visitorData.longitude,
        visitorData.source,
        visitorData.status,
        visitorData.path,
      ]],
    },
  });
}

// Check if visitor exists
export async function checkVisitorExists(visitorId: string): Promise<boolean> {
  try {
    const sheets = getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.VISITOR_LOGS}!B:B`,
    });

    const rows = response.data.values || [];
    return rows.some(row => row[0] === visitorId);
  } catch (error) {
    console.error('Error checking visitor existence:', error);
    return false;
  }
}

// Get visitor count
export async function getVisitorCount() {
  const sheets = getGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.VISITOR_LOGS}!A:A`,
  });

  const rows = response.data.values || [];
  return rows.length - 1; // Subtract header row
}

// Add/Update project (Admin)
export async function upsertProject(project: any) {
  const sheets = getGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.PROJECTS}!A2:G`,
  });

  const rows = response.data.values || [];
  const existingIndex = rows.findIndex((row) => row[0] === project.id);

  const row = [
    project.id,
    project.title,
    project.description,
    project.image,
    project.techStack.join(', '),
    project.githubUrl,
    project.order.toString(),
  ];

  if (existingIndex >= 0) {
    // Update existing
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.PROJECTS}!A${existingIndex + 2}:G${existingIndex + 2}`,
      valueInputOption: 'RAW',
      requestBody: { values: [row] },
    });
  } else {
    // Add new
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.PROJECTS}!A:G`,
      valueInputOption: 'RAW',
      requestBody: { values: [row] },
    });
  }

  return { success: true };
}

// Add/Update project details (Admin)
export async function upsertProjectDetails(details: any) {
  const sheets = getGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.PROJECT_DETAILS}!A2:J`,
  });

  const rows = response.data.values || [];
  const existingIndex = rows.findIndex((row) => row[0] === details.id);

  const row = [
    details.id,
    details.problem,
    details.whatIBuilt.join('|'),
    details.architecture,
    details.hardProblems.join('|'),
    details.tradeoffs.join('|'),
    details.improvements.join('|'),
    details.deepDive,
    details.demoUrl,
    details.tags.join(', '),
  ];

  if (existingIndex >= 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.PROJECT_DETAILS}!A${existingIndex + 2}:J${existingIndex + 2}`,
      valueInputOption: 'RAW',
      requestBody: { values: [row] },
    });
  } else {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.PROJECT_DETAILS}!A:J`,
      valueInputOption: 'RAW',
      requestBody: { values: [row] },
    });
  }

  return { success: true };
}
