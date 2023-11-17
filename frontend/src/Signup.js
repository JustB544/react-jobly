import React, {useContext, useState} from "react";
import JoblyApi from "./api";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

function Signup() {
    const INITIAL_STATE = {username: "", password: "", firstName: "", lastName: "", email: ""};
    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();
    const {setContext} = useContext(UserContext);
    async function handleSubmit(evt){
        evt.preventDefault();
        let token = await JoblyApi.register(formData);
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
            <div>
                <label htmlFor="firstName">First name: </label>
                <input name="firstName" type="text" value={formData.firstName} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="lastName">Last name: </label>
                <input name="lastName" type="text" value={formData.lastName} onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <input name="email" type="email" value={formData.email} onChange={handleChange}/>
            </div>
            <button>Sign up</button>
        </form>
    );
}

export default Signup;