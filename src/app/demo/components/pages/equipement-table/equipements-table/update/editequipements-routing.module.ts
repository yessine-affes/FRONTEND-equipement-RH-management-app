import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEquipementsComponent } from './editequipements.component';

const routes: Routes = [
    { path: '', component: EditEquipementsComponent },
    { path: 'pages/equipement-table/update/edit/:id', component: EditEquipementsComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditEquipementsRoutingModule { }
