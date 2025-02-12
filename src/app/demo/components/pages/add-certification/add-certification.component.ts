import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificationService } from '../employee-table/certifications/certification.service';
import { Certification } from '../../../api/certification';

@Component({
  selector: 'app-add-certification',
  templateUrl: './add-certification.component.html',
  styleUrls: ['./add-certification.component.scss'],
})
export class AddCertificationComponent implements OnInit {
  employeeId!: number; // Employee ID from query parameter
  certification: Certification = {
    id: 0,
    name: '',
    issuer: '',
    issue_date: new Date(),
    expiry_date: new Date(),
    employee_id: 0,
    created_at: new Date(),
    updated_at: new Date(),
  };

  constructor(
    private certificationService: CertificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Get employee ID from query parameters
    this.route.queryParams.subscribe((params) => {
      this.employeeId = +params['employeeId'];
      this.certification.employee_id = this.employeeId; // Associate employee ID with the certification
    });
  }

  // Method to add a certification
  addCertification() {
    if (
      this.certification.name &&
      this.certification.issuer &&
      this.certification.issue_date &&
      this.certification.expiry_date
    ) {
      this.certificationService.addCertification(this.certification).subscribe(
        (data) => {
          console.log('Certification added:', data);
          this.router.navigate(['/employee-table']); // Navigate back to the employee table or previous page
        },
        (error) => {
          console.error('Error adding certification:', error);
        }
      );
    } else {
      console.error('Please fill all fields');
    }
  }
}
