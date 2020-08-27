import React, {
  useState, useEffect, useContext, createContext,
} from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const authContext = createContext();

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => useContext(authContext);

const provider = new firebase.auth.GoogleAuthProvider();

function useProvideAuth() {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = () => firebase
    .auth()
    .signInWithPopup(provider)
    .then((response) => {
      const { accessToken } = response.credential;
      setUser(response.user);
      setToken(accessToken);
      return response.user;
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`${errorCode}: ${errorMessage}`);
    });

  const signout = () => firebase
    .auth()
    .signOut()
    .then(() => {
      setUser(undefined);
    });

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(undefined);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    token,
    signin,
    signout,
  };
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
