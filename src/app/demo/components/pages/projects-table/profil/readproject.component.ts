import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/demo/service/projects.service';
import { CertificationService } from 'src/app/demo/service/certification.service'; // If projects have certifications
import { Project } from 'src/app/demo/api/project'; // Adjust based on your API
import { Certification } from 'src/app/demo/api/certification';
import { catchError, EMPTY, of, tap } from 'rxjs';

@Component({
  templateUrl: './readproject.component.html',
  styleUrls: ['./readproject.component.scss'],
  providers: [MessageService]
})
export class ReadProjectComponent implements OnInit {
  project: Project; // Store project data
  projectId: number; // ID of the project to load
  certifications: Certification[] = []; // Optional: if projects have certifications
  certificationAddDialog: boolean = false;
  certificationDeleteDialog: boolean = false;
  certificationEditDialog: boolean = false;
  selectedCertification: Certification;
  newCertification: any = {}; // New certification data
  editForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private certificationService: CertificationService, // Remove if not needed
    private route: ActivatedRoute,
    private messageService: MessageService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router :Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.projectId = +params['id']; // Convert string to number
      this.loadProject(this.projectId);
    });

    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
    });
  }

  // Load project data
  loadProject(projectId: number) {
    this.projectService.getProjectById(projectId)
      .pipe(
        catchError(error => {
          console.error('Error fetching project:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching project', life: 3000 });
          return of(null); // Return null or a default value
        })
      )
      .subscribe((data) => {
        if (data) {
          this.project = data;
          console.log('Project loaded:', this.project);
        }
      });
  }



  navigatetoTasks(){
     console.log('Navigating to Read tasks of project with ID:', this.projectId);
    this.router.navigate(['/pages/projects/readtasks', this.projectId]); 
  }

 
}
