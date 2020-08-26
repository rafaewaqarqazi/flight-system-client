import axios from "axios";

export const LOGIN_URL = "/api/auth/login";
export const REGISTER_URL = "/api/auth/register";
export const EDIT_PROFILE_URL = "/api/auth/profile/edit";
export const EDIT_PROFILE_IMAGE_URL = "/api/auth/profile/image";
export const REQUEST_PASSWORD_URL = "/api/auth/forgot-password";
export const RESET_PASSWORD_URL = "/api/auth/reset-password";
export const CHANGE_PASSWORD_URL = "/api/auth/change-password";
export const GET_ADMINS_URL = "/api/auth/admins/all";
export const REMOVE_ADMIN_URL = "/api/auth/admins/remove";
export const ADMIN_CREATE_URL = "/api/auth/admins/create";


export function login(email, password) {
  return axios.post(LOGIN_URL, { email, password });
}

export function getAdmins() {
  return axios.get(GET_ADMINS_URL);
}
export function removeAdmin(adminId) {
  return axios.put(REMOVE_ADMIN_URL, {adminId});
}

export function register(data) {
  return axios.post(`${REGISTER_URL}`, data);
}
export function createAdmin(data) {
  return axios.post(ADMIN_CREATE_URL, data);
}
export function editProfile(data) {
  return axios.put(`${EDIT_PROFILE_URL}`, data);

}export function editProfileImage(data) {
  return axios.put(`${EDIT_PROFILE_IMAGE_URL}/images`, data);
}

export function requestPassword(email) {
  return axios.put(REQUEST_PASSWORD_URL, { email });
}
export function resetPassword(data) {
  return axios.put(RESET_PASSWORD_URL, data);
}
export function changePassword(data) {
  return axios.put(CHANGE_PASSWORD_URL, data);
}

