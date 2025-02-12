import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/demo/service/task.service';
import { MessageService} from 'primeng/api';
import { Task } from 'src/app/demo/api/task';
import { TaskAssignment } from 'src/app/demo/api/task-assignment';
import { TaskAssignmentService } from 'src/app/demo/service/task-assignments.service';
import { EquipService } from 'src/app/demo/service/equipements.service';
import { EmployeesService } from 'src/app/demo/service/employees.service';
interface SelectItem {
  id: number;
  name: string;
}
@Component({
  templateUrl: './createtasksassignments.component.html',
  styleUrls: ['./createtasksassignments.component.scss'],
  providers: [MessageService],
})
export class CreateTasksAssignmentsComponent implements OnInit {
  project_id: number;
  currentTask:number;
  newAssignment: Partial<TaskAssignment> = {};
  tasks: any[] = []; // List of tasks for the selected project
  selectedTask: any = null; // Task currently being edited
  employees: SelectItem[] = [];
  equipments: SelectItem[] = [];

  statuses = [
    { label: 'Pending', value: 'pending' },
    { label: 'Ongoing', value: 'ongoing' },
    { label: 'Completed', value: 'completed' },
  ];
  
  showAddDialog: boolean = false; 
  constructor(
    private router: Router,
    private taskService: TaskService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private assignmentService: TaskAssignmentService,
    private employeeService: EmployeesService,
    private equipService: EquipService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.project_id = +params['id']; // Match the parameter name in the route
      console.log('Project ID:', this.project_id); // Debug: log the project ID
      this.loadTasks();
    });
    this.loadEmployees();
    this.loadEquipment();
  }

  loadEmployees(): void {
    this.employeeService.getAvailableEmployees().subscribe((data) => {
      this.employees = data.map((e) => ({ id: e.id, name: e.first_name + ' ' + e.last_name }));
    });
  }

  loadEquipment(): void {
    this.equipService.getAvailableEquipment().subscribe((data) => {
      this.equipments = data.map((eq) => ({ id: eq.id, name: eq.name }));
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

  

//add assign 
  assignTask(taskId: number): void {
    this.currentTask=taskId;
    this.newAssignment = {
      project_id: this.project_id,
      task_id: this.currentTask,
      assigned_date: '',
      completion_date: '',
      status: 'in-progress' // Set default status internally, no input field
    };
    this.showAddDialog = true;

  }
  confirmAdd(): void {
    if (!this.newAssignment.employee_id || !this.newAssignment.equipment_id || !this.newAssignment.assigned_date) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields.' });
      return;
    }
    this.addAssignment(this.newAssignment);
    this.showAddDialog = false;
    this.newAssignment = {};
  }

  addAssignment(newAssignment: Partial<TaskAssignment>): void {
    this.assignmentService.createTaskAssignment(newAssignment as TaskAssignment).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Assignment added.' });
        this.loadEquipment();
        this.loadEmployees();
      },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add assignment.' });
      }
    );
  }
  cancelAdd(): void {
    this.showAddDialog = false;
    this.newAssignment = {};
  }
  addanothertask():void{
    confirm()
  }
}
