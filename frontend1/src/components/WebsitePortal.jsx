import React, { useEffect, useState } from "react";
import { Navlink, useNavigate } from "react-router-dom";
import axios from "axios";

function WebsitePortal() {
  const [json1, setjson1] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const navigateToWebsiteContent = () => {
    if (!localStorage.getItem("token")) {
      // alert("rigisterd successfully");

      navigate("/");
    }
  };
  const onChangeHandler = async (event) => {
    await setInputValue(event.target.value);

  };

  const handleclick = async () => {
    let lowered = inputValue.toLowerCase()
    let searched = await json1.filter((ele) => ele.show.name.toLowerCase().includes(lowered))
    setjson1(searched)
    console.log(inputValue)
    console.log(searched)
  }
  const response = () => {
    axios
      .get("https://api.tvmaze.com/search/shows?q=stand")
      .then((data1) => {
        setjson1(data1.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Data Not Available")
      });
  };

  useEffect(() => {
    response();

  }, []);



  return (
    <div>
      <div class="topnav">
        <a class="active" href="#home">Home</a>
        <a href="/">Logout</a>
        <input type="text" name="name" onChange={(e) => onChangeHandler(e)} value={inputValue} placeholder="Search by Name" /><button className="searchbtn" onClick={handleclick}>Search</button>
      </div>
      <div>

        {json1 != 0 ? json1.map((val) => {
          return (

            <div className="main-con">
              <div class="container__profile">

                <h2>{val.show.name}</h2>
                <h4>Type:{val.show.type}</h4>
                <p>Score:{val.score}</p>
                <img src={val.show.image.original} alt="people" />
                <div class="container__profile__text"></div>
              </div>
              <div className="summ-container">
                <p>Language:{val.show.language}</p>
                <p>Status:{val.show.status}</p>
                <p>Genres:
                  {val.show.genres.map((val1) => (
                    < ul >
                      < li > {val1}</li>
                    </ul>

                  ))}</p>
                <p>Schedule:
                  <ul><li>Time:{val.show.schedule.time}</li></ul>

                  {val.show.schedule.days.map((val2) => (
                    < ul >
                      < li >Day: {val2}</li>
                      { }
                    </ul>

                  ))}</p>

                <p>Summary: {val.show.summary}</p>
              </div>
            </div>
          );
        }) : <h1>No Result Found</h1>}
      </div>
    </div >
  );
}

export default WebsitePortal;

{
  /* <div class="container__info">
  "type":"Scripted",
"language":"English",
"genres":[],
"status":"Ended",

"schedule":{
"time":"",
"days":[
"Thursday"
]
},
            <span>
              <i class="fas fa-eye"></i>2350
            </span>
            <span>
              <i class="fas fa-comment-alt"></i>624
            </span>
            <span>
              <i class="fas fa-download"></i>1470
            </span>
          </div>
          <di class="container__profile">
            <img src={""} alt="people" />
            <div class="container__profile__text">
              <h2>{val.score}</h2>
              <p>
                by <b>Joseph Therrien</b>
              </p>
            </div>
          </di> */
}
