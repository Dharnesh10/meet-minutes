import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';
import ThemeProvider from './components/ThemeProvider.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Tasks from './pages/Mytasks.jsx';
import AssignedTasks from './pages/AssignedTasks.jsx';
import MeetingDetails from './pages/MeetingDetails.jsx';
import Minutes from './pages/Minutes.jsx';
import MyCalendar from './components/Calendar.jsx';

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div style={{ flexGrow: 1 }}>
        <Navbar sidebarOpen={sidebarOpen} />
        <div style={{ marginTop: 64, padding: 20 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="assigned-tasks" element={<AssignedTasks />} />
            <Route path="meeting-details" element={<MeetingDetails />} />
            <Route path="minutes" element={<Minutes />} />
            <Route path="calendar" element={<MyCalendar />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
