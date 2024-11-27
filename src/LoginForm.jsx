import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import React, {  useState, useEffect } from 'react';

// LoginSuccessful is a function sent in by parent component
function LoginForm({LoginEvent}) {
	const firebaseConfig = {
        apiKey: "AIzaSyDDVez1R9_gcLg4srQ-Zdmw8j2zPFqHpgk",
        authDomain: "project5frontend.firebaseapp.com",
        projectId: "project5frontend",
        storageBucket: "project5frontend.firebasestorage.app",
        messagingSenderId: "357864896411",
        appId: "1:357864896411:web:730b64e713cd072cef933e"
      };

	initializeApp(firebaseConfig);
	
	const [loggedUser, setLoggedUser] = useState('');

	// function to sign in with Google's page
	// const signInWithGoogle = () => {
  	
  	// 	const provider = new GoogleAuthProvider();
  	// 	const auth = getAuth();
  	// 	signInWithRedirect(auth, provider)
    // 	.then((result) => {
    //   		// User signed in
    //   		console.log("User signed in successfully with Google.");
    //         console.log("User Info:", result.user);
    //   		setLoggedUser(result.user)
      	
    // 	}).catch((error) => {
    //   	// Handle Errors here.
    //       console.error("Error during sign-in:", error);
    // 	});
	// };
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
          .then((result) => {
            // User signed in
            console.log("User signed in successfully with Google.");
            console.log("User Info:", result.user);
            setLoggedUser(result.user);
          })
          .catch((error) => {
            // Handle Errors here.
            console.error("Error during sign-in:", error);
          });
      };
      
	
	// function to sign out
	// function logoutGoogle () {
	// 	const auth=getAuth();
	// 	auth.signOut();
	// 	setLoggedUser(null)
	// }

    //logout Google
    function logoutGoogle() {
        const auth = getAuth();
        auth
          .signOut()
          .then(() => {
            console.log("User successfully signed out.");
            setLoggedUser(null); // Clear local loggedUser state
            LoginEvent(null); // Notify the parent component (App.js) of logout
          })
          .catch((error) => {
            console.error("Error signing out:", error);
          });
      }
      
      

	// we put the onAuthStateChanged in useEffect so this is only called when 
	// this component mounts  
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            console.log("User is signed in:", user);
            setLoggedUser(user);
            LoginEvent(user); // Notify App.js
          } else {
            console.log("No user is signed in.");
            setLoggedUser(null);
            LoginEvent(null); // Clear user in App.js
          }
        });
      
        // Cleanup listener on unmount
        return () => unsubscribe();
      }, [LoginEvent]);
	// note the ? to show either login or logout button
	return (
    <div >
    { loggedUser?
      <><p>user: {loggedUser.uid}</p> <button onClick={logoutGoogle}>Log out</button> </>
      :<button onClick={signInWithGoogle}>Sign in with Google</button>
    } 
     
    </div>
  );

}
export default LoginForm;