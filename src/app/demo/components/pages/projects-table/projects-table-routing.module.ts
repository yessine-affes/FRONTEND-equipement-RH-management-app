import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectsTableComponent } from './projects-table.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProjectsTableComponent }
	])],
	exports: [RouterModule]
})
export class ProjectsTableRoutingModule { }
