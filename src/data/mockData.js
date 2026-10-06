export const appInfo = {
  name: 'Remote Camera Casualty Detection',
  description:
    'A field prototype that assists responders in inspecting unsafe or obstructed areas using a portable camera, verifying possible detections, and recording casualty reports for the rescue team.',
  workflow: [
    'Responder',
    'Portable Camera',
    'Computer Vision',
    'Responder Verification',
    'Rescue Team',
  ],
};

export const responder = {
  name: 'Juan Dela Cruz',
  role: 'Frontline Responder',
  operation: 'Disaster Response Operation',
  searchArea: 'Building A - Sector 03',
};

export const camera = {
  viewLabel: 'CAMERA VIEW',
  status: 'Simulation Mode',
  device: 'Portable Cam Unit 01',
  inspection: 'INSP-0042',
  battery: '86%',
  connection: 'Camera Connected',
};

export const operationStatus = 'Active';

export const detection = {
  result: 'Possible person detected',
  searchArea: 'Building A - Sector 03',
  visibility: 'Partially visible',
  movement: 'Appears immobile',
  access: 'Obstructed',
  priority: 'High',
  cvLabel: 'PERSON',
  confidence: 87,
  detectedAt: '06 Oct 2026, 09:41 AM',
};

export const scanSteps = [
  'Detecting objects...',
  'Scanning visible area...',
  'Analyzing frame...',
];

export const assessmentOptions = {
  visibility: ['Clearly visible', 'Partially visible', 'Not visible'],
  movement: ['Appears mobile', 'Appears immobile', 'Unable to determine'],
  condition: [
    'No obvious injury',
    'Possible injured',
    'Severely injured',
    'Unable to determine',
  ],
  access: ['Accessible', 'Obstructed', 'Appears trapped'],
  priority: ['Low', 'Medium', 'High', 'Critical'],
};

export const defaultAssessment = {
  visibility: detection.visibility,
  movement: detection.movement,
  access: detection.access,
  condition: 'Possible injured',
  priority: detection.priority,
  notes: '',
};

export const recentReports = [
  {
    id: 'RPT-0142',
    location: 'Building A - Sector 01',
    status: 'Possible Casualty',
    priority: 'Medium',
    time: '06 Oct 2026, 07:58 AM',
    responder: 'Responder Maria Santos',
    visibility: 'Clearly visible',
    movement: 'Appears immobile',
    condition: 'Possible injured',
    detection: 'Possible person detected',
    notes:
      'Observed through corridor camera near east stairwell. Approach route appears clear.',
  },
  {
    id: 'RPT-0139',
    location: 'Warehouse B - Sector 02',
    status: 'Dismissed',
    priority: 'Low',
    time: '06 Oct 2026, 07:21 AM',
    responder: 'Responder Juan Dela Cruz',
    visibility: 'Not visible',
    movement: 'Unable to determine',
    condition: 'No obvious injury',
    detection: 'Dismissed after review',
    notes:
      'No person confirmed in frame after a second scan. Area flagged for re-check.',
  },
];

export const defaultReport = {
  id: 'C-001',
  status: 'Possible Casualty',
  location: 'Building A - Sector 03',
  detection: detection.result,
  assessment: ['Partially visible', 'Appears immobile', 'Obstructed'],
  condition: 'Possible injured',
  priority: 'High',
  verifiedBy: 'Responder Juan Dela Cruz',
  timestamp: '06 Oct 2026, 09:42 AM',
  notes:
    'Position observed through collapsed section of corridor. Approach from east stairwell. Confirm before entry.',
};

export const mockTimestamp = '06 Oct 2026, 09:42 AM';
