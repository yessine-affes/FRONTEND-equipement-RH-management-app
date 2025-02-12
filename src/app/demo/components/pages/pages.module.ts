import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { UpdateTasksComponent } from './projects-table/tasks/updatetasks/updatetasks.component';

// PrimeNG modules
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog'; // Ensure this is added
import { UpdateTaskAssignmentsComponent } from './projects-table/assignTasks/updateTasks/update-task-assignments.component';

@NgModule({
  declarations: [
    UpdateTasksComponent,


  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    ToastModule,
    DialogModule, // Required for p-dialog
  ],
  exports: [
    UpdateTasksComponent,
  ],
})
export class PagesModule {}
