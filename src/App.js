import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import supabase from "./supabaseClient";
import Account from "./pages/Account";
import { Routes, Route } from "react-router-dom";


function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])


  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={!session ? <Login /> : <Account key={session.user.id} session={session} />} />
      </Routes>
    </div>
  );
}

export default App;
