import axios from 'axios';

export const getDataRelated = (id) => {

  let url =
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&relatedToVideoId=${id}&key=${process.env.REACT_APP_KEY}`;

  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        return resolve(
          response.data
        );
      })
      .catch((error) => {
        console.log(error);
        return reject(error);
      });
  });




}


