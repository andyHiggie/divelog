import React, { StrictMode } from 'react';
import Home from './pages/Home';
import Toolbar from './components/general/Toolbar';

function App() {

  return (
    <StrictMode>
      <Toolbar />
      <Home />
    </StrictMode>
  )
}

export default App
