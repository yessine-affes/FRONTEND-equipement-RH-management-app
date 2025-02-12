import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskAssignmentService } from 'src/app/demo/service/task-assignments.service';
import { MessageService } from 'primeng/api';
import { TaskAssignment } from 'src/app/demo/api/task-assignment';
import { EmployeesService } from 'src/app/demo/service/employees.service';
import { EquipService } from 'src/app/demo/service/equipements.service';

interface SelectItem {
  id: number;
  name: string;
}

@Component({
  selector: 'app-update-task-assignments',
  templateUrl: './update-task-assignments.component.html',
  styleUrls: ['./update-task-assignments.component.scss'],
  providers: [MessageService],
})
export class UpdateTaskAssignmentsComponent implements OnInit {
  taskId: number;
  assignments: TaskAssignment[] = [];
  isLoading: boolean = false;

  showEditDialog: boolean = false;
  editedAssignment: Partial<TaskAssignment> = {};

  showAddDialog: boolean = false;
  newAssignment: Partial<TaskAssignment> = {};

  employees: SelectItem[] = [];
  equipments: SelectItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private assignmentService: TaskAssignmentService,
    private messageService: MessageService,
    private employeeService: EmployeesService,
    private equipService: EquipService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.taskId = +params['id'];
      if (this.taskId) {
        this.loadAssignments();
      }
    });
    this.loadEmployees();
    this.loadEquipment();
  }

  loadAssignments(): void {
    this.isLoading = true;
    this.assignmentService.getAssignmentsByTask(this.taskId).subscribe(
      (data) => {
        this.isLoading = false;
        this.assignments = Object.values(data) as any[];
        console.log(this.assignments)
      },
      () => {
        this.isLoading = false;
        if(this.assignments.length==0){
          this.messageService.add({ severity: 'error', summary: 'Message', detail: 'No assignments.' });
        }
        else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load assignments.' });}
      }
    );
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

  startAddAssignment(): void {
    // Default values, including a default status
    this.newAssignment = {
      project_id: 1,
      task_id: this.taskId,
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
    setTimeout(() => this.showAddDialog = false);
 
    this.newAssignment = {};
  }

  addAssignment(newAssignment: Partial<TaskAssignment>): void {
    this.assignmentService.createTaskAssignment(newAssignment as TaskAssignment).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Assignment added.' });
        this.loadAssignments();
      },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add assignment.' });
      }
    );
  }

  editAssignment(id: number): void {
    const assignmentToEdit = this.assignments.find((a) => a.id === id);
    if (assignmentToEdit) {
      this.editedAssignment = { ...assignmentToEdit };
      this.showEditDialog = true;
    }
  }

  saveChanges(): void {
    if (!this.editedAssignment.id) return;

    this.assignmentService.updateTaskAssignment(this.editedAssignment.id, this.editedAssignment as TaskAssignment).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Assignment updated.' });
        this.showEditDialog = false;
        this.loadAssignments();
      },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update assignment.' });
      }
    );
  }

  deleteAssignment(id: number): void {
    this.assignmentService.deleteTaskAssignment(id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Assignment deleted.' });
        this.loadAssignments();
      },
      () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete assignment.' });
      }
    );
  }

  cancelEdit(): void {
    this.showEditDialog = false;
    this.editedAssignment = {};
  }

  cancelAdd(): void {
    this.showAddDialog = false;
    this.newAssignment = {};
  }
}
