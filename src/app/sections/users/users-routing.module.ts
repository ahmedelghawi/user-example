import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./users.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}