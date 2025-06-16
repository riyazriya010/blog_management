import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
}

const initialState: User = {
    _id: '',
    username: '',
    email: '',
    password: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            return { ...state, ...action.payload };
        },
        clearUser: () => {
            return initialState;
        }
    }
});

export const { updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
