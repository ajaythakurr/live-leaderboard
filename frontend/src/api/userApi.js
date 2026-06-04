import api from "./axios";

export const registerUser = (userData) =>
  api.post("/users/register", userData);

export const loginUser = (userData) =>
  api.post("/users/login", userData);

export const getCurrentUser = () =>
  api.get("/users/me");

export const getAllUsers = () =>
  api.get("/users");

export const getUserById = (id) =>
  api.get(`/users/${id}`);