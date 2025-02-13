import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

// Register Request
export const registerApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody, "");
};

// Login API
export const loginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody);
};

// Update User Profile
export const updateuserprofileApi = async (reqBody, reqHeaders) => {
    return await commonApi('PUT', `${serverUrl}/update-userprofile`, reqBody, reqHeaders);
};

// ------------------- BLOG APIs ------------------- //

// Upload Blog (with Image Upload)
export const uploadBlogApi = async (reqBody, reqHeaders) => {
    return await commonApi('POST', `${serverUrl}/add-blog`, reqBody, reqHeaders);
};

export const getAllBlogsApi = async (searchkey = '', reqHeaders) => {
    const searchParam = searchkey ? `?search=${searchkey}` : '';
    return await commonApi('GET', `${serverUrl}/all-blogs${searchParam}`, "", reqHeaders);
};

// Get Home Blogs (Public Blogs for Home Page)
export const getHomeBlogsApi = async () => {
    return await commonApi('GET', `${serverUrl}/home-blogs`);
};

// Get User-Specific Blogs
export const getUserBlogsApi = async (reqHeaders) => {
    return await commonApi('GET', `${serverUrl}/user-blogs`, "", reqHeaders);
};

// Delete User Blog
export const deleteUserBlogApi = async (id, reqHeaders) => {
    return await commonApi('DELETE', `${serverUrl}/remove-userblog/${id}`, {}, reqHeaders);
};

// Update User Blog
export const updateUserBlogApi = async (id, reqBody, reqHeaders) => {
    return await commonApi('PUT', `${serverUrl}/update-userblog/${id}`, reqBody, reqHeaders);
};

// ------------------- COMMENT APIs ------------------- //
// Add Comment
export const addCommentApi = async (blogId, reqBody, reqHeaders) => {
    return await commonApi('POST', `${serverUrl}/api/comments/${blogId}`, reqBody, reqHeaders);
};

// Get Comments for a Blog
export const getCommentsApi = async (blogId) => {
    return await commonApi('GET', `${serverUrl}/api/comments/${blogId}`);
};