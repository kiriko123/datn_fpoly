import axios from '../utils/axios-customize.js'

export const callRegister = ({ name, email, password, confirmPassword, firstName }) => {
    return axios.post('/api/v1/auth/register', { name, email, password, confirmPassword, firstName });
}
export const callLogin = ({ username, password }) => {
    return axios.post('/api/v1/auth/login', { username, password });
}
export const callFetchAccount = () => {
    return axios.get("/api/v1/auth/account");
}
export const callForgot = ({ email }) => {
    return axios.post("/api/v1/auth/forgot", { email });
}
export const callLogout = () => {
    return axios.post("/api/v1/auth/logout");
}
export const callFetchListUser = (query) => {
    return axios.get(`/api/v1/user?${query}`);
}
export const callDeleteUser = (userId) => {
    return axios.delete(`/api/v1/user/${userId}`);
}
export const callCreateUser = ({ name, firstName, email, password, passwordConfirm, age, gender, address, phoneNumber }) => {
    return axios.post('/api/v1/user', { name, firstName, email, password, passwordConfirm, age, gender, address, phoneNumber });
}
export const callBulkCreateUser = (data) => {
    return axios.post('/api/v1/user/bulk-create', data);
}
export const callUpdateUser = ({ id, name, firstName, email, age, gender, address, phoneNumber }) => {
    return axios.put(`/api/v1/user`, { id, name, firstName, email, age, gender, address, phoneNumber });
}
export const callUploadFile = (file, folder) => {
    // Tạo FormData để đính kèm tệp
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    return axios.post('/api/v1/files', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
export const callChangePassword = ({ email, password, newPassword, confirmPassword }) => {
    return axios.post('/api/v1/auth/change-password', { email, password, newPassword, confirmPassword })
}
export const callUpdateInfo = ({ id, firstName, name, userAvatar, gender, age, phoneNumber, address }) => {
    return axios.post('/api/v1/auth/update-info', { id, firstName, name, imageUrl: userAvatar, gender, age, phoneNumber, address });
};

// Hàm cho Slider
export const callGetSliders = () => {
    return axios.get('/api/v1/sliders');
};

export const callGetSliderById = (id) => {
    return axios.get(`/api/v1/sliders/${id}`);
};

export const callCreateSlider = (data) => {
    return axios.post('/api/v1/sliders', data);
};

export const callUpdateSlider = (data) => {
    return axios.put(`/api/v1/sliders/${data.id}`, data);
};

export const callDeleteSlider = (id) => {
    return axios.delete(`/api/v1/sliders/${id}`);
};


export const callFetchListBrand = (query) =>{
    return axios.get(`/api/v1/brand?${query}`);
}
export const callDeleteBrand = (brandId) =>{
    return axios.delete(`/api/v1/brand/${brandId}`);
}
export const callCreateBrand = ({name, description, thumbnail}) => {
    return axios.post('/api/v1/brand', {name, description, thumbnail});
}
export const callUpdateBrand = ({id, name, description, thumbnail}) => {
    return axios.put(`/api/v1/brand`, {id, name, description, thumbnail});
}


export const callFetchListCategory = (query) =>{
    return axios.get(`/api/v1/category?${query}`);
}

export const callCreateCategory = ({name, thumbnail, description, hot}) => {
    return axios.post('/api/v1/category', {name, thumbnail, description, hot});
}

export const callDeleteCategory = (categoryId) =>{
    return axios.delete(`/api/v1/category/${categoryId}`);
}

export const callUpdateCategory = ({id, name, thumbnail, description, hot}) => {
    return axios.put(`/api/v1/category`, {id, name, thumbnail, description, hot});
}

