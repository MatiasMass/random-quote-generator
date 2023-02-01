import axios from "axios";

const baseUrl = "https://type.fit/api/quotes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAll };