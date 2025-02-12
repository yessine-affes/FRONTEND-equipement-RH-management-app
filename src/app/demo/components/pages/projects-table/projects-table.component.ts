import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { catchError, forkJoin, of, switchMap } from 'rxjs';
import { Product } from 'src/app/demo/api/product';
import { Project } from 'src/app/demo/api/project';
import { ProductService } from 'src/app/demo/service/product.service';
import { ProjectService } from 'src/app/demo/service/projects.service';
import { TaskAssignmentService } from 'src/app/demo/service/task-assignments.service';
import { TaskService } from 'src/app/demo/service/task.service';
@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
  providers: [MessageService]
})
export class ProjectsTableComponent implements OnInit {

  projects :any=[];
  sortOptions: SelectItem[] = []; 

  sortOrder: number = 0;

  sortField: string = '';

  
  orderCities: any[] = [];
  deleteProjectDialog: boolean = false;
  project: any;

  constructor( private productService: ProductService, private projectService: ProjectService , private messageService: MessageService,private router :Router,private taskService:TaskService,private taskAssignmentService:TaskAssignmentService) { }
  loadProjects() {
    this.projectService.getProjects()
      .pipe(
        catchError(error => {
          console.error('Error fetching employees:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching employees', life: 3000 });
          return of([] as Project[]);
        })
      )
      .subscribe(data => {
        this.projects = data;
      });
  }
  ngOnInit() {
      
       this.loadProjects();
      
       this.sortOptions = [
          { label: 'Price High to Low', value: '!price' },
          { label: 'Price Low to High', value: 'price' }
      ]; 
  }

  onSortChange(event: any) {
      const value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      } else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }

  

  onFilter(dv: DataView, event: Event) {
    const query = (event.target as HTMLInputElement).value.trim().toLowerCase();
    dv.filter(query);
}
 
 




// Handle delete action
openDeleteDialog(project: any) {
    this.project = project;
    this.deleteProjectDialog = true;
}
/* 
 confirmDeleteProject() {
    this.projectService.deleteProject(this.project.id).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project Deleted', life: 3000 });
        this.loadProjects(); // Refresh the project list
        this.deleteProjectDialog = false; // Close the dialog
      },
      error => {
        console.error('Error deleting project:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting project', life: 3000 });
      }
    );
}  */
    confirmDeleteProject() {
      // Step 1: Fetch tasks associated with the project
      this.taskService.getTasksByProject(this.project.id).pipe(
        switchMap((tasks) => {
          if (tasks.length > 0) {
            // Delete all tasks
            return forkJoin(tasks.map(task => this.taskService.deleteTask(task.id)));
          }
          return of(null); // No tasks to delete
        }),
        switchMap(() => {
          // Step 2: Fetch assignments associated with the project
          return this.taskAssignmentService.getAssignmentsByProject(this.project.id);
        }),
        switchMap((assignments) => {
          if (assignments.length > 0) {
            // Delete all assignments
            return forkJoin(assignments.map(assignment => this.taskAssignmentService.deleteTaskAssignment(assignment.id)));
          }
          return of(null); // No assignments to delete
        }),
        switchMap(() => {
          // Step 3: Delete the project
          return this.projectService.deleteProject(this.project.id);
        })
      ).subscribe(
        () => {
          // Success: Provide user feedback and refresh the project list
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Project and related data deleted', life: 3000 });
          this.loadProjects(); // Refresh the project list
          this.deleteProjectDialog = false; // Close the dialog
        },
        (error) => {
          // Error handling
          console.error('Error deleting project and related data:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting project or related data', life: 3000 });
        }
      );
    }
    
    
   /*  confirmDeleteProject() {
      // Fetch tasks related to the project
      this.taskService.getTasksByProject(this.project.id).subscribe({
        next: (tasks) => {
          // Delete all tasks for the project
          const deleteTaskObservables = tasks.map((task) =>
            this.taskService.deleteTask(task.id)
          );
    
          // Wait for all task deletions to complete
          forkJoin(deleteTaskObservables).subscribe({
            next: () => {
              // Once tasks are deleted, delete the project
              this.projectService.deleteProject(this.project.id).subscribe({
                next: () => {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Project and its tasks deleted successfully',
                    life: 3000,
                  });
                  this.loadProjects(); // Refresh the project list
                  this.deleteProjectDialog = false; // Close the dialog
                },
                error: (error) => {
                  console.error('Error deleting project:', error);
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error deleting project',
                    life: 3000,
                  });
                },
              });
            },
            error: (error) => {
              console.error('Error deleting tasks:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error deleting associated tasks',
                life: 3000,
              });
            },
          });
        },
        error: (error) => {
          console.error('Error fetching tasks for project:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error fetching tasks for project',
            life: 3000,
          });
        },
      });
    } */
    navigateToView(projectId: number): void {
    console.log('Navigating to Read Employee with ID:', projectId);
    this.router.navigate(['/pages/projects/readproject', projectId]);

  }  
 
  navigateToAddProject(): void {
    /* console.log(`Adding new project, related to project ID:`); */
    this.router.navigate(['/pages/projects/addproject']);
  }
  navigateToEditProject(projectId:number): void {
    console.log(`editing  project, related to project ID:${projectId}`); 
    this.router.navigate(['/pages/projects/updateproject',projectId]);
  }

  // Navigate to assignments page
  navigateToAssignments(projectId: number): void {
    /* this.router.navigate([`/assignments/${projectId}`]); */
  }
}
