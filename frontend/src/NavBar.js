import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import './NavBar.css';
import UserContext from "./UserContext";
import JoblyApi from "./api";

function NavBar() {
  const {context, setContext} = useContext(UserContext);
  const navigate = useNavigate();

  function logout(){
    setContext("", "");
    navigate("/");
  }

  if (context.token !== ""){
    return (
      <nav>
        <div className="nav-item">
          <Link to="/">Jobly</Link>
        </div>
        <div style={{display: "flex", flexDirection: "row"}}>
          <div className="nav-item"><Link to='/companies'>Companies</Link></div>
          <div className="nav-item"><Link to='/jobs'>Jobs</Link></div>
          <div className="nav-item"><Link to='/profile'>Profile</Link></div>
          <div className="nav-item"><a onClick={logout}>Logout</a></div>
        </div>
      </nav>
    );
  }

  return (
    <nav>
      <div className="nav-item">
        <Link to="/">Jobly</Link>
      </div>
      <div style={{display: "flex", flexDirection: "row"}}>
        <div className="nav-item"><Link to='/login'>Login</Link></div>
        <div className="nav-item"><Link to='/signup'>Sign up</Link></div>
      </div>
    </nav>
  );
}

export default NavBar;