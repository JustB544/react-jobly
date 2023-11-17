import React, { useContext, useEffect, useState } from "react";
import './Job.css';
import JoblyApi from "./api";
import UserContext from "./UserContext";

function Job({jobId, title, companyName, salary, equity, userJobs}) {
    const [applied, setApplied] = useState(false);
    const {context} = useContext(UserContext);

    useEffect(() => {
        setApplied(userJobs.filter(j => jobId === j).length === 1);
    }, []);

    async function apply(){
        await JoblyApi.applyJob(context.username, jobId);
        setApplied(true);
    }

    return (
        <div className="Job">
            <div>
                <h3>{title}</h3>
                <h4>{companyName}</h4>
                <p>
                    {salary && <><span>salary: {salary}</span> <br /></>} 
                    {equity && <><span>equity: {equity}</span> <br /></>} 
                </p>
            </div>
            {(applied) ? <button>Applied</button>: <button onClick={apply}>Apply</button>}
        </div>
    );
}

export default Job;