import { createAction, props } from "@ngrx/store";
import { User, UserData } from "../user-interfaces";

export const getData = createAction(
    "[Data Resolver] Get Data",
    props<{pageNumber: number, perPage: number}>()
);

export const gotData = createAction(
    "[Get Data Effect] Got data",
    props<{data: UserData}>()
);