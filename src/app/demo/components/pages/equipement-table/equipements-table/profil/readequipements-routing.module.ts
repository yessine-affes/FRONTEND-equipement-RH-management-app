import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadEquipementsComponent } from './readequipements.component';

const routes: Routes = [
  { path: '', component: ReadEquipementsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]  // Exporting RouterModule to be used in ReadEquipementsModule
})
export class ReadEquipementsRoutingModule { } // Ensure this name is correct
