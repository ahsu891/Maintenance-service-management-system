import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Missing from "./components/Missing";
import Unauthorized from "./components/auth/Unauthorized";
import RequireAuth from "./components/auth/RequireAuth";
import Home from "./components/Home";
import About from "./components/Admin/About";
import withAuth from "./components/auth/withAuth";
const ROLES = {
  User: "Requester",
  Technician: "Technician",
  Admin: "Admin",
};
const Auth = withAuth(Layout);
function App() {
  console.log(Auth);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<SignUp />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            {/* Admin Requster */}
            {/* withAuth( */}
            {/* <Auth> */}
            <Route element={<RequireAuth allowedRoles={ROLES.User} />}>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/requester" element={<About />} />
            </Route>
            {/* Admin Page */}
            <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
              <Route path="/admin" element={<Home />} />
            </Route>
            {/* Admin Technicial */}
            <Route element={<RequireAuth allowedRoles={ROLES.Technician} />}>
              <Route path="/technician" element={<Home />} />
            </Route>
            {/* </Auth> */}
          </Route>

          {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route> */}

          <Route path="*" element={<Missing />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
