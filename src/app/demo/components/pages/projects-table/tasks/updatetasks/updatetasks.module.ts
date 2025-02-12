import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Only FormsModule is needed for template-driven forms
import { RouterModule } from '@angular/router';
import { AddTasksComponent } from './updatetasks.component'; // Correct component name
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UpdateTasksRoutingModule } from './updatetasks-routing.module';

@NgModule({
  declarations: [AddTasksComponent], // Correct component
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
    UpdateTasksRoutingModule
  ],
})
export class AddTasksModule {}
