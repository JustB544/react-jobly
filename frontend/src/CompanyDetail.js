import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JoblyApi from "./api";
import Job from "./Job";
import UserContext from "./UserContext";

function CompanyDetail() {
    const params = useParams();
    const [company, setCompany] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [userJobs, setUserJobs] = useState([]);
    const {context} = useContext(UserContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (context.token === ""){
            navigate("/");
        }
        async function get(){
            setCompany(await JoblyApi.getCompany(params.name));
            if (company.error){
                navigate("/companies");
            }
            setUserJobs((await JoblyApi.getUser(context.username)).applications);
            setIsLoading(false);
        }
        get();
    }, []);

    if (isLoading){
        return <p>Loading &hellip;</p>;
    }

    return (
        <div>
            <h1 style={{textAlign: "center"}}>{company.name}</h1>
            <h3 style={{textAlign: "center"}}>{company.description}</h3>
            <ul>
                {company.jobs.map(j => <li key={j.id} style={{listStyleType: "none"}}><Job jobId={j.id} title={j.title} companyName={j.companyName} salary={j.salary} equity={j.equity} userJobs={userJobs}/></li>)}
            </ul>
        </div>
    );
}

export default CompanyDetail;