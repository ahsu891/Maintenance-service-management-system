import { useRef, useState, useEffect } from "react";
// import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
// import axios from "../api/axios";
import { IoEyeOutline } from "react-icons/io5";
import useAuth from "../../hook/useAuth";
import axios from "../../api/axios";
const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const toggleShowPwd = () => {
    setShowPwd((prevShowPwd) => !prevShowPwd);
  };
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, pwd);
    try {
      const response = await axios.post(
        LOGIN_URL,
        // JSON.stringify({ username: user, password: pwd }),
        { username: user, password: pwd },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const roles = response?.data?.role;
      const user_id = response?.data?.user_id;
      setAuth({ user, pwd, roles });
      localStorage.setItem("roles", roles);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("full_name", response?.data?.full_name);

      // alert(localStorage.getItem("roles"));
      setUser("");
      setPwd("");
      navigate(`/${roles.toLowerCase()}`, { replace: true });
      // navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg(err.response?.data?.error);
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section className="">
      <>
        <div className="rounded-sm py-20 border h-screen md:px-20 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="py-17.5 px-26 text-center flex  flex-col justify-center items-center">
                <p className="2xl:px-20">Let Your Light Shine On Society</p>

                <img
                  className=" w-[50%]"
                  src="data:image/jpeg;base64,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"
                  alt="jhj"
                />
              </div>
            </div>

            <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                {/* <span className="mb-1.5 block font-medium">Start for free</span> */}
                <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                  Sign In{" "}
                  <Link className="text-primary text-xl font-normal" to="/">
                    {" "}
                    or Go Home page
                  </Link>
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="mb-2.5 block font-medium text-black dark:text-white"
                    >
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        ref={userRef}
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        autoComplete="off"
                        name="username"
                        id="username"
                        required
                        placeholder="Enter your username"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="mb-2.5 block font-medium text-black dark:text-white"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        name="password"
                        id="password"
                        // type="password"
                        type={showPwd ? "text" : "password"}
                        required
                        placeholder="•••••••••••"
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />

                      <span className="absolute flex flex-row items-center gap-1 right-4 top-4">
                        <span
                          onClick={toggleShowPwd}
                          className="text-2xl text-gray-1  "
                        >
                          {!showPwd ? <IoEyeOffOutline /> : <IoEyeOutline />}
                        </span>
                      </span>
                    </div>

                    <p
                      ref={errRef}
                      className={errMsg ? "text-danger text-sm" : "hidden"}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </p>
                  </div>

                  <div className="mb-5">
                    <input
                      type="submit"
                      value="Sign In"
                      className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                    />
                  </div>

                  <div className="mt-6  flex flex-row items-center  justify-between text-center">
                    <p>
                      Don’t have any account?{" "}
                      <Link to="/register" className="text-primary">
                        Sign Up
                      </Link>
                    </p>
                    <p>
                      <Link to="/forgotPassword" className="text-primary">
                        Forget Password
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </section>
    // </div>

    // </section>
  );
};

export default Login;
