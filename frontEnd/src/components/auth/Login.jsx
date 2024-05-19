import { useRef, useState, useEffect } from "react";
// import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

// import axios from "../api/axios";
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
                {/* <Link className="mb-5.5 inline-block" to="/">
                  <img className="hidden dark:block" src={"Logo"} alt="Logo" />
                  <img className="dark:hidden" src={"LogoDark"} alt="Logo" />
                </Link> */}

                <p className="2xl:px-20">Let Your Light Shine On Society</p>

                {/* <span className="mt-15 inline-block">
                  <svg
                    width="350"
                    height="350"
                    viewBox="0 0 350 350"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M33.5825 294.844L30.5069 282.723C25.0538 280.414 19.4747 278.414 13.7961 276.732L13.4079 282.365L11.8335 276.159C4.79107 274.148 0 273.263 0 273.263C0 273.263 6.46998 297.853 20.0448 316.653L35.8606 319.429L23.5737 321.2C25.2813 323.253 27.1164 325.196 29.0681 327.019C48.8132 345.333 70.8061 353.736 78.1898 345.787C85.5736 337.838 75.5526 316.547 55.8074 298.235C49.6862 292.557 41.9968 288.001 34.2994 284.415L33.5825 294.844Z"
                      fill="#F2F2F2"
                    />
                    <path
                      d="M62.8332 281.679L66.4705 269.714C62.9973 264.921 59.2562 260.327 55.2652 255.954L52.019 260.576L53.8812 254.45C48.8923 249.092 45.2489 245.86 45.2489 245.86C45.2489 245.86 38.0686 270.253 39.9627 293.358L52.0658 303.903L40.6299 299.072C41.0301 301.712 41.596 304.324 42.3243 306.893C49.7535 332.77 64.2336 351.323 74.6663 348.332C85.0989 345.341 87.534 321.939 80.1048 296.063C77.8019 288.041 73.5758 280.169 68.8419 273.123L62.8332 281.679Z"
                      fill="#F2F2F2"
                    />
                    <path
                      d="M243.681 82.9153H241.762V30.3972C241.762 26.4054 240.975 22.4527 239.447 18.7647C237.918 15.0768 235.677 11.7258 232.853 8.90314C230.028 6.0805 226.674 3.84145 222.984 2.31385C219.293 0.786245 215.337 0 211.343 0H99.99C91.9222 0 84.1848 3.20256 78.48 8.90314C72.7752 14.6037 69.5703 22.3354 69.5703 30.3972V318.52C69.5703 322.512 70.3571 326.465 71.8859 330.153C73.4146 333.841 75.6553 337.192 78.48 340.015C81.3048 342.837 84.6582 345.076 88.3489 346.604C92.0396 348.131 95.9952 348.918 99.99 348.918H211.343C219.41 348.918 227.148 345.715 232.852 340.014C238.557 334.314 241.762 326.582 241.762 318.52V120.299H243.68L243.681 82.9153Z"
                      fill="#E6E6E6"
                    />
                    <path
                      d="M212.567 7.9054H198.033C198.701 9.54305 198.957 11.3199 198.776 13.0793C198.595 14.8387 197.984 16.5267 196.997 17.9946C196.01 19.4625 194.676 20.6652 193.114 21.4967C191.552 22.3283 189.809 22.7632 188.039 22.7632H124.247C122.477 22.7631 120.734 22.3281 119.172 21.4964C117.61 20.6648 116.277 19.462 115.289 17.9942C114.302 16.5263 113.691 14.8384 113.511 13.079C113.33 11.3197 113.585 9.54298 114.254 7.9054H100.678C94.6531 7.9054 88.8749 10.297 84.6146 14.5542C80.3543 18.8113 77.9609 24.5852 77.9609 30.6057V318.31C77.9609 324.331 80.3543 330.105 84.6146 334.362C88.8749 338.619 94.6531 341.011 100.678 341.011H212.567C218.592 341.011 224.37 338.619 228.63 334.362C232.891 330.105 235.284 324.331 235.284 318.31V30.6053C235.284 24.5848 232.891 18.811 228.63 14.554C224.37 10.297 218.592 7.9054 212.567 7.9054Z"
                      fill="white"
                    />
                    <path
                      d="M142.368 122.512C142.368 120.501 142.898 118.526 143.904 116.784C144.911 115.043 146.359 113.597 148.102 112.592C146.36 111.587 144.383 111.057 142.371 111.057C140.358 111.057 138.381 111.586 136.639 112.591C134.896 113.596 133.448 115.042 132.442 116.784C131.436 118.525 130.906 120.501 130.906 122.512C130.906 124.522 131.436 126.498 132.442 128.239C133.448 129.981 134.896 131.427 136.639 132.432C138.381 133.437 140.358 133.966 142.371 133.966C144.383 133.966 146.36 133.436 148.102 132.431C146.359 131.426 144.911 129.981 143.905 128.24C142.898 126.499 142.368 124.523 142.368 122.512Z"
                      fill="#CCCCCC"
                    />
                    <path
                      d="M156.779 122.512C156.778 120.501 157.308 118.526 158.315 116.784C159.321 115.043 160.769 113.597 162.513 112.592C160.77 111.587 158.793 111.057 156.781 111.057C154.769 111.057 152.792 111.586 151.049 112.591C149.306 113.596 147.859 115.042 146.852 116.784C145.846 118.525 145.316 120.501 145.316 122.512C145.316 124.522 145.846 126.498 146.852 128.239C147.859 129.981 149.306 131.427 151.049 132.432C152.792 133.437 154.769 133.966 156.781 133.966C158.793 133.966 160.77 133.436 162.513 132.431C160.769 131.426 159.322 129.981 158.315 128.24C157.308 126.499 156.779 124.523 156.779 122.512Z"
                      fill="#CCCCCC"
                    />
                    <path
                      d="M170.862 133.966C177.192 133.966 182.325 128.838 182.325 122.512C182.325 116.186 177.192 111.057 170.862 111.057C164.531 111.057 159.398 116.186 159.398 122.512C159.398 128.838 164.531 133.966 170.862 133.966Z"
                      fill="#3056D3"
                    />
                    <path
                      d="M190.017 158.289H123.208C122.572 158.288 121.962 158.035 121.512 157.586C121.062 157.137 120.809 156.527 120.809 155.892V89.1315C120.809 88.496 121.062 87.8866 121.512 87.4372C121.962 86.9878 122.572 86.735 123.208 86.7343H190.017C190.653 86.735 191.263 86.9878 191.713 87.4372C192.163 87.8866 192.416 88.496 192.416 89.1315V155.892C192.416 156.527 192.163 157.137 191.713 157.586C191.263 158.035 190.653 158.288 190.017 158.289ZM123.208 87.6937C122.826 87.6941 122.46 87.8457 122.19 88.1154C121.92 88.385 121.769 88.7507 121.768 89.132V155.892C121.769 156.274 121.92 156.639 122.19 156.909C122.46 157.178 122.826 157.33 123.208 157.33H190.017C190.399 157.33 190.765 157.178 191.035 156.909C191.304 156.639 191.456 156.274 191.457 155.892V89.132C191.456 88.7507 191.304 88.385 191.035 88.1154C190.765 87.8457 190.399 87.6941 190.017 87.6937H123.208Z"
                      fill="#CCCCCC"
                    />
                    <path
                      d="M204.934 209.464H102.469V210.423H204.934V209.464Z"
                      fill="#CCCCCC"
                    />
                    <path
                      d="M105.705 203.477C107.492 203.477 108.941 202.029 108.941 200.243C108.941 198.457 107.492 197.01 105.705 197.01C103.918 197.01 102.469 198.457 102.469 200.243C102.469 202.029 103.918 203.477 105.705 203.477Z"
                      fill="#3056D3"
                    />
                    <path
                      d="M204.934 241.797H102.469V242.757H204.934V241.797Z"
                      fill="#CCCCCC"
                    />
                    <path
                      d="M105.705 235.811C107.492 235.811 108.941 234.363 108.941 232.577C108.941 230.791 107.492 229.344 105.705 229.344C103.918 229.344 102.469 230.791 102.469 232.577C102.469 234.363 103.918 235.811 105.705 235.811Z"
                      fill="#3056D3"
                    />
                    <path
                      d="M203.062 278.617H170.68C170.121 278.617 169.584 278.394 169.189 277.999C168.793 277.604 168.571 277.068 168.57 276.509V265.168C168.571 264.609 168.793 264.073 169.189 263.678C169.584 263.283 170.121 263.06 170.68 263.06H203.062C203.621 263.06 204.158 263.283 204.553 263.678C204.949 264.073 205.171 264.609 205.172 265.168V276.509C205.171 277.068 204.949 277.604 204.553 277.999C204.158 278.394 203.621 278.617 203.062 278.617Z"
                      fill="#3056D3"
                    />
                    <path
                      d="M116.263 203.477C118.05 203.477 119.499 202.029 119.499 200.243C119.499 198.457 118.05 197.01 116.263 197.01C114.476 197.01 113.027 198.457 113.027 200.243C113.027 202.029 114.476 203.477 116.263 203.477Z"
                      fill="#3056D3"
                    />
                    <path
                      d="M126.818 203.477C128.605 203.477 130.054 202.029 130.054 200.243C130.054 198.457 128.605 197.01 126.818 197.01C125.031 197.01 123.582 198.457 123.582 200.243C123.582 202.029 125.031 203.477 126.818 203.477Z"
                      fill="#3056D3"
                    />
                    <path
                      d="M116.263 235.811C118.05 235.811 119.499 234.363 119.499 232.577C119.499 230.791 118.05 229.344 116.263 229.344C114.476 229.344 113.027 230.791 113.027 232.577C113.027 234.363 114.476 235.811 116.263 235.811Z"
                      fill="#3056D3"
                    />
                    <path
                      d="M126.818 235.811C128.605 235.811 130.054 234.363 130.054 232.577C130.054 230.791 128.605 229.344 126.818 229.344C125.031 229.344 123.582 230.791 123.582 232.577C123.582 234.363 125.031 235.811 126.818 235.811Z"
                      fill="#3056D3"
                    />
                    <path
                      d="M264.742 229.309C264.972 229.414 265.193 229.537 265.404 229.678L286.432 220.709L287.183 215.174L295.585 215.123L295.089 227.818L267.334 235.153C267.275 235.345 267.205 235.535 267.124 235.719C266.722 236.574 266.077 237.292 265.269 237.783C264.46 238.273 263.525 238.514 262.58 238.475C261.636 238.436 260.723 238.119 259.958 237.563C259.193 237.008 258.61 236.239 258.28 235.353C257.951 234.467 257.892 233.504 258.108 232.584C258.325 231.664 258.809 230.829 259.5 230.183C260.19 229.538 261.056 229.11 261.989 228.955C262.922 228.799 263.879 228.922 264.742 229.309Z"
                      fill="#FFB8B8"
                    />
                    <path
                      d="M298.642 344.352H292.894L290.16 322.198L298.643 322.198L298.642 344.352Z"
                      fill="#FFB8B8"
                    />
                    <path
                      d="M288.788 342.711H299.873V349.685H281.809C281.809 347.835 282.544 346.062 283.853 344.754C285.162 343.446 286.937 342.711 288.788 342.711Z"
                      fill="#1C2434"
                    />
                    <path
                      d="M320.995 342.729L315.274 343.292L310.379 321.513L318.822 320.682L320.995 342.729Z"
                      fill="#FFB8B8"
                    />
                    <path
                      d="M311.028 342.061L322.059 340.975L322.744 347.916L304.766 349.685C304.676 348.774 304.767 347.854 305.033 346.977C305.299 346.101 305.735 345.285 306.317 344.577C306.898 343.869 307.614 343.283 308.422 342.851C309.23 342.419 310.116 342.151 311.028 342.061Z"
                      fill="#1C2434"
                    />
                    <path
                      d="M300.242 191.677C306.601 191.677 311.757 186.525 311.757 180.17C311.757 173.815 306.601 168.663 300.242 168.663C293.882 168.663 288.727 173.815 288.727 180.17C288.727 186.525 293.882 191.677 300.242 191.677Z"
                      fill="#FFB8B8"
                    />
                    <path
                      d="M291.607 339.872C291.113 339.873 290.635 339.7 290.256 339.383C289.877 339.066 289.623 338.626 289.537 338.139C286.562 321.636 276.838 267.676 276.605 266.181C276.6 266.147 276.597 266.112 276.598 266.077V262.054C276.597 261.907 276.643 261.764 276.729 261.645L278.013 259.847C278.074 259.761 278.154 259.689 278.247 259.639C278.34 259.588 278.444 259.559 278.549 259.554C285.874 259.211 309.86 258.206 311.019 259.652C312.183 261.106 311.772 265.512 311.678 266.38L311.682 266.471L322.459 335.337C322.543 335.886 322.408 336.446 322.082 336.896C321.756 337.347 321.265 337.65 320.717 337.742L313.986 338.85C313.485 338.931 312.971 338.829 312.539 338.563C312.107 338.297 311.784 337.885 311.63 337.401C309.548 330.754 302.568 308.393 300.149 299.741C300.133 299.686 300.099 299.639 300.051 299.607C300.004 299.576 299.946 299.563 299.89 299.571C299.834 299.579 299.782 299.608 299.745 299.651C299.708 299.694 299.688 299.749 299.689 299.806C299.81 308.054 300.102 329.098 300.203 336.366L300.214 337.148C300.218 337.678 300.023 338.191 299.668 338.584C299.313 338.978 298.823 339.224 298.295 339.274L291.804 339.863C291.738 339.869 291.672 339.872 291.607 339.872Z"
                      fill="#1C2434"
                    />
                    <path
                      d="M292.933 196.201C290.924 197.395 289.721 199.588 289.031 201.821C287.754 205.953 286.985 210.226 286.741 214.545L286.012 227.475L276.984 261.755C284.809 268.37 289.322 266.867 299.855 261.455C310.387 256.044 311.591 263.26 311.591 263.26L313.697 234.092L316.706 202.219C316.031 201.407 315.266 200.672 314.427 200.03C311.645 197.868 308.409 196.366 304.962 195.636C301.516 194.906 297.948 194.967 294.528 195.815L292.933 196.201Z"
                      fill="#3056D3"
                    />
                    <path
                      d="M290.001 236.232C290.244 236.324 290.479 236.434 290.704 236.562L311.497 226.163L311.842 220.529L320.419 219.938L320.878 232.781L293.092 241.963C292.865 242.935 292.347 243.816 291.608 244.487C290.868 245.158 289.941 245.588 288.951 245.72C287.96 245.852 286.953 245.68 286.063 245.226C285.173 244.772 284.442 244.058 283.968 243.179C283.494 242.301 283.299 241.298 283.409 240.306C283.519 239.313 283.928 238.378 284.583 237.624C285.238 236.869 286.107 236.332 287.075 236.084C288.043 235.835 289.063 235.887 290.001 236.232Z"
                      fill="#FFB8B8"
                    />
                    <path
                      d="M316.556 202.365C321.672 204.17 322.573 223.716 322.573 223.716C316.554 220.409 309.332 225.821 309.332 225.821C309.332 225.821 307.827 220.709 306.022 214.094C305.477 212.233 305.412 210.265 305.832 208.372C306.253 206.479 307.147 204.724 308.429 203.269C308.429 203.269 311.44 200.56 316.556 202.365Z"
                      fill="#3056D3"
                    />
                    <path
                      d="M310.566 183.213C309.132 182.066 307.174 184.151 307.174 184.151L306.026 173.828C306.026 173.828 298.853 174.687 294.261 173.542C289.67 172.396 288.953 177.7 288.953 177.7C288.716 175.557 288.668 173.399 288.81 171.248C289.096 168.667 292.827 166.087 299.427 164.366C306.026 162.646 309.47 170.101 309.47 170.101C314.061 172.395 312.001 184.36 310.566 183.213Z"
                      fill="#1C2434"
                    />
                  </svg>
                </span> */}

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
                  Sign In
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

                      {/* <span className="absolute right-4 top-4">
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
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span> */}
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
                        type="password"
                        required
                        placeholder="•••••••••••"
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

                  {/* <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_191_13499)">
                        <path
                          d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_191_13499">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  Sign in with Google
                </button> */}

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
