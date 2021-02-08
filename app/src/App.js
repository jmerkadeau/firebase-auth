import React from 'react';
import { auth } from './Data/Firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import LandingPage from './Components/LandingPage/LandingPage.js';
import Home from './Components/Home/Home.js';

import SignInSide from "./Components/LandingPage/SignInSide.js";
import Dashboard from "./Components/Dashboard/Dashboard.js";

function App() {
  const [user] = useAuthState(auth);

  //firebase's useAuthState hook gets the user's info

  //if user is signed in, sends to Home.js
  //if not, sends to LandingPage.js

  return (
    <div className="app">
      <section>
        {user ? <Home /> : <LandingPage />}
      </section>
    </div>
    // <SignInSide></SignInSide>
  );
}

export default App;