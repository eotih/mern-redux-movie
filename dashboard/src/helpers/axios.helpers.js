import Axios from 'axios';

const token = `Bearer ${localStorage.getItem('token')}`;
const axios = Axios.create({
  baseURL: `${process.env.REACT_APP_WEB_API}`,
  headers: {
    Authorization: token
  }
});

export default axios;
