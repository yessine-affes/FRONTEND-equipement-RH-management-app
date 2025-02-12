import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeTableComponent } from './employee-table.component';
import { ReadEmployeeComponent } from './profil/reademployee.component';
import { AddEmployeeComponent } from './addemployee/addemployee.component';
import { CertificationComponent } from './certifications/certifications.component'; // Import CertificationsComponent

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: EmployeeTableComponent },
      { path: 'pages/employee/read-employee/:id', component: ReadEmployeeComponent },
      { path: 'pages/employee/addemployee', component: AddEmployeeComponent },
      { path: 'pages/employee/certifications', component: CertificationComponent }, // Add Certifications route
    ]),
  ],
  exports: [RouterModule],
})
export class EmployeeTableRoutingModule {}