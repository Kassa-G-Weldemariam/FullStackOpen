import axios from "axios";

const Url = "/api/persons";

const getAll = () =>
  axios.get(Url).then((res) => {
    return res.data;
  });

const create = (newObject) =>
  axios.post(Url, newObject).then((res) => {
    return res.data;
  });

const clear = (id) => {
  return axios.delete(`${Url}/${id}`);
};

const update = (id, updatedObject) => {
  return axios.put(`${Url}/${id}`, updatedObject);
};

export default {
  getAll,
  create,
  clear,
  update,
};
