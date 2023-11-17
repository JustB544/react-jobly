import React from "react";
import { Link } from "react-router-dom";
import './Company.css'

function Company({handle, name, description, logoUrl}) {
  return (
    <Link to={`/companies/${handle}`} className="Company">
        <div>
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
        {logoUrl && <img src={logoUrl} alt={`${handle}-logo`}/>}
    </Link>
  );
}

export default Company;