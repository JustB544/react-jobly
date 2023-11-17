import React, {useState, useEffect, useContext} from "react";
import JoblyApi from "./api";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

function Profile() {
    const INITIAL_STATE = {username: "", firstName: "", lastName: "", email: ""};
    const [formData, setFormData] = useState(INITIAL_STATE);
    const navigate = useNavigate();
    const {context} = useContext(UserContext);

    useEffect(() => {
        async function get(){
            let {lastName, firstName, email} = await JoblyApi.getUser(context.username);
            setFormData(fData => ({username: context.username, lastName, firstName, email}));
        }
        get()
    }, []);

    async function handleSubmit(evt){
        evt.preventDefault();
        await JoblyApi.patchUser(formData);
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
                <input disabled name="username" type="text" value={formData.username}/>
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
            <button>Save</button>
        </form>
    );
}

export default Profile;