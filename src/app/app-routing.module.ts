import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from '../app/demo/components/auth/auth.guard';
import { UpdateTasksComponent } from './demo/components/pages/projects-table/tasks/updatetasks/updatetasks.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            // Login module route
            {
                path: '',
                loadChildren: () =>
                    import('./demo/components/auth/login/login.module').then(
                        (m) => m.LoginModule
                    ),
            },

            // Main layout with child routes
            {
                path: '',
                component: AppLayoutComponent,
                children: [
                    {
                        path: 'dashboard',
                        /* , canActivate: [AuthGuard] */
                        loadChildren: () =>
                            import('./demo/components/dashboard/dashboard.module').then(
                                (m) => m.DashboardModule
                            ),
                    },
                    {
                        path: 'uikit',
                        /* , canActivate: [AuthGuard] */
                        loadChildren: () =>
                            import('./demo/components/uikit/uikit.module').then(
                                (m) => m.UIkitModule
                            ),
                    },
                    {
                        path: 'blocks',
                        /* , canActivate: [AuthGuard] */
                        loadChildren: () =>
                            import('./demo/components/primeblocks/primeblocks.module').then(
                                (m) => m.PrimeBlocksModule
                            ),
                    },
                    {
                        path: 'pages',
                        /* , canActivate: [AuthGuard] */
                        loadChildren: () =>
                            import('./demo/components/pages/pages.module').then(
                                (m) => m.PagesModule
                            ),
                    },
                    {
                        path: 'profil',
                        /* , canActivate: [AuthGuard] */
                        loadChildren: () =>
                            import('./demo/components/auth/profil/profil.module').then(
                                (m) => m.ProfilModule
                            ),
                    },
                    // Direct route for UpdateTasksComponent
                    {
                        path: 'update-tasks/:projectId',
                        component: UpdateTasksComponent,
                    },
                    {
                        path: 'gererCertif/:id',
                        loadChildren: () =>
                            import('./demo/components/pages/employee-table/certifications/certifications.module').then(
                                (m) => m.CertificationModule
                            ),
                    }
                ],
            },

            // Additional routes
            {
                path: 'register',
                /* , canActivate: [AuthGuard] */
                loadChildren: () =>
                    import('./demo/components/auth/register/register.module').then(
                        (m) => m.RegisterModule
                    ),
            },
            {
                path: 'access',
                loadChildren: () =>
                    import('./demo/components/auth/access/access.module').then(
                        (m) => m.AccessModule
                    ),
            },

            // Not found and fallback routes
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ],
        {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            onSameUrlNavigation: 'reload',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
