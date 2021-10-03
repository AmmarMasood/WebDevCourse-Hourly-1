import axios from "axios";
import setAuthToken from "../Utils/setAuthToken";

export const registerNewUser = (values, history, setError, setLoading) => {
  return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/register`, values)
    .then((res) => {
      setLoading(false);
      setError("");
      history.push("/login");
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      }
      console.log(err);
      setLoading(false);
    });
};

export const loginUser = (values, history, setError, setLoading) => {
  return axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/login`, values)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("jwt", res.data.token);
      setLoading(false);
      setError("");
      history.push("/dashboard");
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      }
      console.log(err);
      setLoading(false);
    });
};

export const getUserInfo = (setLoading, setError) => {
  setAuthToken(localStorage.getItem("jwt"));
  return axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/me`)
    .then((res) => {
      setLoading(false);
      setError("");
      return {
        success: true,
        data: res.data.data,
      };
    })
    .catch((err) => {
      setLoading(false);
      setError(
        "Unable to fetch your profile, there might be something wrong with our servers"
      );
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      }
      return {
        success: false,
        data: err,
      };
    });
};

export const logoutUser = (history, setUserInfo) => {
  localStorage.removeItem("jwt");
  setUserInfo({});
  history.push("/");
};
