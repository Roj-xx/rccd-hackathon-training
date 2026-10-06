import { useState } from 'react';
import AppHeader from './components/AppHeader.jsx';
import ResponderHome from './screens/ResponderHome.jsx';
import CameraInspection from './screens/CameraInspection.jsx';
import CasualtyVerification from './screens/CasualtyVerification.jsx';
import RescueTeamView from './screens/RescueTeamView.jsx';
import { defaultReport, detection, mockTimestamp, responder } from './data/mockData.js';

const STEPS = [
  { id: 'home', short: 'Home' },
  { id: 'camera', short: 'Camera' },
  { id: 'verification', short: 'Verify' },
  { id: 'rescue', short: 'Rescue' },
];

const BACK_TARGETS = {
  camera: { screen: 'home', label: 'Home' },
  verification: { screen: 'camera', label: 'Camera' },
  rescue: { screen: 'home', label: 'Home' },
};

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

  const back = BACK_TARGETS[screen];

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
      <AppHeader
        steps={STEPS}
        currentStepId={screen}
        onBack={back ? () => setScreen(back.screen) : undefined}
        backLabel={back?.label}
      />

      <main className="screen" key={screen}>
        {screen === 'home' && (
          <ResponderHome onStart={() => setScreen('camera')} />
        )}

        {screen === 'camera' && (
          <CameraInspection onConfirmDetection={handleConfirmDetection} />
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
      </main>
    </div>
  );
}
