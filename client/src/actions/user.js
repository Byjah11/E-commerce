import * as api from "../api/api";
import { start, error, loginSuccess, logoutSuccess } from "../redux/userSlice";

export const register = async (formData, dispatch) => {
  dispatch(start());
  try {
    const { data } = await api.register(formData);

    dispatch(loginSuccess(data.user));
  } catch (err) {
    dispatch(error());
  }
};

export const login = async (formData, dispatch) => {
  dispatch(start());
  try {
    const { data } = await api.login(formData);

    dispatch(loginSuccess(data.user));
  } catch (err) {
    dispatch(error());
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutSuccess());
};
