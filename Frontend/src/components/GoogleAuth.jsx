import React, { useEffect } from 'react';

const GoogleAuth = () => {
  useEffect(() => {
    /* global google */
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
        callback: (response) => {
          console.log("Encoded JWT ID token: " + response.credential);
        }
      });
      const buttonDiv = document.getElementById("buttonDiv");
      if (buttonDiv) {
        google.accounts.id.renderButton(
          buttonDiv,
          { theme: "outline", size: "large", text: "continue_with" } 
        );
      }
    }
  }, []);

  // Removed Ecosystem Access UI as requested
  return null;
};

export default GoogleAuth;
