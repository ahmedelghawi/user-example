import { createReducer, on } from "@ngrx/store";
import { UserData } from "../user-interfaces";
import { UsersActions } from "./action-types";

export interface DataState {
    data: UserData | undefined;
};

export const initialUsersState: DataState = {
    data: undefined
};

export const dataReducer = createReducer(
    initialUsersState,
    on(UsersActions.gotData, (state, action) => ({
        ...state,
        data: action.data
    }))
);