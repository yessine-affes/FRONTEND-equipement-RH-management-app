import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/demo/api/project'; // Adjust the path if needed
import { MessageService } from 'primeng/api';
import { ProjectService } from 'src/app/demo/service/projects.service'; // Adjust the path if needed
import { AuthService } from '../../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.scss'],
  providers: [MessageService],
})
export class AddProjectComponent implements OnInit {
  project: Project = {
    id: 0,
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    status: '',
  };
  submitted: boolean = false;
  statuses: string[] = ['pending', 'ongoing', 'completed'];

  constructor(
    private projectService: ProjectService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  saveAndNavigateToAddTasks(): void {
    this.submitted = true;

    if (
      this.project.title &&
      this.project.description &&
      this.project.start_date &&
      this.project.end_date &&
      this.project.status
    ) {
      const currentAdminId = this.authService.getCurrentUserId();
      if (currentAdminId) {
        this.projectService.createProject(this.project).subscribe(
          (createdProject) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Project Created',
              life: 3000,
            });
            // Navigate to add tasks with the project ID
            console.log(" createdProject.id: ", createdProject.id);
            this.router.navigate(['/pages/projects/addtasks', createdProject.id]);
          },
          (error) => {
            console.error('Error adding project:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error adding project',
              life: 3000,
            });
          }
        );
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields',
        life: 3000,
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/pages/projects']);
  }
}
