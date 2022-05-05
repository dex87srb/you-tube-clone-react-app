import "../../scss/modules/_videolist.scss";
import Pagination from "../Pagination";
import Header from "../Header/Header";
import { getDataRelated } from '../../api/ApiRelatedData'
import { VideoWindow } from "./VideoWindow";
import { useState, useEffect } from "react";
import React from 'react'

const Main = () => {

  //in purpose of checking if any video exist
  const [dataVideos, setData] = useState([]);

  const [status, setStatus] = useState("");
  const [dataRelated, setDataRelated] = useState([]);
  const [videoID, setVideoID] = useState("");
  const [visible, setVisible] = useState("");

  const searchUpdate = React.useRef(null);

  const ListVideos = (video) => {

    return (

      <ul className="video-list" >
        <div>
          <img src={video.data ? video.data.snippet.thumbnails.default.url : video.dataRelated.snippet.thumbnails.default.url} className="pointer" alt="" onClick={() => { videoRelated(video.data ? video.data.id : video.dataRelated.id) }} />
          <div>
            <h3>
              {video.data ? video.data.snippet.title : video.dataRelated.snippet.title}
            </h3>
            <p>{
              video.data ? video.data.snippet.description : video.dataRelated.snippet.description}</p>
          </div>
        </div>
      </ul>

    )
  }


  const paginate = () => {

    if (status === "Related Data") {

      searchUpdate.current =

        < Pagination data={dataRelated} pageLimit={5} dataLimit={10} RenderComponent={
          ListVideos
        } />
    }

  };


  useEffect(() => {

    paginate();

  });


  function videoRelated(video) {

    let videoRelatedID;
    videoRelatedID = video.videoId;

    getDataRelated(videoRelatedID)
      .then((json) => {

        let arrayDataFiltered = [];
        let i = 0

        json.items.forEach(element => {
          if (element.snippet)
            arrayDataFiltered[i++] = element
        });

        setDataRelated([...arrayDataFiltered]);
        setStatus("Related Data");
        setVideoID(videoRelatedID);
        setVisible("visible");

      })
  }


  function passData(data) {

    let dataVideosClone = JSON.parse(JSON.stringify(data));
    setData(dataVideosClone);

    let condSearch = "Search Data"
    setStatus(condSearch);


    if (status === "Search Data")
      searchUpdate.current =

        < Pagination data={data} pageLimit={5} dataLimit={10} RenderComponent={
          ListVideos
        } />

  }

  return (
    <>
      <Header passData={passData} />
      <main className="wrapper">
        <VideoWindow videoID={videoID} class={visible} />
        {dataVideos.length !== 0 ? searchUpdate.current : ""}
      </main>
    </>
  )
}


export default Main;