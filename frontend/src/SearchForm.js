import React, {useState} from "react";

function SearchForm({searchFunction}) {
    const [search, setSearch] = useState("");

    function handleChange(evt){
        setSearch(evt.target.value);
    }

    function handleSubmit(evt){
        evt.preventDefault();
        searchFunction(search);
        setSearch("");
    }

  return (
    <form style={{display: "flex", justifyContent: "center", flexDirection: "row"}} onSubmit={handleSubmit}>
        <input placeholder="Enter search term" onChange={handleChange}/>
        <button>Submit</button>
    </form>
  );
}

export default SearchForm;