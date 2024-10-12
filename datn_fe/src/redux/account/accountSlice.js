import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        "email": "",
        "name": "",
        "imageUrl": "",
        "firstName": "",
        "age":"",
        "phoneNumber": "",
        "address": "",
        "gender":"",
        "role": {
            "id": "",
            "name": ""
        },
        "id": "",
        "googleAccount": "",
    },
    tempAvatar: ""
};


export const accountSlice = createSlice({
    name: 'account',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        doLoginAction: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        doGetAccountAction: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload.data;
        },
        doLogoutAction: (state, action) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.isLoading = true;
            state.user = {
                "email": "",
                "name": "",
                "imageUrl": "",
                "firstName": "",
                "age":"",
                "phoneNumber": "",
                "address": "",
                "gender":"",
                "role": {
                    "id": "",
                    "name": ""
                },
                "id": "",
                "googleAccount": "",
            }
            state.tempAvatar = "";
        },
        doUploadAvatarAction: (state, action) => {
            state.tempAvatar = action.payload.avatar
        },
        doUpdateUserInfoAction: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload // Cập nhật thông tin user từ payload
            };
        }
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {

    },
});

export const {doLoginAction,
    doGetAccountAction,
    doLogoutAction,
    doUploadAvatarAction,
    doUpdateUserInfoAction} = accountSlice.actions;


export default accountSlice.reducer;
