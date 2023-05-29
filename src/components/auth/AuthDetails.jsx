import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';

const AuthDetails = ({ onSignIn, isAuthenticated }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        onSignIn(); // Call onSignIn function after successful authentication
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, [onSignIn]);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Signed out');
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {authUser ? (
        <p>
          {`Signed In as ${authUser.email} `}
          <button onClick={userSignOut}>Sign Out</button>
        </p>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;
