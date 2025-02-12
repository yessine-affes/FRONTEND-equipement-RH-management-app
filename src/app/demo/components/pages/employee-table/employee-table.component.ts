import { Component, OnInit } from '@angular/core';
import { Employee, Speciality } from 'src/app/demo/api/employee'; // Assuming this is the correct path to your Employee model
import { MessageService } from 'primeng/api';
import { EmployeesService } from 'src/app/demo/service/employees.service'; // Assuming this is the correct path to your EmployeesService
import { PhotoService } from 'src/app/demo/service/photo.service'; // Import the PhotoService
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  providers: [MessageService]
})
export class EmployeeTableComponent implements OnInit {
  employeeDialog: boolean = false;
  employeeEditDialog: boolean = false;
  deleteEmployeeDialog: boolean = false; 
  deleteEmployeesDialog: boolean = false; 
  employees: Employee[] = [];
  employee: Employee = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    admin_id: 0,
    availability: 0,
    photo: '',
    speciality: Speciality.Mining,
    score: 0,
  };
  selectedEmployees: Employee[] = [];
  submitted: boolean = false;
  imageError: string | null = null; // For image error handling
  selectedFile: File | null = null; // For storing the selected file
  specialities: string[] = ['Mining', 'Processing', 'Transport', 'QualityControl', 'Maintenance'];

  constructor(
    private employeesService: EmployeesService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private photoService: PhotoService // Inject the PhotoService
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeesService.getEmployees()
      .pipe(
        catchError(error => {
          console.error('Error fetching employees:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching employees', life: 3000 });
          return of([] as Employee[]);
        })
      )
      .subscribe(data => {
        this.employees = data;
      });
  }

  openNew() {
    this.employee = {
      id: 0,
      first_name: '',
      last_name: '',
      email: '',
      admin_id: 0,
      availability: 0,
      photo: '',
      speciality: Speciality.Mining,
      score: 0,
    };
    this.submitted = false;
    this.employeeDialog = true;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      if (fileExtension === 'jpg') {
        this.selectedFile = file; // Store the selected file
        this.imageError = null; // Clear previous errors
      } else {
        this.imageError = 'Please upload only .jpg images.';
        this.selectedFile = null;
      }
    } else {
      this.imageError = 'Please select a valid image file.';
      this.selectedFile = null;
    }
  }
  readEmp(employee: Employee) {  // Change parameter to employeeId
    console.log('Navigating to Read Employee with ID:', employee.id);
    this.router.navigate(['/pages/employee/read-employee', employee.id])
    .catch(err => {
        console.error('Navigation error:', err);
    });

        
}
/* 
  saveEmployee() {
    this.submitted = true;

    if (this.employee.email && this.employee.first_name && this.employee.last_name) {
      const currentAdminId = this.authService.getCurrentUserId();
      if (currentAdminId) {
        this.employee.admin_id = currentAdminId;

        // If a file is selected, upload it and set the photo field to the filename
        if (this.selectedFile) {
          this.photoService.uploadImage(this.selectedFile).subscribe(
            response => {
              this.employee.photo = this.selectedFile!.name; // Assign filename to photo
              this.saveEmployeeData(); // Save employee data after successful upload
            },
            error => {
              console.error('Error uploading image:', error);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error uploading image', life: 3000 });
            }
          );
        } else {
          this.saveEmployeeData(); // Save employee data if no file is selected
        }
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Admin ID not found. Please log in again.', life: 3000 });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields', life: 3000 });
    }
  } */

 /*  saveEmployeeData() {
    this.employeesService.addEmployee(this.employee).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });
        this.loadEmployees();
        this.hideDialog();
      },
      error => {
        console.error('Error adding employee:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding employee', life: 3000 });
      }
    );
  } */

  deleteEmployee(employee: Employee) {
    this.deleteEmployeeDialog = true; // Open the delete confirmation dialog
    this.employee = { ...employee }; // Assign the selected employee to be deleted
  }

  confirmDelete() {
    this.employeesService.deleteEmployee(this.employee.id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });
        this.loadEmployees();
        this.deleteEmployeeDialog = false;
      },
      error => {
        console.error('Error deleting employee:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting employee', life: 3000 });
      }
    );
  }

  deleteSelectedEmployees() {
    this.deleteEmployeesDialog = true; // Open the delete confirmation dialog for multiple employees
  }

  confirmDeleteSelected() {
    const idsToDelete = this.selectedEmployees.map(employee => employee.id);
    Promise.all(idsToDelete.map(id => this.employeesService.deleteEmployee(id)))
      .then(() => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employees Deleted', life: 3000 });
        this.loadEmployees();
      })
      .catch(error => {
        console.error('Error deleting employees:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting employees', life: 3000 });
      })
      .finally(() => {
        this.deleteEmployeesDialog = false;
        this.selectedEmployees = [];
      });
  }

/*   editEmployee(employee: Employee) {
    this.employee = { ...employee };
    this.employeeEditDialog = true;
  } */
  editEmp(employee: Employee) {  
    console.log('Navigating to edit Employee with ID:', employee.id);
    this.router.navigate(['/pages/employee/updateemployee', employee.id])
    .catch(err => {
        console.error('Navigation error:', err);
    });
  
        
  }

  /* saveEditEmployee() {
    this.submitted = true;

    if (this.employee.email && this.employee.first_name && this.employee.last_name) {
      this.employeesService.updateEmployee(this.employee).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 });
          this.loadEmployees();
          this.hideDialog();
        },
        error => {
          console.error('Error updating employee:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating employee', life: 3000 });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields', life: 3000 });
    }
  } */
  viewCertifications(employee: Employee){
    
  }
  hideDialog() {
    this.employeeDialog = false;
    this.employeeEditDialog = false;
    this.submitted = false;
    this.selectedFile = null; // Reset the selected file
  }
  setFallbackImage(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/demo/images/users.jpg';
}

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  getEmployeeImageUrl(employee: Employee): string {
    return this.photoService.getImageUrl(employee.photo);
  }
  navigateToAddEmployee() {
    this.router.navigate(['/pages/employee/addemployee']);
  }
  addCertifEmployee(employee: Employee){
    this.router.navigate(['../../gererCertif',employee.id]);
  }
}
