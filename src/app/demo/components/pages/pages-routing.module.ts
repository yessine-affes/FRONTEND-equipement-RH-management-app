import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpdateTaskAssignmentsComponent } from './projects-table/assignTasks/updateTasks/update-task-assignments.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'reclamations',
        loadChildren: () =>
          import('./reclamations-table/reclamations.module').then(
            (m) => m.ReclamationsModule
          ),
      },
      
      /* {
        path: 'tasks/:taskId/assignments',
        component: UpdateTaskAssignmentsComponent, // Ensure this component is correct
      },
       */
    
      {
        path: 'techniciens',
        loadChildren: () =>
          import('./techniciens-table/techniciens-table.module').then(
            (m) => m.TechniciensTableModule
          ),
      },
      {
        path: 'addRec',
        loadChildren: () =>
          import('./add-reclamation/addRec.module').then(
            (m) => m.EmptyDemoModule
          ),
      },
      {
        path: 'employee',
        loadChildren: () =>
          import('./employee-table/employee-table.module').then(
            (m) => m.EmployeeTableModule
          ),
      },
      {
        path: 'equipements',
        loadChildren: () =>
          import(
            './equipement-table/equipements-table/equipements-table.module'
          ).then((m) => m.EquipementsTableModule),
      },
      {
        path: 'employee/read-employee/:id',
        loadChildren: () =>
          import('./employee-table/profil/reademployee.module').then(
            (m) => m.ReadEmployeeModule
          ),
      },
      {
        path: 'employee/addemployee',
        loadChildren: () =>
          import('./employee-table/addemployee/addemployee.module').then(
            (m) => m.AddEmployeeModule
          ),
      },
      {
        path: 'employee/updateemployee/:id',
        loadChildren: () =>
          import('./employee-table/updateemployee/updateemployee.module').then(
            (m) => m.UpdateEmployeeModule
          ),
      },
      {
        path: 'equipements/read-equipements/:id',
        loadChildren: () =>
          import(
            './equipement-table/equipements-table/profil/readequipements.module'
          ).then((m) => m.ReadEquipementsModule),
      },
      /* {
        path: 'certifications',
        loadChildren: () =>
          import('./employee-table/certifications/certifications.module').then(
            (m) => m.CertificationsModule
          ), // Lazy-load Certifications Module
      }, */
      {
        path: 'equipements/edit-equipements/:id',
        loadChildren: () =>
          import(
            './equipement-table/equipements-table/update/editequipements.module'
          ).then((m) => m.EditEquipementsModule),
      },
      {
        path: 'equipements/add-equipements',
        loadChildren: () =>
          import(
            './equipement-table/equipements-table/addequipements/addequipements.module'
          ).then((m) => m.AddEquipementsModule),
      },
      
      {
        path: 'projects',
        loadChildren: () =>
          import('./projects-table/projects-table.module').then(
            (m) => m.ProjectsTableModule
          ),
      },
      {
        path: 'projects/readproject/:id',
        loadChildren: () =>
          import('./projects-table/profil/readproject.module').then(
            (m) => m.ReadProjectModule
          ),
      }, 
      {
        path: 'projects/addproject',
        loadChildren: () =>
          import('./projects-table/add/addproject.module').then(
            (m) => m.AddProjectModule
          ),
      },
      {
        path: 'projects/updateproject/:id',
        loadChildren: () =>
          import('./projects-table/updateproject/updateproject.module').then(
            (m) => m.UpdateProjectModule
          ),
      },
      {
        path: 'projects/addtasks/:id',
        loadChildren: () =>
          import('./projects-table/tasks/addtasks1/addtasks.module').then(
            (m) => m.AddTasksModule
          ),
      },
      
      
       {
        path: 'projects/readtasks/:id',
        loadChildren: () =>
          import('./projects-table/tasks/readtasks/readtasks.module').then(
            (m) => m.ReadTasksModule
          ),
      }, 
      {
        path: 'assignments/:id',
        loadChildren: () =>
          import('./projects-table/assignTasks/updateTasks/update-task-assignments.module').then(
            (m) => m.UpdateTaskAssignmentsModule
          ),
      },   
      {
        path: 'assignmentscreate/:id',
        loadChildren: () =>
          import('./projects-table/assignTasks/updateTasks/createTasksAssignment/createtasksassignments.module').then(
            (m) => m.CreateTasksAssignmentsModule
          ),
      },  

      { path: '**', redirectTo: '/notfound' }, // Fallback route
    ]),
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule {}