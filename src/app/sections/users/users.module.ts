import { NgModule } from "@angular/core";
import { UsersRoutingModule } from "./users-routing.module";
import { AsyncPipe, JsonPipe, NgOptimizedImage, NgStyle } from "@angular/common";
import { provideState } from "@ngrx/store";
import { provideEffects } from "@ngrx/effects";
import { UsersEffects } from "./@core/state-management/users.effects";
import { dataReducer } from "./@core/state-management/users.reducers";
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserCardComponent } from "./components/user-card/user-card.component";
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { DeleteDialogComponent } from "./components/delete-dialog/delete-dialog.component";
import { UsersComponent } from "./users.component";
import { EditUserComponent } from "./components/edit-user/edit-user.component";
import {
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  } from '@angular/material/dialog';

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
        NgOptimizedImage,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent
    ],
    declarations: [
        UsersComponent,
        UserCardComponent,
        EditUserComponent,
        DeleteDialogComponent
    ],
    providers: [
        provideState({name: 'dataState', reducer: dataReducer}),
        provideEffects([UsersEffects])
    ]
})
export class UsersModule {}