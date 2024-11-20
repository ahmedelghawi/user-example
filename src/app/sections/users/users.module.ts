import { NgModule } from "@angular/core";
import { UsersComponent } from "./users.component";
import { UsersRoutingModule } from "./users-routing.module";
import { AsyncPipe, JsonPipe, NgStyle } from "@angular/common";
import { provideState, provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { UsersEffects } from "./state-management/users.effects";
import { dataReducer } from "./state-management/users.reducers";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserCardComponent } from "../../components/user-card/user-card.component";

@NgModule({
    imports: [
        UsersRoutingModule,
        AsyncPipe,
        JsonPipe,
        NgStyle,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [
        UsersComponent,
        UserCardComponent
    ],
    providers: [
        provideState({name: 'dataState', reducer: dataReducer}),
        provideEffects([UsersEffects])
    ]
})
export class UsersModule {}