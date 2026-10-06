import { useState } from 'react';
import AppSidebar from './components/AppSidebar.jsx';
import ResponderHome from './screens/ResponderHome.jsx';
import CameraInspection from './screens/CameraInspection.jsx';
import CasualtyVerification from './screens/CasualtyVerification.jsx';
import RescueTeamView from './screens/RescueTeamView.jsx';
import { defaultReport, detection, mockTimestamp, responder } from './data/mockData.js';

function buildReport(assessment) {
  return {
    ...defaultReport,
    assessment: [assessment.visibility, assessment.movement, assessment.access],
    condition: assessment.condition,
    priority: assessment.priority,
    notes:
      assessment.notes.trim() ||
      'No additional notes recorded by the responder.',
    verifiedBy: `Responder ${responder.name}`,
    timestamp: mockTimestamp,
  };
}

export default function App() {
  const [screen, setScreen] = useState('home');
  const [report, setReport] = useState(null);
  const [verificationStart, setVerificationStart] = useState('review');

  const handleSave = (assessment) => {
    setReport(buildReport(assessment));
    setScreen('rescue');
  };

  const handleConfirmDetection = () => {
    setVerificationStart('assessment');
    setScreen('verification');
  };

  return (
    <div className="app">
      <AppSidebar current={screen} onNavigate={setScreen} />

      <div className="app__main" key={screen}>
        {screen === 'home' && (
          <ResponderHome onStart={() => setScreen('camera')} />
        )}

        {screen === 'camera' && (
          <CameraInspection
            onBack={() => setScreen('home')}
            onConfirmDetection={handleConfirmDetection}
          />
        )}

        {screen === 'verification' && (
          <CasualtyVerification
            startPhase={verificationStart}
            onDismiss={() => setScreen('camera')}
            onSave={handleSave}
          />
        )}

        {screen === 'rescue' && (
          <RescueTeamView
            report={report ?? { ...defaultReport, detection: detection.result }}
            onStartNew={() => setScreen('home')}
          />
        )}
      </div>
    </div>
  );
}
