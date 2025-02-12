import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, Speciality } from 'src/app/demo/api/employee';
import { EmployeesService } from 'src/app/demo/service/employees.service';
import { PhotoService } from 'src/app/demo/service/photo.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-employee',
  templateUrl: './updateemployee.component.html',
  styleUrls: ['./updateemployee.component.scss'],
  providers: [MessageService],
})
export class UpdateEmployeeComponent implements OnInit {
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
  submitted: boolean = false;
  selectedFile: File | null = null;
  imageError: string | null = null;
  specialities: string[] = ['Mining', 'Processing', 'Transport', 'QualityControl', 'Maintenance'];

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private photoService: PhotoService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const employeeId = +params['id'];
      if (employeeId) {
        this.loadEmployee(employeeId);
      }
    });
  }

  loadEmployee(id: number) {
    this.employeesService.getEmp(id).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => {
        console.error('Error fetching employee:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Employee not found.', life: 3000 });
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      if (fileExtension === 'jpg') {
        this.employee.photo = fileName;
        this.imageError = null;
      } else {
        this.imageError = 'Please upload only .jpg images.';
        this.selectedFile = null;
        this.employee.photo = '';
      }
    } else {
      this.imageError = 'Please select a valid image file.';
      this.selectedFile = null;
    }
  }

  saveEditEmployee() {
    this.submitted = true;
    if (this.employee.email && this.employee.first_name && this.employee.last_name) {
      this.employeesService.updateEmployee(this.employee).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 });
          setTimeout(() => this.navigateToEmployeesTable(), 1500);
        },
        (error) => {
          console.error('Error updating employee:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating employee', life: 3000 });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields', life: 3000 });
    }
  }

  reset() {
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
    this.selectedFile = null;
    this.imageError = null;
    this.submitted = false;
  }

  navigateToEmployeesTable() {
    this.router.navigate(['/pages/employee']);
  }

  navigateToCertification() {
    this.router.navigate(['/certifications'], { queryParams: { employeeId: this.employee.id } });
  }
}
