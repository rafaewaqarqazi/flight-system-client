import axios from "axios";
export const JOB_POST_URL = "/api/jobs/new";
export const JOB_EDIT_URL = "/api/jobs/edit";
export const JOB_DELETE_URL = "/api/jobs/delete";
export const JOB_TEST_INTERVIEW_STATUS_URL = "/api/jobs/status/testInterview";
export const JOB_TEST_INTERVIEW_SCHEDULE_URL = "/api/jobs/schedule/testInterview";
export const JOB_APPLY_URL = "/api/jobs/apply";
export const SELECT_REJECT_URL = "/api/jobs/status/selectReject";
export const ALL_JOBS_URL = "/api/jobs/all";

export function postJob(values) {
  return axios.post(JOB_POST_URL, values);
}
export function editJob(values) {
  return axios.put(JOB_EDIT_URL, values);
}
export function deleteJob(id) {
  return axios.put(JOB_DELETE_URL, {id});
}
export function applyForJob(data) {
  return axios.put(JOB_APPLY_URL, data);
}
export function scheduleTestInterview(data) {
  return axios.put(JOB_TEST_INTERVIEW_SCHEDULE_URL, data);
}
export function changeTestInterviewStatus(data) {
  return axios.put(JOB_TEST_INTERVIEW_STATUS_URL, data);
}
export function selectRejectCandidate(data) {
  return axios.put(SELECT_REJECT_URL, data);
}
export function getAllJobs() {
  return axios.get(ALL_JOBS_URL);
}