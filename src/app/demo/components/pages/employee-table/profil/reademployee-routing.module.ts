import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadEmployeeComponent } from './reademployee.component'; // Adjust path as necessary

const routes: Routes = [
  {
    path: '', 
    component: ReadEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
