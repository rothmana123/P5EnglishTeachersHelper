import React, { useState } from 'react';
import LoginForm from './LoginForm';
import FeedbackComponent from './FeedbackComponent';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


function App() {
  // State to track logged-in user
  const [user, setUser] = useState(null);

  // Function to handle user login event
  function handleLogin(user) {
    console.log('User logged in:', user); // Debugging
    setUser(user); // Set the logged-in user
  }

  // Function to handle log-out event
  const handleLogout = () => {
    const auth = getAuth();
    auth
      .signOut()
      .then(() => {
        console.log('User successfully signed out.');
        setUser(null); // Reset the user state
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <div>
      {user ? (
        // Redirect to FeedbackComponent after login, passing the logout handler
        <FeedbackComponent onLogout={handleLogout} />
      ) : (
        <div>
          <h1>Login</h1>
          <LoginForm LoginEvent={handleLogin} />
        </div>
      )}
    </div>
  );
}

export default App;


