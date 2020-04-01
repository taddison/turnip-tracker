import fetch from "isomorphic-unfetch";

export default (...args) => {
  return fetch(...args).then(res => res.json());
};