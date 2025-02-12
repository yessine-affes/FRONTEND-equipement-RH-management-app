import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {  EquipementsTableComponent } from './equipements-table.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component:  EquipementsTableComponent }
	])],
	exports: [RouterModule]
})
export class EquipementsTableRoutingModule { }
