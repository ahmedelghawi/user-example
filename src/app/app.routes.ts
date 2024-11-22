import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
    },
    {
        path: 'users',
        loadChildren: () =>
            import('./sections/users/users.module').then(
                (m: typeof import ('./sections/users/users.module')) => m.UsersModule // Lazy loading functionality for the User Module
            )
    }
];
