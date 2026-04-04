import React, { useState } from 'react';
import ProfileSelect from './components/ProfileSelect.jsx';
import HomePage from './components/HomePage.jsx';

export default function App() {
  const [selectedProfile, setSelectedProfile] = useState(null);

  if (!selectedProfile) {
    return <ProfileSelect onSelect={setSelectedProfile} />;
  }

  return <HomePage selectedProfile={selectedProfile} onSwitchProfile={() => setSelectedProfile(null)} />;
}
