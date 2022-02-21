import "../../scss/modules/_videolist.scss";
import Pagination from "../Pagination";
import Header from "../Header/Header";
import { Component } from "react";
import { getDataRelated } from '../../api/ApiRelatedData'
import { VideoWindow } from "./VideoWindow";


class Main extends Component {

  constructor(props) {
    super();
    this.state = {
      data: [],
      status: "",
      dataRelated: [],
      videoID: "",
      visible: ""
    }

    this.videoRelated = this.videoRelated.bind(this)
  }


  videoRelated = (video) => {

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

        this.setState({
          dataRelated: [...arrayDataFiltered],
          status: "Related Data",
          videoID: videoRelatedID,
          visible: "visible"
        })

      })
  }


  ListVideos = (video) => {

    return (

      <ul className="video-list" >
        <div>
          <img src={video.data ? video.data.snippet.thumbnails.default.url : video.dataRelated.snippet.thumbnails.default.url} className="pointer" alt="" onClick={() => { this.videoRelated(video.data ? video.data.id : video.dataRelated.id) }} />
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

  PassData = (data) => {

    this.setState({
      data: [...data],
      status: "Search Data"
    })

  }

  render() {

    let searchResults;

    if (this.state.data.length !== 0) {

      if (this.state.status === "Search Data")
        searchResults =

          < Pagination data={this.state.data} pageLimit={5} dataLimit={10} RenderComponent={
            this.ListVideos
          } />
      else if (this.state.status === "Related Data") {

        searchResults =

          < Pagination data={this.state.dataRelated} pageLimit={5} dataLimit={10} RenderComponent={
            this.ListVideos
          } />
      }
    }
    return (

      <>
        <Header PassData={this.PassData} />
        <main className="wrapper">
          <VideoWindow videoID={this.state.videoID} class={this.state.visible} />
          {searchResults}

        </main>
      </>
    )
  }

}


export default Main;
