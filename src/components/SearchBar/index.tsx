import React, {useState} from "react";
import "./styles.scss"
import Button from "../Button";

const SearchBar = (props : any) => {
  return (
    <section className="searchbar">
        <input type="text" onChange={e=> props.updateQuery(e.currentTarget.value)}/>
        <Button onClick={()=>props.updateNews()}>Filter</Button>
    </section>
  );
};

export default SearchBar;
