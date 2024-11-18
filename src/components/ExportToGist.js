// src/components/ExportToGist.js
import React, { useState } from 'react';
import axios from 'axios';
import { Button, CircularProgress, Snackbar, Alert } from '@mui/material';

const ExportToGist = ({ project }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const exportToGist = async () => {
    setIsExporting(true);

    const completedTodos = project.todos.filter(todo => todo.completed).length;
    const totalTodos = project.todos.length;
    const markdownContent = `
 ${project.title}

${completedTodos} / ${totalTodos} completed.

${project.todos.filter(todo => !todo.completed).map(todo => `- [ ] ${todo.task}`).join('\n')}

${project.todos.filter(todo => todo.completed).map(todo => `- [x] ${todo.task}`).join('\n')}
`;

    const gistData = {
      files: {
        [`${project.title}.md`]: {
          content: markdownContent,
        },
      },
      public: false,
    };

    try {
      const response = await axios.post(
        'https://api.github.com/gists',
        gistData,
        {
          headers: {
            Authorization: `token YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`,
          },
        }
      );
      setSnackbarMessage('Export successful! View your gist at ' + response.data.html_url);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error exporting gist:', error);
      setSnackbarMessage('Failed to export Gist');
      setOpenSnackbar(true);
    }

    setIsExporting(false);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={exportToGist}
        disabled={isExporting}
        fullWidth
      >
        {isExporting ? <CircularProgress size={24} /> : 'Export to GitHub as Gist'}
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity={snackbarMessage.includes('Failed') ? 'error' : 'success'}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ExportToGist;
