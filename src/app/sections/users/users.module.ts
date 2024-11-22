import { NgModule } from "@angular/core";
import { UsersComponent } from "./users.component";
import { UsersRoutingModule } from "./users-routing.module";
import { AsyncPipe, CommonModule, JsonPipe, NgOptimizedImage, NgStyle } from "@angular/common";
import { provideState, provideStore } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { UsersEffects } from "./state-management/users.effects";
import { dataReducer } from "./state-management/users.reducers";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserCardComponent } from "../../components/user-card/user-card.component";
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
    imports: [
        UsersRoutingModule,
        AsyncPipe,
        JsonPipe,
        NgStyle,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatPaginatorModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        NgOptimizedImage
    ],
    declarations: [
        UsersComponent,
        UserCardComponent,
        EditUserComponent
    ],
    providers: [
        provideState({name: 'dataState', reducer: dataReducer}),
        provideEffects([UsersEffects])
    ]
})
export class UsersModule {}