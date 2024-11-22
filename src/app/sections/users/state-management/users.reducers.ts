import { createReducer, on } from "@ngrx/store";
import { User, UserData } from "../interfaces/user-interfaces";
import { UsersActions } from "./action-types";

export interface DataState {
    data: UserData | undefined;
    user: User | undefined;
};

export const initialDataState: DataState = {
    data: undefined,
    user: undefined
};

export const dataReducer = createReducer(
    initialDataState,
    on(UsersActions.gotData, (state, action) => ({
        ...state,
        data: action.data
    })),
    on(UsersActions.gotUser, (state, action) => ({
        ...state,
        user: action.user
    })),
    on(UsersActions.updatedUser, (state, action) => ({
        ...state,
        data: action.data
    }))
);