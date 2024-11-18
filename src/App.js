// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import ProjectList from './components/ProjectList';
import Project from './components/Project';
import Navbar from './components/NavContainer';
import Login from './components/Login';

const theme = createTheme();

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path='/login' element={<Login />}/>
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/project/:projectId" element={<Project />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
