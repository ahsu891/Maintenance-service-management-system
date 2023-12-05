import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/linkpage");
  };

  return (
    <section>
      <h1>Home Admin</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <br />
      <Link to="/login">Go to the Login page</Link>
      <br />
      <Link to="/signup">Go to the Lounge</Link>
      <br />

      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
