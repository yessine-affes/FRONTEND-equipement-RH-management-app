import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateEmployeeComponent } from './updateemployee.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateEmployeeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateEmployeeRoutingModule {}
