import React from 'react';
import Namespace from './components/Namespace';
const App = () => {
  if (!window.prompt) {

  }
  if (!localStorage.getItem('name')) {
    // The try catch is for Electron.
    // It does not support prompt.
    try {
      localStorage.setItem('name', window.prompt('Username: '))
    } catch {
      localStorage.setItem('name', 'test')
    }
  }
  return (
    <div className="container">
      <Namespace />
    </div>
  );
}

export default App;
