import React from 'react';
import Namespace from './components/Namespace';
const App = () => {
  if (!localStorage.getItem('name')) {
    try {
      localStorage.setItem('name', window.prompt('Username: '))
    } catch {
      localStorage.setItem('name', 'Jasmine')
    }
  }
  return (
    <div className="container">
      <Namespace />
    </div>
  );
}

export default App;
