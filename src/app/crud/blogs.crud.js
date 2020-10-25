import axios from "axios";
export const GET_ALL_BLOGS = "/api/blogs/all";
export const CREATE_BLOG = "/api/blogs/create/images";
export const GET_BLOG_BY_ID = "/api/blogs/blog/";
export const UPDATE_BLOG = "/api/blogs/update/images";
export const REMOVE_BLOG = "/api/blogs/remove/";

export function createBlog(data) {
  return axios.post(CREATE_BLOG, data);
}
export function updateBlog(data) {
  return axios.put(UPDATE_BLOG, data);
}
export function removeBlog(id) {
  return axios.delete(`${REMOVE_BLOG}${id}`);
}

export function getAllBlogs() {
  return axios.get(GET_ALL_BLOGS);
}
export function getBlogById(id) {
  return axios.get(`${GET_BLOG_BY_ID}${id}`);
}
