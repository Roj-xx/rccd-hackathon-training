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
};

export const detection = {
  result: 'Possible person detected',
  searchArea: 'Building A - Sector 03',
  visibility: 'Partially visible',
  movement: 'Appears immobile',
  access: 'Appears obstructed',
  priority: 'High',
};

export const assessmentOptions = {
  visibility: ['Partially visible', 'Clearly visible', 'Not visible'],
  movement: ['Appears immobile', 'Seen moving', 'Unknown'],
  access: ['Appears obstructed', 'Accessible', 'Unknown'],
  condition: ['Possible injured/trapped', 'Appears stable', 'Unknown'],
  priority: ['High', 'Medium', 'Low'],
};

export const defaultAssessment = {
  visibility: detection.visibility,
  movement: detection.movement,
  access: detection.access,
  condition: 'Possible injured/trapped',
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
  },
  {
    id: 'RPT-0139',
    location: 'Warehouse B - Sector 02',
    status: 'Dismissed',
    priority: 'Low',
    time: '06 Oct 2026, 07:21 AM',
  },
];

export const defaultReport = {
  id: 'C-001',
  status: 'Possible Casualty',
  location: 'Building A - Sector 03',
  detection: detection.result,
  assessment: ['Partially visible', 'Appears immobile', 'Appears obstructed'],
  condition: 'Possible injured/trapped',
  priority: 'High',
  verifiedBy: 'Responder Juan Dela Cruz',
  timestamp: '06 Oct 2026, 09:42 AM',
  notes:
    'Position observed through collapsed section of corridor. Approach from east stairwell. Confirm before entry.',
};

export const mockTimestamp = '06 Oct 2026, 09:42 AM';
