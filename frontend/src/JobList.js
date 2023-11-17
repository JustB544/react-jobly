import React, {useState, useEffect, useContext} from "react";
import Job from "./Job";
import JoblyApi from "./api";
import SearchForm from "./SearchForm";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

function JobList({searchBar}) {
    const [jobs, setJobs] = useState([]);
    const [userJobs, setUserJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {context} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (context.token === ""){
            navigate("/");
        }
        async function get(){
            setJobs(await JoblyApi.allJobs());
            setUserJobs((await JoblyApi.getUser(context.username)).applications);
            setIsLoading(false);
        }
        get();
    }, []);

    async function search(val){
        setIsLoading(true);
        setJobs(await JoblyApi.allJobs(val));
        setIsLoading(false);
    }
    
    if (isLoading){
        return <p>Loading &hellip;</p>;
    }

    return (
        <div>
            {searchBar && <SearchForm searchFunction={(val, evt) => search(val)}/>}
            <ul>
                {jobs.map(j => <li key={j.id} style={{listStyleType: "none"}}><Job jobId={j.id} title={j.title} companyName={j.companyName} salary={j.salary} equity={j.equity} userJobs={userJobs}/></li>)}
            </ul>
        </div>
    );
}

export default JobList;