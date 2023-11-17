import React, {useContext, useEffect, useState} from "react";
import JoblyApi from "./api";
import Company from "./Company";
import SearchForm from "./SearchForm";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {context} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (context.token === ""){
            navigate("/");
        }
        async function get(){
            setCompanies(await JoblyApi.allCompanies());
            setIsLoading(false);
        }
        get();
    }, []);

    async function search(val){
        setIsLoading(true);
        setCompanies(await JoblyApi.allCompanies(val));
        setIsLoading(false);
    }
    
    if (isLoading){
        return <p>Loading &hellip;</p>;
    }

    return (
        <div>
            <SearchForm searchFunction={(val, evt) => search(val)}/>
            <ul>
                {companies.map(c => <li key={c.handle} style={{listStyleType: "none"}}><Company handle={c.handle} name={c.name} description={c.description} logoUrl={c.logoUrl}/></li>)}
            </ul>
        </div>
    );
}

export default CompanyList;