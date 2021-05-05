import axios from "config/axios";
import { User } from "shared/types/user.type";

export const authenticate = (data: { email: string; password: string }) =>
  axios.post<string>("/login", data);

export const getAuthenticatedUser = () => axios.get<User>("/user");

export const deleteAuthToken = () => axios.post("/logout");

export const signup = (data: {
  username: string;
  email: string;
  password: string;
}) => axios.post("/signup", data);
