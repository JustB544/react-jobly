import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

function Home() {
    const {context} = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div>
            <h1>Welcome</h1>
            {context.token === "" && 
            <div>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/signup")}>Sign up</button>
            </div>}
        </div>
    );
}

export default Home;