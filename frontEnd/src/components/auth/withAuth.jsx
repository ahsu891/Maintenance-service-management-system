import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

// import axios from "../../api/axios";
const LOGIN_URL = "/auth/checkLogin";
// import { Redirect } from "react-router-dom";
const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
      axios
        .get(LOGIN_URL, {
          withCredentials: true,
        })
        .then((response) => {
          setUser(response.data.user.username);
          setUserId(response.data.user.user_id);

          // const expirationTime =
          //   (response.data.user.exp - response.data.user.iat) * 1000;
          // setTimeout(() => {
          //   alert("Your session has expired. Please log in again.");
          //   axios
          //     .get("http://localhost:8800/api/auth/logoutAdmin", {
          //       withCredentials: true,
          //     })
          //     .then((res) => {

          //       navigate("/login");
          //     });
          // }, expirationTime);
        })
        .catch((error) => {
          // navigate("/login");
          console.log(error.response.data.message);
          // console.log("Hello abebe ");
          navigate("/login");

          // if (response.status === 401) {
          //   // Handle the 401 error here, e.g., redirect to a login page
          //   // or show an error message to the user
          //   console.log("Hello Ahmed ");
          // }
        });
    }, [navigate]);

    return <Component />;
    // return
  };

  return AuthenticatedComponent;
};

export default withAuth;
