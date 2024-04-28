import { Link, useNavigate } from "react-router-dom";
// import LogoDark from '../../images/logo/logo-dark.svg';
import ReactDOM from "react-dom";
// import Lo?go from '../../images/logo/logo.svg';
import { FaArrowAltCircleRight } from "react-icons/fa";
import Spiner from "../Spiner";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "../../api/axios";
import { MdCancel } from "react-icons/md";
const URL_R = "/auth/saveSetting";
const URL_C = "/auth/getSettingInfo";

const infrom = [
  {
    position: "Department",
    data: ["Software Engineering", "Geomatices", "COTM", "Civil Engineering"],
  },
  {
    position: "Din",
    data: [
      "Engineering College",
      "Natural Science College",
      "Information and Technolegy College",
    ],
  },
];
const SettingForm = () => {
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const [data, setData] = useState([]);
  const [showChange, setShowChange] = useState(false);
  const [fresh, setFresh] = useState(false);
  // errRef.current.focus();
  const [pos, setPos] = useState(
    () => infrom.filter((data) => data.position === "Department")[0].data
  );
  const navigate = useNavigate();
  function handlepos(e) {
    setPos(infrom.filter((data) => data.position === e.target.value)[0].data);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(URL_C, {
          user_id: localStorage.getItem("user_id"),
        });
        setData(response.data);
        // alert("hello");
        console.log(response.data);
      } catch (error) {
        console.log(error.response.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to cancel any pending requests
  }, [fresh]);

  async function handleSubmit(e) {
    e.preventDefault();
    const {
      fname,
      lname,
      password1,
      typej,
      typep,
      phone,
      username,
      password2,
      email,
    } = e.target;
    if (password1?.value !== password2?.value) {
      return setErrMsg("The password is not similar");
    }
    // console.log(
    //   fname?.value,
    //   lname?.value,
    //   password1?.value,
    //   password2?.value,
    //   typej?.value,
    //   typep?.value,
    //   phone?.value,
    //   username?.value
    // );
    try {
      // Make an Axios request

      const response = await axios.post(URL_R, {
        fname: fname?.value,
        lname: lname?.value,
        password1: password1?.value,
        typej: typej?.value,
        typep: typep?.value,
        phone: phone?.value,
        email: email.value,
        username: username?.value,
        password2: password2?.value,
        user_id: localStorage.getItem("user_id"),
        roles: localStorage.getItem("roles"),
      });
      // console.log("Server response:", response.data);

      toast.success(response.data);
      // setFresh((e) => !e);
      // // alert("hello");
      // setData({})
      // handleRefresh();
      setShowChange(false);
      setErrMsg("");
      setFresh((prevState) => !prevState);
    } catch (error) {
      console.error("Error making Axios request:", error.message);
      // Handle error, e.g., display an error message to the user
      toast.error(error.message);
    }
  }
  if (isLoading) {
    return ReactDOM.createPortal(
      <Spiner />,
      document.getElementById("45454545s")
    );
  }
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-row items-center justify-center">
          {/* <div className="hidden w-full xl:block xl:w-1/2"></div> */}

          <div className="w-full ">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Edit the Profile
              </h2>

              <form onSubmit={handleSubmit} method="POST">
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      name="fname"
                      defaultValue={data?.[0]?.first_name}
                      placeholder="Enter your first name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      name="lname"
                      defaultValue={data?.[0]?.last_name}
                      placeholder="Enter your last name"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Username
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      name="username"
                      defaultValue={data?.[0]?.username}
                      placeholder="Enter your username"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    E-mail
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      name="email"
                      defaultValue={data?.[0]?.email}
                      placeholder="Enter Your Email"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Phone
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      name="phone"
                      defaultValue={data?.[0]?.phone}
                      placeholder="Enter Your Phone"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                  </div>
                </div>
                {localStorage.getItem("roles") === "Requester" ? (
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Job
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        name="typej"
                        defaultValue={data?.[0]?.job}
                        onChange={handlepos}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        {infrom.map((data, i) => (
                          <option key={i} value={data.position}>
                            {data.position}
                          </option>
                        ))}
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {localStorage.getItem("roles") === "Requester" && (
                  <div className="mb-4.5">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Posiition
                    </label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <select
                        name="typep"
                        defaultValue={data?.[0]?.position}
                        className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      >
                        {pos.map((data, i) => (
                          <option key={i} value={data}>
                            {data}
                          </option>
                        ))}
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                )}
                <div className="mb-4 flex flew-row gap-2 items-center">
                  <h1 className="text-xl text-black">Change Password </h1>
                  {!showChange && (
                    <span
                      onClick={() => setShowChange((e) => !e)}
                      className=" text-primary text-xl"
                    >
                      <FaArrowAltCircleRight />
                    </span>
                  )}
                  {showChange && (
                    <span
                      onClick={() => setShowChange((e) => !e)}
                      className=" text-primary text-xl"
                    >
                      <MdCancel />
                    </span>
                  )}
                </div>

                {showChange && (
                  <>
                    <div className="mb-4">
                      <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Enter New Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          name="password1"
                          min={8}
                          max={15}
                          placeholder="Enter your password"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />

                        <span className="absolute right-4 top-4">
                          <svg
                            className="fill-current"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.5">
                              <path
                                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                fill=""
                              />
                              <path
                                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          name="password2"
                          min={8}
                          max={15}
                          placeholder="Re-enter your password"
                          className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        />

                        <span className="absolute right-4 top-4">
                          <svg
                            className="fill-current"
                            width="22"
                            height="22"
                            viewBox="0 0 22 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.5">
                              <path
                                d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                                fill=""
                              />
                              <path
                                d="M10.9977 11.8594C10.5852 11.8594 10.207 12.2031 10.207 12.65V16.2594C10.207 16.6719 10.5508 17.05 10.9977 17.05C11.4102 17.05 11.7883 16.7063 11.7883 16.2594V12.6156C11.7883 12.2031 11.4102 11.8594 10.9977 11.8594Z"
                                fill=""
                              />
                            </g>
                          </svg>
                        </span>
                      </div>
                    </div>
                    <div className="my-4">
                      <p
                        ref={errRef}
                        className={errMsg ? "text-danger text-sm" : "hidden"}
                        aria-live="assertive"
                      >
                        {errMsg}
                      </p>
                    </div>
                  </>
                )}

                <div className="mb-5">
                  <button
                    type="submit"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingForm;

// export default SettingForm;
