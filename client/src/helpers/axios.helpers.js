import Axios from 'axios';

const token = `Bearer ${localStorage.getItem('token')}`;
const axios = Axios.create({
  baseURL: `${process.env.REACT_APP_WEB_API}`,
  headers: {
    Authorization: token
  }
});
// axios.interceptors.request.use(async (config) => config);

// axios.interceptors.response.use((response) => {
//   if (response && response.data) return response.data;
//   return response;
// }, (error) => {
//   throw error;
// });
export default axios;
