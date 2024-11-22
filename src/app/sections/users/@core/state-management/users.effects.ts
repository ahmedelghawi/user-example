import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersActions } from "./action-types";
import { map, switchMap, withLatestFrom } from "rxjs";
import { addedUser, deletedUser, gotData, gotUser, updatedUser } from "./users.actions";
import { select, Store } from "@ngrx/store";
import { selectData } from "./users.selectors";
import { UsersService } from "../services/users/users.service";
import { Router } from "@angular/router";

@Injectable()
export class UsersEffects {

    userId!: number;

    constructor(
        private actions$: Actions,
        private usersService: UsersService,
        private store: Store,
        private router: Router) {
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
                                    first_name: data.first_name,
                                    last_name: data.last_name,
                                    email: data.email
                                }
                                : user
                            );
                            storeData = { ...storeData, data: updatedData};
                            this.router.navigateByUrl('/users');
                        }

                        return updatedUser({data: storeData})
                    })
                );
            })
        )
    );

    deleteUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(UsersActions.deleteUser),
            switchMap(action => {
                this.userId = action.userId;
                return this.usersService.deleteUser(action.userId).pipe(
                    withLatestFrom(this.store.pipe(select(selectData))),
                    map(([data, storeData]) => {
                        if (storeData) {
                            const index = storeData.data.findIndex(user => user.id === this.userId);
                            const updatedData = [...storeData.data]
                            updatedData.splice(index, 1);
                            
                            storeData = { ...storeData, data: updatedData};
                        }

                        return deletedUser({data: storeData})
                    })
                );
            })
        )
    );

    addUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(UsersActions.addUser),
            switchMap(action => {
                return this.usersService.createUser(action.details).pipe(
                    withLatestFrom(this.store.pipe(select(selectData))),
                    map(([data, storeData]) => {
                        if (storeData) {
                            const updatedData = [...storeData.data]
                            updatedData.push(data);
                            storeData = { ...storeData, data: updatedData};
                            this.router.navigateByUrl('/users');
                        }
                        return addedUser({data: storeData})
                    })
                );
            })
        )
    );
}