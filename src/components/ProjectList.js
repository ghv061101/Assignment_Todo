// src/components/ProjectList.js
import React, { useState, useContext } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProjectList = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');

  const handleAddProject = () => {
    if (newProject.trim()) {
      setProjects([...projects, newProject]);
      setNewProject('');
    }
  };

  if (!user) {
    return (
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6">You need to login to view your projects.</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Todo Projects</Typography>
      <TextField
        label="New Project"
        value={newProject}
        onChange={(e) => setNewProject(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleAddProject}>Add Project</Button>

      <List sx={{ marginTop: 2 }}>
        {projects.map((project, index) => (
          <ListItem button key={index} component={Link} to={`/project/${index}`}>
            <ListItemText primary={project} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ProjectList;
