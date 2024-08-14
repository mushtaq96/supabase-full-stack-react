import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import supabase from "./supabaseClient";
import Register from "./pages/Register";
import { isSatisfiesExpression } from "typescript";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    if (!user) {
      console.log("new user, navigating to register");
      navigate("/register");
    } else {
      // existing user
      //if user is not authenticated then go to login page
      if (session === null) {
        navigate("/login")
      }
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
