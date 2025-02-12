import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './addemployee.component'; // Adjust path if necessary

const routes: Routes = [
  {
    path: '', 
    component: AddEmployeeComponent  // Ensure the correct component is imported
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEmployeeRoutingModule { }
