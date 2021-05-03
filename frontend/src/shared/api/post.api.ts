import { Post } from "shared/types/post.type";
import axios from "config/axios";

const ENDPOINT = "/post";

export const getPost = (id: string | number) =>
  axios.get<Post>(`${ENDPOINT}/${id}`);

export const getPosts = (page: number, size: number) =>
  axios.get<{ page: Post[]; totalPages: number }>(
    `${ENDPOINT}?page=${page}&size=${size}`
  );

export const createPost = (data: { title: string; content: string }) =>
  axios.post<{ id: number }>(ENDPOINT, data);

export const modifyPost = (data: Post) => axios.put<Post>(ENDPOINT, data);

export const deletePost = (id: number) =>
  axios.delete<Post>(`${ENDPOINT}/${id}`);
