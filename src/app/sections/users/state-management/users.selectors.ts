import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DataState } from "./users.reducers";

export const selectDataState = createFeatureSelector<DataState>("dataState");

export const selectData = createSelector(
    selectDataState,
    (state: DataState) => state.data
);