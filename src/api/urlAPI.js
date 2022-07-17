import axios from "axios";

const createShortenURL = async (url) => {
  return await axios
    .post(
      "http://url-shortening-stella-backend.herokuapp.com/api/url/createShortenUrl?actualUrl=" +
        url
    )
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export default createShortenURL;
