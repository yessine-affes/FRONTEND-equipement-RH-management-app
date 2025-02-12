import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './addproject.component'; // Adjust path if necessary

const routes: Routes = [
  {
    path: '', 
    component: AddProjectComponent // Ensure the correct component is imported
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddProjectRoutingModule { }
