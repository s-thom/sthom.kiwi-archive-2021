import { path } from 'static-path';

export const home = path('/');

export const about = path('/about');
export const projects = path('/my-projects');

export const blog = path('/blog');
export const blogPost = blog.path('/posts/:slug');
