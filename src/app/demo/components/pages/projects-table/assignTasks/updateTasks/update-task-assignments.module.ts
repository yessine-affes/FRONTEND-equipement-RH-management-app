import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Only FormsModule is needed for template-driven forms
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UpdateTaskAssignmentsComponent } from './update-task-assignments.component';
import { UpdateTaskAssignmentsRoutingModule } from './update-task-assignment-routing.module';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [UpdateTaskAssignmentsComponent], // Correct component
  imports: [
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
    UpdateTaskAssignmentsRoutingModule,
    TableModule, // <- Make sure this is included
    DialogModule // <-- Add to imports

  ],
})
export class UpdateTaskAssignmentsModule {}
