import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/demo/service/task.service'; // Adjust the import path
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-addtasks',
  templateUrl: './addtasks.component.html',
  styleUrls: ['./addtasks.component.scss'],
  providers: [MessageService],
})
export class AddTasksComponent {
  taskIndex = 0;
  project_id: number;
 
  statuses = [
    { label: 'Pending', value: 'pending' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Completed', value: 'completed' },
  ];
  isassign: boolean=false;


  constructor(
    private router: Router,
    private taskService: TaskService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.project_id = +params['id'];
      console.log(this.project_id ); // Convert string to number
    });}
    
    tasks = Array.from({ length: 5 }, (_, i) => ({
      description: '',
      start_date: '',
      end_date: '',
      status: '',
      due_date: '', 
      /* project_id: this.project_id, */
    }));
  
  saveTask(): void {
    console.log(this.project_id ); 
    const currentTask = {...this.tasks[this.taskIndex],project_id:this.project_id};
  console.log(currentTask)
    // Ensure required fields are filled out
    if (
      currentTask.description &&
      currentTask.start_date &&
      currentTask.end_date &&
      currentTask.status &&
      currentTask.due_date
    ) {
      // Call the taskService to save the current task
      this.taskService.createTask(currentTask).subscribe(
        (response) => {
          console.log(`Task ${this.taskIndex + 1} saved:`, response);

          this.messageService.add({
            severity: 'success',
            summary: 'Task Saved',
            detail: `Task ${this.taskIndex + 1} has been successfully saved.`,
            life: 3000,
          });

          if (this.taskIndex < 4) {
            // Proceed to the next task
            this.taskIndex++;
          } else {
            // All tasks are saved, navigate to projects
            console.log('All tasks saved:', this.tasks);
            if(!this.isassign){
            this.router.navigate(['/pages/projects']);
            }
          }
        },
        (error) => {
          console.error('Error saving task:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to save task. Please try again.',
            life: 3000,
          });
        }
      );
    } else {
      this.messageService.add({
        severity: 'warn',
        summary: 'Incomplete Task',
        detail: 'Please fill all required fields for the current task.',
        life: 3000,
      });
    }
  }

  cancel(): void {
    if (confirm('Are you sure you want to cancel? Unsaved data will be lost.')) {
      this.router.navigate(['/pages/projects']);
    }
  }
  
  navigateToAddAssignements(){
    this.isassign=true;
    this.saveTask();
    this.router.navigate(['/pages/assignmentscreate',this.project_id]);
  }
}
