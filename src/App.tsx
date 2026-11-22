import React from 'react';
import { StudioProvider } from './context/StudioContext';
import { StudioLayout } from './components/layout/StudioLayout';

export const App: React.FC = () => {
  return (
    <StudioProvider>
      <StudioLayout />
    </StudioProvider>
  );
};

export default App;
