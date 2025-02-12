import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/demo/service/task.service';
import { MessageService } from 'primeng/api';
import { Task } from 'src/app/demo/api/task';

@Component({
  selector: 'app-updatetasks',
  templateUrl: './updatetasks.component.html',
  styleUrls: ['./updatetasks.component.scss'],
  providers: [MessageService],
})
export class UpdateTasksComponent implements OnInit {
  project_id: number;
  tasks: any[] = []; // List of tasks for the selected project
  selectedTask: any = null; // Task currently being edited
  statuses = [
    { label: 'Pending', value: 'pending' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Completed', value: 'completed' },
  ];
  isEditing: boolean = false; // Track if edit mode is active

  constructor(
    private router: Router,
    private taskService: TaskService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.project_id = +params['projectId']; // Match the parameter name in the route
      console.log('Project ID:', this.project_id); // Debug: log the project ID
      this.loadTasks();
    });
  }

  /**
   * Load tasks for the selected project.
   */
  loadTasks(): void {
    if (this.project_id) {
      this.taskService.getTasksByProjectId(this.project_id).subscribe(
        (data) => {
          this.tasks = Object.values(data) as Task[];
          console.log('Tasks:', this.tasks); // Debug: log the tasks
        },
        (error) => {
          console.error('Error loading tasks:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load tasks for the project.',
            life: 3000,
          });
        }
      );
    } else {
      console.error('Project ID is not defined.');
    }
  }

  /**
   * Enter edit mode for a task.
   */
  editTask(task: any): void {
    this.selectedTask = { ...task }; // Clone the task to avoid modifying the original
    this.isEditing = true; // Show the edit form and hide the table
  }

  /**
   * Save the edited task.
   */
  saveTask(): void {
    if (this.selectedTask) {
      console.log('Payload being sent:', this.selectedTask); // Debug: log the payload
      this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe(
        (response) => {
          console.log('Task updated successfully:', response);
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Task has been successfully updated.',
            life: 3000,
          });
          this.isEditing = false; // Exit edit mode
          this.loadTasks(); // Reload tasks to reflect changes
        },
        (error) => {
          console.error('Error updating task:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update task.',
            life: 3000,
          });
        }
      );
    }
  }

  /**
   * Cancel editing and return to the table.
   */
  cancelEdit(): void {
    this.selectedTask = null; // Clear the selected task
    this.isEditing = false; // Exit edit mode
  }

  /**
   * Navigate to assign tasks.
   */
  assignTask(taskId: number): void {
    this.router.navigate(['/pages/assignments', taskId]);
  }
}
