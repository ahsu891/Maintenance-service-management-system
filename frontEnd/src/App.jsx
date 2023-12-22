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
import DefaultLayout from "./layout/DefaultLayout";
import DefaultLayoutReq from "./layout/DefaultLayoutReq";
import DefaultLayoutTech from "./layout/DefaultLayoutTech";
import Calendar from "react-calendar";
import TableThree from "./components/Admin/TableThree";
import { Toaster } from "react-hot-toast";
import FormLayout from "./components/Requester/FormLayout";
import Requests from "./components/Admin/Requests";
import RequestTech from "./components/Technician/RequestsTech";
import WorkOrder from "./components/Technician/WorkOrder";
import RequestList from "./components/Technician/RequestList";
import RequestManagement from "./components/Admin/RequestManagement";
// import MainTable from "./components/Admin/MainTable";
const ROLES = {
  User: "Requester",
  Technician: "Technician",
  Admin: "Admin",
};
const Auth = withAuth(Layout);
function App() {
  // console.log(Auth);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="register" element={<SignUp />} />
            <Route path="login" index element={<Login />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            <Route element={<Auth />}>
              {/* Admin Requster */}
              {/* withAuth( */}
              {/* <Auth> */}
              <Route element={<RequireAuth allowedRoles={ROLES.User} />}>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/requester" element={<DefaultLayoutReq />}>
                  <Route path="/requester" index element={<FormLayout />} />
                </Route>
              </Route>
              {/* Admin Page */}
              <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
                <Route path="/admin" element={<DefaultLayout />}>
                  <Route path="/admin" index element={<About />} />
                  {/* <Route path="/admin/dashboard" index element={<DefaultLayout />} /> */}
                  <Route path="/admin/calendar" element={<Calendar />} />
                  <Route path="/admin/requests" element={<Requests />} />
                  <Route
                    path="/admin/usermanagement"
                    element={<TableThree />}
                  />
                  <Route
                    path="/admin/requestmanagement"
                    element={<RequestManagement />}
                  />
                </Route>
              </Route>
              {/* Admin Technicial */}
              <Route element={<RequireAuth allowedRoles={ROLES.Technician} />}>
                <Route path="/technician" element={<DefaultLayoutTech />}>
                  <Route path="/technician/workorder" element={<WorkOrder />}>
                    <Route index element={<RequestList />} />
                  </Route>
                </Route>
              </Route>
              {/* </Auth> */}
            </Route>

            {/* <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route> */}

            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOption={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
