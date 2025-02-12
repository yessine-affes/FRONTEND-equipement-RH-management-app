import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateTasksComponent } from './updatetasks.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateTasksComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateTasksRoutingModule {}
