import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadTasksComponent } from './readtasks.component'; // Adjust path as necessary

const routes: Routes = [
  {
    path: '', 
    component: ReadTasksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadTasksRoutingModule { }
