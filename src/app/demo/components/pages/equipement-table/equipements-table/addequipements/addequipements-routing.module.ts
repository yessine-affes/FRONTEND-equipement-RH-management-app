import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEquipementsComponent } from './addequipements.component'; // Adjust path if necessary

const routes: Routes = [
  {
    path: '', 
    component: AddEquipementsComponent  // Ensure the correct component is imported
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEquipementsRoutingModule { }
