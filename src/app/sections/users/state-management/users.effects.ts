import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UsersActions } from "./action-types";
import { map, switchMap } from "rxjs";
import { gotData } from "./users.actions";
import { UsersService } from "../services/users/users.service";

@Injectable()
export class UsersEffects {

    constructor(private actions$: Actions, private usersService: UsersService) {
    }

    getData$ = createEffect(
        () => this.actions$.pipe(
            ofType(UsersActions.getData),
            switchMap(action => this.usersService.getData(action.pageNumber, action.perPage)),
            map(data => {
                return gotData({ data });
            })
        )
    );
}