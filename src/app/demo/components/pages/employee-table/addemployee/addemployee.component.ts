import { Component, OnInit } from '@angular/core';
import { Employee, Speciality } from 'src/app/demo/api/employee'; // Assuming the correct path to your Employee model
import { MessageService } from 'primeng/api';
import { EmployeesService } from 'src/app/demo/service/employees.service'; // Assuming correct path to your EmployeesService
import { PhotoService } from 'src/app/demo/service/photo.service'; // Assuming correct path to your PhotoService
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { Certification } from 'src/app/demo/api/certification';
import { CertificationService } from '../certifications/certification.service';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.scss'],
  providers: [MessageService]
})
export class AddEmployeeComponent implements OnInit {
  employeeDialog: boolean = false;
  employeeEditDialog: boolean = false;
  deleteEmployeeDialog: boolean = false; 
  deleteEmployeesDialog: boolean = false; 
  employees: Employee[] = [];
  employee: Employee = {
    
    
  };
  selectedEmployees: Employee[] = [];
  submitted: boolean = false;
  imageError: string | null = null; // For image error handling
  selectedFile: File | null = null; // For storing the selected file
  specialities: string[] = ['Mining', 'Processing', 'Transport', 'QualityControl', 'Maintenance'];

  certificationAddDialog: boolean = false;
  newCertification: any = {}; // Store new certification data
  certificationDeleteDialog: boolean = false;
  selectedCertification: Certification; // Store the certification to be deleted
  certificationEditDialog: boolean = false;
  certification: Certification;
  certifications: Certification[] = [];
  certificationId: number;
  showCertifications = false;
  loadCertifications: any;
  deleteCertificationDialog: boolean;
  constructor(
    private employeesService: EmployeesService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
    private certificationService: CertificationService,
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

// Log employee ID for debugging
console.log('Navigating to Read Employee with ID:', employee.id);

// Navigate to the read employee page
this.router.navigate(['/pages/employee/read-employee', employee.id])
    .catch(err => {
        console.error('Navigation error:', err);
    });

        
}
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
  }

  saveEmployeeData() {
    this.employeesService.addEmployee(this.employee).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });
        this.loadEmployees();
        setTimeout(() => {
          this.loadEmployees();
          this.navigateToEmployeesTable();
        }, 1500); // Match the message display duratio
      },
      error => {
        console.error('Error adding employee:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding employee', life: 3000 });
      }
    );
  }

  deleteEmployee(employee: Employee) {
    this.deleteEmployeeDialog = true; // Open the delete confirmation dialog
    this.employee = { ...employee }; // Assign the selected employee to be deleted
  }



  
  cancel() {
    this.router.navigate(['/pages/employee']); // Navigate back to employee table without saving
  }

 

  navigateToEmployeesTable() {
    this.router.navigate(['/pages/employee']);
  }
  navigateToAddEmployee() {
    this.router.navigate(['/pages/employee/addemployee']);
  }
//partie add certif :
//dialogs code :
//----add
openAddCertificationDialog() {
  this.newCertification = {}; // Reset new certification data
  this.certificationAddDialog = true; // Show the dialog
}
hideCertificationAddDialog() {
  this.certificationAddDialog = false; // Close the dialog
}
addCertification() {
  if (this.employee.id){
   // Set the employee_id for the new certification
  this.newCertification.employee_id = this.employee.id;
  console.log(this.employee.id);
  // Format the issue_date and expiry_date to 'YYYY-MM-DD'
  this.newCertification.issued_date = this.formatDate(this.newCertification.issued_date);
  this.newCertification.expiry_date = this.formatDate(this.newCertification.expiry_date);

  // Call the service to add the certification
  this.certificationService.addCertification(this.newCertification).subscribe({
    next: (certification) => {
      this.certificationAddDialog = false; // Close the dialog
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Certification added successfully', life: 3000 });
      this.newCertification = {};


    },
    error: (error) => {
      console.error('Error adding certification:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add certification', life: 3000 });
    }
  }); }
  else{
    this.certificationAddDialog = false; 
    console.error('Error adding certification:');
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add certification add employee first', life: 3000 });
  }
}
private formatDate(date: Date): string {
  if (!date) return null; // Return null if date is invalid
  const d = new Date(date);
  const year = d.getFullYear();
  const month = ('0' + (d.getMonth() + 1)).slice(-2); // Months are 0-based
  const day = ('0' + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

}
