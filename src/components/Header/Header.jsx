import { useState, useEffect } from "react";
import "../../scss/modules/_header.scss";
import logo from "../../images/youtube-logo.png";
import { getData } from "../../api/api";
import React from 'react'


const Header = ({ passData }) => {

  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {

    if (data)
      passData(data);

  }, [data]);


  function handleChange(e) {
    setInput(e.target.value)
  }

  function onSubmitForm(e) {
    e.preventDefault();

    getData(input)
      .then((json) => {

        let arrayCloneData = JSON.parse(JSON.stringify(json.items));

        setData(arrayCloneData);
      })

    setInput("");
  }

  return (<header>
    <form onSubmit={onSubmitForm}>
      <div className="wrapper">
        <img src={logo} alt="something" />
        <section className="search">
          <input
            onChange={handleChange}
            value={input}
          />
          <button>Search</button>
        </section>
      </div>
    </form>
  </header>);
}

export default Header;