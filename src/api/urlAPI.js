import axios from "axios";

const createShortenURL = async (url) => {
  return await axios
    .post("http://localhost:9000/api/url/createShortenUrl?actualUrl=" + url)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
};

export default createShortenURL;
