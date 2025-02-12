import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddProjectComponent } from './addproject.component'; // Correct path
import { AddProjectRoutingModule } from './addproject-routing.module';
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

@NgModule({
  declarations: [AddProjectComponent], // Declare the AddProjectComponent
  imports: [
    CommonModule,
    FormsModule, // Import FormsModule for template-driven forms
    ReactiveFormsModule, // Import ReactiveFormsModule for reactive forms
    RouterModule,
    AddProjectRoutingModule, // Import the routing module
    CardModule,
    ChipModule,
    ButtonModule,
    ToastModule,
    DialogModule,
    TableModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    InputNumberModule,
  ],
})
export class AddProjectModule {}
