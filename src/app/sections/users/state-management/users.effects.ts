import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersActions } from "./action-types";
import { map, switchMap, withLatestFrom } from "rxjs";
import { gotData, gotUser, updatedUser } from "./users.actions";
import { UsersService } from "../services/users/users.service";
import { select, Store } from "@ngrx/store";
import { selectData } from "./users.selectors";

@Injectable()
export class UsersEffects {

    userId!: number;

    constructor(private actions$: Actions, private usersService: UsersService, private store: Store) {
    }

    getData$ = createEffect(
        () => this.actions$.pipe(
            ofType(UsersActions.getData),
            switchMap(action => this.usersService.getData(action.pageNumber, action.perPage)),
            map(data => gotData({ data }))
        )
    );

    getUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(UsersActions.getUser),
            switchMap(action => this.usersService.getUser(action.id)),
            map(user => gotUser({ user }))
        )
    );

    updateUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(UsersActions.updateUser),
            switchMap(action => {
                this.userId = action.userId;
                return this.usersService.editUser(action.userId, action.details).pipe(
                    withLatestFrom(this.store.pipe(select(selectData))),
                    map(([data, storeData]) => {
                        if (storeData) {
                            const updatedData = storeData.data.map(user => 
                                user.id === this.userId ? {
                                    ...user,
                                    first_name: data.first_name ?? user.first_name,
                                    last_name: data.last_name ?? user.last_name,
                                    email: data.email ?? user.email
                                }
                                : user
                            );
                            storeData = { ...storeData, data: updatedData};
                        }

                        return updatedUser({data: storeData})
                    })
                );
            })
        )
    );
}