import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  UpdateProjectComponent } from './updateproject.component';

const routes: Routes = [
    { path: '', component: UpdateProjectComponent },
    { path: 'pages/equipement-table/update/edit/:id', component: UpdateProjectComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UpdateProjectRoutingModule { }
