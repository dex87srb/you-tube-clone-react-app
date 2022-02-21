import axios from 'axios';

export const GetData = (q) => {

  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${q}&key=${process.env.REACT_APP_KEY}`;

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




