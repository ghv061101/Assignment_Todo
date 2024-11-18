// src/components/Navbar.js
import React, { useContext } from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during logout:", error.message);
      });
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">
            <Link style={{ textDecoration: "none", color: "white" }} to="/">
              Todo Manager
            </Link>
          </Typography>

          {user ? (
            <Button style={{ color: "white" }} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to="/login"
            >
              Login
            </Link>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
