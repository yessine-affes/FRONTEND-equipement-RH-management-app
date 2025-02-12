import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { RouterModule } from '@angular/router';
import { UpdateEmployeeComponent } from './updateemployee.component'; // Correct path for UpdateEmployeeComponent
import { UpdateEmployeeRoutingModule } from './updateemployee-routing.module';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CertificationComponent } from '../certifications/certifications.component'; // Import CertificationsComponent
import { CertificationService } from '../certifications/certification.service';
@NgModule({
  declarations: [
    UpdateEmployeeComponent, // Declare UpdateEmployeeComponent
    
  ],
  imports: [
    DropdownModule,
    RadioButtonModule,
    CheckboxModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Include ReactiveFormsModule for reactive forms
    UpdateEmployeeRoutingModule, // Include the routing module for UpdateEmployee
    CardModule,
    ChipModule,
    RouterModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    TableModule,
    CalendarModule,
    InputTextModule,
    InputNumberModule,
  ],  providers: [
    CertificationService, // Register the service here
  ],
})
export class UpdateEmployeeModule {}
