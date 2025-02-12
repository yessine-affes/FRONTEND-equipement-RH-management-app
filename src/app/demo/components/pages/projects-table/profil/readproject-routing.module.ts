import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadProjectComponent } from './readproject.component'; // Adjust path as necessary

const routes: Routes = [
  {
    path: '', 
    component: ReadProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadProjectRoutingModule { }
