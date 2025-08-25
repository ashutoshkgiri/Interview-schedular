import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import InterviewList from './components/screens/InterviewList';
import Creation from './components/screens/Creation';
import EditPage from './components/screens/EditPage';

import './App.css';
import AddUser from './components/screens/AddUser';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<InterviewList />} />
        <Route path="/create" element={<Creation />} />
        <Route path="/edit/:meetingId" element={<EditPage />} />
        <Route path="/add-user" element={<AddUser />} />  
      </Routes>
    </BrowserRouter>
  );
}
