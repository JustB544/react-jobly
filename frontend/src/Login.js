import React, {useContext, useState} from "react";
import JoblyApi from "./api";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

function Login() {
    const INITIAL_STATE = {username: "", password: ""};
    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();
    const {setContext} = useContext(UserContext);
    async function handleSubmit(evt){
        evt.preventDefault();
        let token = await JoblyApi.getToken(formData);
        setContext(token, formData.username);
        navigate("/");
    }

    function handleChange(evt){
        const {name, value} = evt.target;
        setFormData(fData => ({...fData, [name]: value}));
    }
    return (
        <form style={{display: "flex", flexDirection: "column", width: "fit-content"}} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username: </label>
                <input name="username" type="text" value={formData.username} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input name="password" type="password" value={formData.password} onChange={handleChange}/>
            </div>
            <button>Login</button>
        </form>
    );
}

export default Login;