import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UpdateTaskAssignmentsComponent } from './update-task-assignments.component';

const routes: Routes = [
  {
    path: '', 
    component: UpdateTaskAssignmentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateTaskAssignmentsRoutingModule { }
