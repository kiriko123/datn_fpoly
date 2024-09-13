import axios from '../utils/axios-customize.js'

export const callRegister = ({name, email, password, confirmPassword, firstName}) => {
    return axios.post('/api/v1/auth/register', {name, email, password, confirmPassword, firstName});
}
export const callLogin = ({ username, password}) => {
    return axios.post('/api/v1/auth/login', {username, password});
}
export const callFetchAccount = () =>{
    return axios.get("/api/v1/auth/account");
}
export const callLogout = () => {
    return axios.post("/api/v1/auth/logout");
}
export const callFetchListUser = (query) =>{
    return axios.get(`/api/v1/user?${query}`);
}
export const callDeleteUser = (userId) =>{
    return axios.delete(`/api/v1/user/${userId}`);
}
export const callCreateUser = ({name, email, password}) => {
    return axios.post('/api/v1/user', {name, email, password});
}
export const callBulkCreateUser = (data) => {
    return axios.post('/api/v1/user/bulk-create', data);
}
export const callUpdateUser = ({id, name, password}) => {
    return axios.put(`/api/v1/user`, {id, name, password});
}