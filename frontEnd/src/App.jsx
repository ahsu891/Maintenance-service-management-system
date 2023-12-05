import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Missing from "./components/Missing";
import Unauthorized from "./components/auth/Unauthorized";
import RequireAuth from "./components/auth/RequireAuth";
import Home from "./components/Home";
import About from "./components/Admin/About";
const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route> */}

      <Route path="*" element={<Missing />} />
    </Routes>
  );
}

export default App;
