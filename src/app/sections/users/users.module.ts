import { NgModule } from "@angular/core";
import { UsersComponent } from "./users.component";
import { UsersRoutingModule } from "./users-routing.module";
import { AsyncPipe, JsonPipe } from "@angular/common";
import { provideState, provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { UsersEffects } from "./state-management/users.effects";
import { dataReducer } from "./state-management/users.reducers";

@NgModule({
    imports: [
        UsersRoutingModule,
        AsyncPipe,
        JsonPipe
    ],
    declarations: [
        UsersComponent
    ],
    providers: [
        provideState({name: 'dataState', reducer: dataReducer}),
        provideEffects([UsersEffects])
    ]
})
export class UsersModule {}