import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./users.component";
import { NgModule } from "@angular/core";
import { EditUserComponent } from "./components/edit-user/edit-user.component";

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        pathMatch: 'full'
    },
    {
        path: 'edit-user/:id',
        component: EditUserComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}