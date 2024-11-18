import React, { useContext, useState } from "react";
import {
  Button,
  //   AppBar,
  //   Toolbar,
  Typography,
  //   Container,
  TextField,
  Box,
} from "@mui/material";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  //   signOut,
} from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
function Login() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // To toggle between login and register
  const [error, setError] = useState("");

  const handleAuth = async () => {
    setError("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box sx={{mt:3}}>
      <div>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/projects">
              Projects
            </Button>
          </>
        ) : (
          <Box>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              sx={{ marginBottom: 1 }}
            />
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              fullWidth
              sx={{ marginBottom: 1 }}
            />
            <Button variant="contained" onClick={handleAuth}>
              {isLogin ? "Login" : "Register"}
            </Button>
            <Button onClick={() => setIsLogin(!isLogin)} sx={{ marginTop: 1 }}>
              {isLogin ? "Create an account" : "Already have an account?"}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
          </Box>
        )}
      </div>
    </Box>
  );
}

export default Login;
