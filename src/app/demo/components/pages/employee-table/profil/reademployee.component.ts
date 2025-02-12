import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../../../../service/employees.service'; // Import the employee service
import { Employee } from 'src/app/demo/api/employee'; // Ensure correct import for Employee model
import { MessageService } from 'primeng/api';
import { Certification } from 'src/app/demo/api/certification'; // Adjust based on your API
import { catchError, EMPTY, of, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CertificationService } from 'src/app/demo/service/certification.service';

@Component({
  templateUrl: './reademployee.component.html',
  styleUrls: ['./reademployee.component.scss'],
  providers: [MessageService]
})
export class ReadEmployeeComponent implements OnInit {
  certificationAddDialog: boolean = false;
  newCertification: any = {}; // Store new certification data
  certificationDeleteDialog: boolean = false;
  selectedCertification: Certification; // Store the certification to be deleted
  certificationEditDialog: boolean = false;
  certification: Certification;
  employee: Employee; // Use Employee model
  displayEditDialog: boolean = false;
  editField: string;
  editForm: FormGroup;
  certifications: Certification[] = [];
  certificationId: number;
  imageError: string | null = null;
  imageName: string | null = null;
  employeeId: number;
  showCertifications = false;
  loadCertifications: any;
  deleteCertificationDialog: boolean;
  constructor(private employeesService: EmployeesService,private cdr: ChangeDetectorRef, private certificationService: CertificationService, private route: ActivatedRoute, private messageService: MessageService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.employeeId = +params['id']; // Convert string to number
    });
    this.loadEmp(this.employeeId); // Load employee data on initialization
    this.editForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      speciality: ['', Validators.required] // Include other fields as necessary
    });
  }
  loadCertifs(employeeId: number){
    this.certificationService.getempCertification(employeeId)
    .pipe(
      catchError(error => {
        console.error('Error fetching certification:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error fetching certification',
          life: 3000
        });
        return of(null);  // Return null or a default value as appropriate
      })
    )
    .subscribe(data => {
      if (data) {  // Check if data is not null

        this.certifications =  Object.values(data) as Certification[];
        console.log(this.certifications);
      }
    });
  }
  loadEmp(employeeId: number) {  // Change parameter to employeeId

    this.employeesService.getEmp(employeeId)
      .pipe(
        catchError(error => {
          console.error('Error fetching employee:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching employee', life: 3000 });
          return of(null);  // Return null or a default value as appropriate
        })
      )
      .subscribe(data => {
        if (data) {  // Check if data is not null
          console.log(data);
          this.employee = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            admin_id: data.admin_id,
            availability: data.availability,
            photo: data.photo,
            speciality: data.speciality,  // Assuming speciality is available in data
            score: data.score,
          };
        }
      });

    this.loadCertifs(employeeId);
  }

  toggleCertifications() {
    this.showCertifications = !this.showCertifications;
  }

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
     // Set the employee_id for the new certification
    this.newCertification.employee_id = this.employeeId;
  
    // Format the issue_date and expiry_date to 'YYYY-MM-DD'
    this.newCertification.issued_date = this.formatDate(this.newCertification.issued_date);
    this.newCertification.expiry_date = this.formatDate(this.newCertification.expiry_date);
  
    // Call the service to add the certification
    this.certificationService.addCertification(this.newCertification).subscribe({
      next: (certification) => {
        this.certificationAddDialog = false; // Close the dialog
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Certification added successfully', life: 3000 });
        this.loadCertifs(this.employeeId);
        
        this.newCertification = {};
  
        // Use detectChanges to immediately reflect changes in the UI
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error adding certification:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add certification', life: 3000 });
      }
    }); 
  }
  private formatDate(date: Date): string {
    if (!date) return null; // Return null if date is invalid
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2); // Months are 0-based
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  
  

//------delete
openDeleteCertificationDialog(certification: any) {
  this.certification = { ...certification }; // Set the certification to be deleted
  this.certificationDeleteDialog = true; // Show the dialog
}
hideCertificationDeleteDialog() {
  this.certificationDeleteDialog = false; // Close the dialog
}
confirmDeleteCertification() {
  this.certificationService.deleteCertification(this.certification.id).pipe(
    tap(() => {
        this.certificationDeleteDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Certification Deleted', life: 3000 });
       this.loadCertifs(this.employeeId);
       
    }),
    catchError(error => {
        console.error('Error deleting certification:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting certification', life: 3000 });
        return EMPTY;
    })
).subscribe();
  
}
//---edit


openEditCertificationDialog(certification: any) {
  this.selectedCertification = { ...certification }; // Copy selected certification data
  this.certificationEditDialog = true; // Show the dialog
}


hideCertificationEditDialog() {
  this.certificationEditDialog = false; // Close the dialog
}


updateCertification() {
  // Create a new object with the updated data
  const updatedCertification: Certification = {
    ...this.selectedCertification,
    issued_date: new Date(this.formatDate(this.selectedCertification.issued_date)), // Ensure it's a Date object
    expiry_date: new Date(this.formatDate(this.selectedCertification.expiry_date)), // Ensure it's a Date object
    employee_id:this.employeeId
  };

  // Call the service to update the certification
  this.certificationService.updateCertification(updatedCertification).subscribe({
    next: (response) => {
      this.hideCertificationEditDialog();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Certification updated successfully', life: 3000 });
      this.loadCertifs(this.employeeId); // Reload certifications after updating
    // Close the dialog
    },
    error: (error) => {
      console.error('Error updating certification:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update certification', life: 3000 });
    }
  });
}
/* formatDate2(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
} */






  edit(field: string) {
    this.editField = field;
    this.displayEditDialog = true;
    this.editForm.patchValue({
      first_name: this.employee.first_name,
      last_name: this.employee.last_name,
      email: this.employee.email,
      speciality: this.employee.speciality
    });
  }

  cancelEdit() {
    this.displayEditDialog = false;
  }

  saveEdit() {
   
    this.employee.first_name = this.editForm.value.first_name;
    this.employee.last_name = this.editForm.value.last_name;
    this.employee.email = this.editForm.value.email;
    this.employee.speciality = this.editForm.value.speciality; // Assuming you have this field

    this.displayEditDialog = false;
    
  }

  /* save() {
    this.updatedEmployee = {
      first_name: this.employee.first_name,
      last_name: this.employee.last_name,
      email: this.employee.email,
      speciality: this.employee.speciality // Ensure this matches your API
    };

    if (this.updatedEmployee) {
      this.employeeService.updateEmployeeProfile(this.updatedEmployee).subscribe( // Call update on employeeService
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee profile updated successfully.' });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update employee profile.' });
        }
      );
    }
  } */
}
