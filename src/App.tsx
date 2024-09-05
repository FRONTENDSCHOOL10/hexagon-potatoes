import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SavingMoneyCard from './components/SavingMoneyCard/SavingMoneyCard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/tutorial" element={<SavingMoneyCard />} />
      </Routes>
    </Router>
  );
};

export default App;
