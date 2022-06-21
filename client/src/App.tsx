import React from 'react';
import './css/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Summary, TodoList } from './components/Index';

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/:id" element={<TodoList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
