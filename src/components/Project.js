// src/components/Project.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router-dom";
import { createGist } from "../utils/github";

const Project = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({
    title: `Project ${projectId}`,
    todos: [],
  });
  const [newTodo, setNewTodo] = useState("");
  const [token, setToken] = useState(""); // GitHub personal access token
  const [gistUrl, setGistUrl] = useState(null);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setProject({
        ...project,
        todos: [...project.todos, { task: newTodo, completed: false }],
      });
      setNewTodo("");
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = project.todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setProject({ ...project, todos: updatedTodos });
  };

  const deleteTodo = (index) => {
    const updatedTodos = project.todos.filter((_, i) => i !== index);
    setProject({ ...project, todos: updatedTodos });
  };

  const generateGistContent = () => {
    const completedTodos = project.todos.filter((todo) => todo.completed);
    const pendingTodos = project.todos.filter((todo) => !todo.completed);

    const markdown = `
# ${project.title}

**Summary:** ${completedTodos.length} / ${project.todos.length} completed

## Pending Tasks
${pendingTodos.map((todo) => `- [ ] ${todo.task}`).join("\n")}

## Completed Tasks
${completedTodos.map((todo) => `- [x] ${todo.task}`).join("\n")}
    `;
    return markdown.trim();
  };

  const handleExportGist = async () => {
    const content = generateGistContent();
    const fileName = `${project.title}.md`;

    try {
      const url = await createGist(token, fileName, content);
      setGistUrl(url);
      alert(`Gist created! View it here: ${url}`);
    } catch (error) {
      console.error("Failed to export Gist:", error.message);
      alert("Failed to export the Gist. Please check your token and try again.");
    }
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {project.title}
      </Typography>

      <TextField
        label="New Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleAddTodo}>
        Add Todo
      </Button>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Pending Tasks
      </Typography>
      <List>
        {project.todos
          .filter((todo) => !todo.completed)
          .map((todo, index) => (
            <ListItem key={index}>
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleComplete(index)}
              />
              <ListItemText primary={todo.task} />
              <IconButton edge="end" onClick={() => deleteTodo(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
      </List>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Completed Tasks
      </Typography>
      <List>
        {project.todos
          .filter((todo) => todo.completed)
          .map((todo, index) => (
            <ListItem key={index}>
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleComplete(index)}
              />
              <ListItemText primary={todo.task} />
            </ListItem>
          ))}
      </List>

      <Typography variant="h6" sx={{ marginTop: 2 }}>
        Export to Gist
      </Typography>
      <TextField
        label="GitHub Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleExportGist} disabled={!token}>
        Export as Gist
      </Button>

      {gistUrl && (
        <Typography sx={{ marginTop: 2 }}>
          Gist created! View it{" "}
          <a href={gistUrl} target="_blank" rel="noopener noreferrer">
            here
          </a>.
        </Typography>
      )}
    </Paper>
  );
};

export default Project;
