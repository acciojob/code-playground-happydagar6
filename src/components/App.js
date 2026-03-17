import React, { useState } from "react";
import "./../styles/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

function PlayGround() {
  return <div>Hi Welcome to Code PlayGround</div>;
}

function Login({ isAuthenticated, onLogin, onLogout }) {
  return (
    <div>
      <h2>Login</h2>
      {isAuthenticated ? (
        <button onClick={onLogout}>Log Out</button>
      ) : (
        <button onClick={onLogin}>Log In</button>
      )}
    </div>
  );
}

function PrivateRoute({ isAuthenticated, children }) {
  if (isAuthenticated === true) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  return (
    <Router>
      <div
        className="main-container"
        style={{ padding: "20px", fontFamily: "sans-serif" }}
      >
        <div>
          {isAuthenticated ? (
            <p>Logged in, Now you can enter Playground</p>
          ) : (
            <p>You are not authenticated, Please login first</p>
          )}
        </div>

        {/* ✅ THE FIX: Links ko bina condition ke hamesha show karna hai aur order sahi karna hai */}
        <ul>
          <li>
            <Link to="/playground">PlayGround</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>

        <Routes>
          <Route
            path="/login"
            element={
              <Login
                isAuthenticated={isAuthenticated}
                onLogin={handleLogin}
                onLogout={handleLogout}
              />
            }
          />

          <Route
            path="/playground"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PlayGround />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<div>Page not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;