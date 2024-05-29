/** @format */

import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import Missing from "./components/Missing";
import Unauthorized from "./components/auth/Unauthorized";
import RequireAuth from "./components/auth/RequireAuth";
// import Home from "./components/Home";
import About from "./components/Admin/About";
import withAuth from "./components/auth/withAuth";
import DefaultLayout from "./layout/DefaultLayout";
import DefaultLayoutReq from "./layout/DefaultLayoutReq";
import DefaultLayoutTech from "./layout/DefaultLayoutTech";
import DefaultLayoutInv from "./layout/DefaultLayoutInv";
import DefaultLayoutHead from "./layout/DefaultLayoutHead";
import DefaultLayoutSuper from "./layout/DefaultLayoutSuper";
import DefaultLayoutVice from "./layout/DefaultLayoutVice";

import TableThree from "./components/Admin/TableThree";
import TableThreeReq from "./components/super/TableThree";

import { Toaster } from "react-hot-toast";
import FormLayout from "./components/Requester/FormLayout";
import Requests from "./components/Admin/Requests";
import RequestTech from "./components/Technician/RequestsTech";
import WorkOrder from "./components/Technician/WorkOrder";
import RequestList from "./components/Technician/RequestList";
import RequestManagement from "./components/Admin/RequestManagement";
import Dashboard from "./components/Requester/Dashboard";
import DashboardInv from "./components/Inventory/DashboardInv";
import Table from "./components/Inventory/TableTwo";
import Complain from "./components/Requester/Complain";
import ComplainAdmin from "./components/Admin/ComplainAdmin";
import Calendar from "./components/Admin/Calendar";
import Report from "./components/Admin/Report";
import ReportPrint from "./components/Admin/ReportPrint";
import InventoryRequestAdmin from "./components/Admin/InventoryRequestAdmin";
import InventoryRequest from "./components/Inventory/InventoryRequest";
import Setting from "./components/Admin/Setting";
import DashboardTech from "./components/Technician/DashboardTech";
import ForgotPassword from "./components/FrogetPassword";
import ResetPassword from "./components/ResetPassword";
import DashboardSuper from "./components/super/DashboardSuper";
// import MainTable from "./components/Admin/MainTable";
////////////////
import Home from "./pages/Home";
import Door from "./pages/Door";
import Nav from "./pages/Nav";
import Light from "./pages/Light";
import Footer from "./pages/Footer";
import TestPage from "./pages/TestPage";
import Walloutlet from "./pages/Walloutlet";
const ROLES = {
  User: "Requester",
  Technician: "Technician",
  Admin: "Admin",
  Inventory: "Inventory",
  Head: "Head",
  Super: "Super",
  Vice: "Vice",
};
const Auth = withAuth(Layout);
function App() {
  // console.log(Auth);
  return (
    <>
      <BrowserRouter>
        <div id="45454545s"></div>
        <Routes>
          <Route>
            <Route path="/" element={<Nav />}>
              <Route index element={<TestPage />} />
              {/* <Route index element={<HomePage />} /> */}
              <Route path="maintenance" element={<Home />} />
              <Route path="maintenance/door" element={<Door />} />
              <Route path="maintenance/light" element={<Light />} />
              <Route path="maintenance/out" element={<Walloutlet />} />
            </Route>

            {/* ///////// */}
            <Route path="register" element={<SignUp />} />
            <Route path="login" index element={<Login />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword/:token" element={<ResetPassword />} />
            <Route element={<Auth />}>
              {/* Admin Requster */}
              {/* withAuth( */}
              {/* <Auth> */}
              <Route element={<RequireAuth allowedRoles={ROLES.User} />}>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/requester" element={<DefaultLayoutReq />}>
                  <Route index element={<Dashboard />} />
                  <Route path="/requester/request" element={<FormLayout />} />
                  {/* <Route path="/requester/complain" element={<Complain />} /> */}
                  <Route path="/requester/settings" element={<Setting />} />
                </Route>
              </Route>
              {/* Admin Page */}
              <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
                <Route path="/admin" element={<DefaultLayout />}>
                  <Route path="/admin" index element={<About />} />
                  {/* <Route path="/admin/dashboard" index element={<DefaultLayout />} /> */}
                  <Route path="/admin/calendar" element={<Calendar />} />
                  <Route path="/admin/requests" element={<Requests />} />
                  <Route path="/admin/report" element={<Report />} />
                  <Route
                    path="/admin/inventoryrequest"
                    element={<InventoryRequestAdmin />}
                  />
                  <Route
                    path="/admin/usermanagement"
                    element={<TableThree />}
                  />
                  <Route path="/admin/status" element={<RequestManagement />} />
                  <Route path="/admin/report/:id" element={<ReportPrint />} />
                  <Route path="/admin/complain" element={<ComplainAdmin />} />
                  <Route path="/admin/settings" element={<Setting />} />
                </Route>
              </Route>
              {/* Admin Technicial */}
              <Route element={<RequireAuth allowedRoles={ROLES.Technician} />}>
                <Route path="/technician" element={<DefaultLayoutTech />}>
                  <Route path="/technician" index element={<DashboardTech />} />
                  <Route path="/technician/workorder" element={<WorkOrder />}>
                    <Route index element={<RequestList />} />
                  </Route>
                  <Route
                    path="/technician/request"
                    element={<InventoryRequest />}
                  />
                  <Route path="/technician/settings" element={<Setting />} />
                </Route>
              </Route>

              <Route element={<RequireAuth allowedRoles={ROLES.Inventory} />}>
                <Route path="/inventory" element={<DefaultLayoutInv />}>
                  <Route path="/inventory" index element={<DashboardInv />} />
                  <Route path="/inventory/management" element={<Table />} />
                  <Route
                    path="/inventory/request"
                    element={<InventoryRequest />}
                  />
                  <Route path="/inventory/settings" element={<Setting />} />
                </Route>
              </Route>

              <Route element={<RequireAuth allowedRoles={ROLES.Head} />}>
                <Route path="/head" element={<DefaultLayoutHead />}>
                  <Route path="/head" index element={<About />} />
                  {/* <Route path="/inventory/management" element={<Table />} /> */}
                  {/* <Route
                    path="/inventory/request"
                    element={<InventoryRequest />}
                  /> */}
                  <Route path="/head/report" element={<Report />} />
                  <Route path="/head/status" element={<RequestManagement />} />
                  <Route path="/head/report/:id" element={<ReportPrint />} />
                  <Route path="/head/complain" element={<ComplainAdmin />} />
                  <Route path="/head/settings" element={<Setting />} />
                </Route>
              </Route>

              <Route element={<RequireAuth allowedRoles={ROLES.Vice} />}>
                <Route path="/vice" element={<DefaultLayoutVice />}>
                  <Route path="/vice" index element={<About />} />
                  {/* <Route path="/inventory/management" element={<Table />} /> */}
                  {/* <Route
                    path="/inventory/request"
                    element={<InventoryRequest />}
                  /> */}
                  <Route path="/vice/report" element={<Report />} />
                  <Route path="/vice/status" element={<RequestManagement />} />
                  <Route path="/vice/report/:id" element={<ReportPrint />} />
                  <Route path="/vice/complain" element={<ComplainAdmin />} />
                  <Route path="/vice/settings" element={<Setting />} />
                </Route>
              </Route>
              <Route element={<RequireAuth allowedRoles={ROLES.Super} />}>
                <Route path="/super" element={<DefaultLayoutSuper />}>
                  <Route path="/super" index element={<DashboardSuper />} />
                  {/* <Route path="/inventory/management" element={<Table />} /> */}
                  {/* <Route
                    path="/inventory/request"
                    element={<InventoryRequest />}
                  /> */}
                  <Route
                    path="/super/requestermanagement"
                    element={<TableThreeReq />}
                  />
                  <Route
                    path="/super/usermanagement"
                    element={<TableThree />}
                  />
                  {/* <Route path="/head/report" element={<Report />} />
                  <Route path="/head/status" element={<RequestManagement />} />
                  <Route path="/head/report/:id" element={<ReportPrint />} />
                  <Route path="/head/complain" element={<ComplainAdmin />} /> */}
                  <Route path="/super/settings" element={<Setting />} />
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
