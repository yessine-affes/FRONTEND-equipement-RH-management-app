import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Only FormsModule is needed for template-driven forms
import { RouterModule } from '@angular/router';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CreateTasksAssignmentsRoutingModule } from './createtasksassignments-routing.module';
import { CreateTasksAssignmentsComponent } from './createtasksassignments.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [CreateTasksAssignmentsComponent], // Correct component
  imports: [
    TableModule,
    CommonModule,
    FormsModule, // Use FormsModule for template-driven forms
    RouterModule,
    CardModule,
    ButtonModule,
    ToastModule,
    CalendarModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    CreateTasksAssignmentsRoutingModule
  
  ],
})
export class CreateTasksAssignmentsModule {}
