import { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        // Invalid stored data, clear it
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  // Handle successful login
  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  // Handle successful signup
  const handleSignupSuccess = (userData) => {
    setUser(userData);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowLogin(true);
  };

  // Switch between login and signup views
  const switchToSignup = () => setShowLogin(false);
  const switchToLogin = () => setShowLogin(true);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="app loading-app">
        <div className="app-loader">
          <div className="loader-spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth screens if not logged in
  if (!user) {
    return (
      <div className="app">
        {showLogin ? (
          <Login 
            onLoginSuccess={handleLoginSuccess}
            onSwitchToSignup={switchToSignup}
          />
        ) : (
          <Signup 
            onSignupSuccess={handleSignupSuccess}
            onSwitchToLogin={switchToLogin}
          />
        )}
      </div>
    );
  }

  // Main app view for logged-in users
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-brand">
            <span className="brand-icon">📝</span>
            <h1>Task Manager</h1>
          </div>
          <div className="header-user">
            <span className="user-greeting">
              Hello, <strong>{user.username}</strong>!
            </span>
            <button onClick={handleLogout} className="btn btn-logout">
              <span>🚪</span> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <TaskList />
      </main>

      <footer className="app-footer">
        <p>Task Manager - Built with MERN Stack</p>
      </footer>
    </div>
  );
}

export default App;
