import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/demo/api/project'; // Use the new interface
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/demo/service/projects.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './updateproject.component.html',
  styleUrls: ['./updateproject.component.scss'],
  providers: [MessageService],
})
export class UpdateProjectComponent implements OnInit {
  project: Project = {
    id: 0,
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    status: '',
  };

  submitted: boolean = false;
  statuses: { label: string; value: string }[] = []; // Project-specific statuses

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    // Load project details using ID from route
    this.route.params.subscribe((params) => {
      const projectId = +params['id'];
      if (projectId) {
        this.loadProject(projectId);
      }
    });

    // Initialize status dropdown options
    this.statuses = [
      { label: 'Pending', value: 'pending' },
      { label: 'ongoing', value: 'ongoing' },
      { label: 'Completed', value: 'completed' },
    ];
  }

  loadProject(id: number) {
    this.projectService.getProjectById(id).subscribe(
      (data) => {
        this.project = data;
      },
      (error) => {
        console.error('Error fetching project:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Project not found.',
          life: 3000,
        });
      }
    );
  }

  saveEditProject() {
    this.submitted = true;

    // Validate required fields
    if (this.project.title?.trim() && this.project.description?.trim() && this.project.status) {
      this.projectService.updateProject(this.project.id, this.project).subscribe(
        (updatedProject) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: `Project "${updatedProject.title}" updated successfully!`,
            life: 3000,
          });

          // Navigate back to projects table after success
          setTimeout(() => this.navigateToProjectsTable(), 1500);
        },
        (error) => {
          console.error('Error updating project:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Update Failed',
            detail: error.message || 'An error occurred while updating the project.',
            life: 3000,
          });
        }
      );
    } else {
      // Display validation error if required fields are missing
      this.messageService.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: 'Please fill all required fields (Title, Description, and Status).',
        life: 3000,
      });
    }
  }

  cancel() {
    this.router.navigate(['pages/projects']);
  }

  reset() {
    this.project = {
      id: 0,
      title: '',
      description: '',
      start_date: '',
      end_date: '',
      status: '',
    };
    this.submitted = false;
  }

  navigateToProjectsTable() {
    this.router.navigate(['/pages/projects']);
  }

  navigateToUpdateTasks() {
    this.router.navigate([`/update-tasks/${this.project.id}`]);
  }
}
