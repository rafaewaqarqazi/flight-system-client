import axios from "axios";

export const GET_ALL_LAWYERS = "/api/users/lawyers/all";
export const GET_ALL_CASES = "/api/cases/all";
export const ALLOW_HIRING = '/api/users/lawyers/allow/hiring'
export const HIRE_LAWYER = '/api/users/lawyers/hire'
export const REVIEW_LAWYER = '/api/users/lawyers/review'
export const ADD_HEARING = '/api/cases/hearing/add'
export const CHANGE_HEARING_STATUS = '/api/cases/hearing/status'
export const COMPLETE_CASE = '/api/cases/complete'
export function getAllLawyers() {
  return axios.get(GET_ALL_LAWYERS);
}

export const allowHiring = (data) => {
  return axios.put(ALLOW_HIRING, data);
}
export const hireLawyer = data => {
  return axios.post(HIRE_LAWYER, data);
}
export const addHearing = data => {
  return axios.put(ADD_HEARING, data);
}
export const submitReview = data => {
  return axios.put(REVIEW_LAWYER, data);
}
export const changeHearingStatus = data => {
  return axios.put(CHANGE_HEARING_STATUS, data);
}
export const completeCase = data => {
  return axios.put(COMPLETE_CASE, data);
}
export const getAllCases = ({userId, userType}) => {
  return axios.get(`${GET_ALL_CASES}?userId=${userId}&userType=${userType}`);
}
