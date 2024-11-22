import { createAction, props } from "@ngrx/store";
import { User, UserData } from "../interfaces/user-interfaces";

export const getData = createAction(
    "[Data Resolver] Get Data",
    props<{pageNumber: number, perPage: number}>()
);

export const gotData = createAction(
    "[Get Data Effect] Got data",
    props<{data: UserData | undefined}>()
);

export const getUser = createAction(
    "[User Resolver] Get User",
    props<{id: number}>()
);

export const gotUser = createAction(
    "[Get User Effect] Got user",
    props<{user: User | undefined}>()
);

export const updateUser = createAction(
    "[Update User Effect] Update user",
    props<{userId: number, details: any}>()
)

export const updatedUser = createAction(
    "[Updated User Effect] Updated user",
    props<{data: UserData | undefined}>()
)