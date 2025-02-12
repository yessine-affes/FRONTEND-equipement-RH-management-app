import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TaskService } from 'src/app/demo/service/task.service'; // New service for tasks
import { Task } from 'src/app/demo/api/task'; // Interface for Task entity
import { catchError, map, Observable, of } from 'rxjs';
import { ProjectService } from 'src/app/demo/service/projects.service';
import { Project } from 'src/app/demo/api/project';
import { TaskAssignmentService } from 'src/app/demo/service/task-assignments.service';
import { EmployeesService } from 'src/app/demo/service/employees.service';
import { Employee } from 'src/app/demo/api/employee';

@Component({
  templateUrl: './readtasks.component.html',
  styleUrls: ['./readtasks.component.scss'],
  providers: [MessageService]
})
export class ReadTasksComponent implements OnInit {
  projectId: number; // ID of the project to load tasks for
  tasks: Task[] = []; // Store tasks of the project
  taskLoading: boolean = false; // Show loading state for tasks
  projectName: string = '';  // Name of the project
  projects :any=[];
  taskAssignments = []; 
  showAssignations: boolean =false; 
  selectedTaskId: number = null; 
  taskVisibility = {}; // Track selected task
  employee: Employee = {
    
    
  };
  employeeFullName: string;
  constructor(
    private taskassignmentService: TaskAssignmentService,
    private taskService: TaskService, // New service // New service
    private route: ActivatedRoute,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private projectService: ProjectService,
    private employeesService: EmployeesService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = +params['id']; // Convert string to number
      this.loadTasks(this.projectId);
      this.loadProjects;
      this.getProjectNameById(this.projectId);
      
    });
  }
  toggleAssignments(taskId: number) {
    if (this.selectedTaskId === taskId) {
      // If the same task is clicked again, toggle visibility
      this.taskVisibility[taskId] = !this.taskVisibility[taskId];
    } else {
      // If a different task is clicked, fetch new assignments and show them
      this.selectedTaskId = taskId; // Set the new task as selected
      this.taskVisibility[taskId] = true; // Show the assignments for the selected task
      this.taskAssignments = []; // Clear any previously shown assignments

      // Fetch assignments for the selected task
      this.taskassignmentService.getAssignmentsByTask(taskId).subscribe(assignments => {
        this.taskAssignments = Object.values(assignments) as any[]; // Set the new task assignments
        console.log(this.taskAssignments); // Log assignments for debugging
      });
    }
  }

  // Load tasks for the project
  loadTasks(projectId: number) {
    this.taskLoading = true;
    this.taskService.getTasksByProjectId(projectId)
      .pipe(
        catchError(error => {
          console.error('Error fetching tasks:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching tasks', life: 3000 });
          return of([]); // Return an empty array on error
        })
      )
      .subscribe((data) => {
        this.tasks = Object.values(data) as Task[];
        this.taskLoading = false;
        console.log('Tasks loaded success:', this.tasks);
       console.log('Number of tasks:', this.tasks.length);

      });
  }
  loadProjects() {
    this.projectService.getProjects()
      .pipe(
        catchError(error => {
          console.error('Error fetching employees:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching employees', life: 3000 });
          return of([] as Project[]);
        })
      )
      .subscribe(data => {
        this.projects = data;
      });
  }
  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'ongoing':
        return 'ongoing';
      case 'completed':
        return 'completed';
      case 'pending':
        return 'pending';
      default:
        return '';
    }
  }
// Get the project name based on projectId
getProjectNameById(projectId: number) {
  const project = this.projects.find(p => p.id === projectId);
  if (project) {
    this.projectName = project.title; // Assuming `title` is the correct field name
    console.log(this.projectName);  // Debugging output to verify project name
  } else {
    console.log('Project not found');
  }
}

  // Navigate to task details (example functionality)
  navigatetoAssignments(taskId: number) {
    console.log('Navigating to task details with ID:', taskId);
    this.router.navigate(['/pages/tasks', taskId]);
  }
  toggleCertifications() {
    this.showAssignations = !this.showAssignations;
  }
  
}
