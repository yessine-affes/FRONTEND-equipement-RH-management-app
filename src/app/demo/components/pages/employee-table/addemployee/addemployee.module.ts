import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './addemployee.component'; // Correct path
import { AddEmployeeRoutingModule } from './addemployee-routing.module';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';

@NgModule({
  declarations: [AddEmployeeComponent],  // Make sure the component is declared here
  imports: [
    DropdownModule,
    RadioButtonModule,
    CommonModule,
    FormsModule,  // Make sure FormsModule is imported
    AddEmployeeRoutingModule,
    CardModule,
    ChipModule,
    RouterModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    ReactiveFormsModule,
    TableModule,
    CalendarModule,
    InputTextModule,
    InputNumberModule,
  ],
})
export class AddEmployeeModule { }
