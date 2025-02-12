import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { EmployeesService } from '../../../service/employees.service';
import { TaskAssignmentService } from '../../../service/task-assignments.service';
import { Employee } from '../../../api/employee';
import { TaskAssignment } from '../../../api/task-assignment';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform: scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class LoginComponent {

    // Properties
    valCheck: string[] = ['remember'];
    controlem: boolean = false;
    controlpass: boolean = false;
    password!: string;
    email!: string;
    msgs: Message[] = [];
    isEmployeeMode: boolean = false; // Toggle between login and employee views
    employeeEmail!: string; // Holds the employee email input
    tasksFetched: boolean = false; // Indicates if tasks are fetched
    tasks: TaskAssignment[] = []; // Holds the list of tasks
    taskDialogVisible: boolean = false; // Controls the task details dialog visibility
    selectedTask: TaskAssignment | null = null; // Stores the selected task details

    // Constructor
    constructor(
        public layoutService: LayoutService,
        private router: Router,
        private authService: AuthService,
        private employeesService: EmployeesService,
        private taskAssignmentService: TaskAssignmentService
    ) { }

    // Login form submission for users
    onSubmit() {
        if (!this.email && !this.password) {
            this.controlem = true;
            this.controlpass = true;
            this.showInfoViaMessages("Both email and password are required");
        } else if (!this.email) {
            this.controlem = true;
            this.showInfoViaMessages("Email is required");
        } else if (!this.password) {
            this.controlpass = true;
            this.showInfoViaMessages("Password is required");
        } else {
            this.authService.veriflogin(this.email, this.password).subscribe({
                next: (response) => {
                    console.log('Login successful:', response);
                    this.authService.setResponse(response);
                    this.router.navigate(['/dashboard']); // Redirect to dashboard
                },
                error: (err) => {
                    console.error('Login failed:', err);
                    this.controlpass = true;
                    this.controlem = true;
                    this.showInfoViaMessages("Invalid credentials. Please try again.");
                }
            });
        }
    }

    // Employee email submission
    onEmployeeSubmit() {
        if (!this.employeeEmail) {
            this.showInfoViaMessages("Employee email is required");
        } else {
            console.log("Fetching employee and tasks for:", this.employeeEmail);
    
            // Fetch employee by email
            this.employeesService.getEmployeeByEmail(this.employeeEmail).subscribe({
                next: (employee: Employee | undefined) => {
                    if (employee) {
                        console.log(`Employee found: ID=${employee.id}, Email=${employee.email}`);
    
                        // Fetch all tasks and filter locally
                        this.taskAssignmentService.getAllAssignments().subscribe({
                            next: (allTasks: TaskAssignment[]) => {
                                this.tasks = allTasks.filter(task => task.employee_id === employee.id);
                                this.tasksFetched = true;
                                console.log(`Filtered tasks for Employee ID=${employee.id}:`, this.tasks);
                            },
                            error: (err) => {
                                console.error('Error fetching all tasks:', err);
                                this.showInfoViaMessages('Error fetching tasks for the employee.');
                            }
                        });
                    } else {
                        this.showInfoViaMessages('No employee found with this email.');
                    }
                },
                error: (err) => {
                    console.error('Error fetching employee:', err);
                    this.showInfoViaMessages('Error fetching employee details.');
                }
            });
        }
    }
    
    


    // View details of a selected task
    viewTaskDetails(task: TaskAssignment) {
        this.selectedTask = task; // Set selected task
        this.taskDialogVisible = true; // Show dialog
    }

    // Close the task details dialog
    closeDialog() {
        this.taskDialogVisible = false; // Hide dialog
        this.selectedTask = null; // Clear selected task
    }

    // Toggle between login and employee view
    toggleEmployeeMode() {
        this.isEmployeeMode = !this.isEmployeeMode; // Switch modes
        this.tasksFetched = false; // Reset tasks
        this.tasks = []; // Clear tasks list
    }

    // Display error messages
    showInfoViaMessages(message: string) {
        this.msgs = []; // Clear previous messages
        this.msgs.push({ severity: 'error', summary: message }); // Add new message
    }
}
