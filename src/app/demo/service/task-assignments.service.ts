import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { TaskAssignment } from '../api/task-assignment';


@Injectable({
  providedIn: 'root',
})
export class TaskAssignmentService {
  private apiUrl = 'http://127.0.0.1:8000/api/task-assignments'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Get all task assignments
  getAllAssignments(): Observable<TaskAssignment[]> {
    return this.http.get<TaskAssignment[]>(this.apiUrl);
  }
  // Fetch tasks assigned to a specific employee by their ID
  getTasksByEmployeeId(employeeId: number): Observable<TaskAssignment[]> {
    const url = `${this.apiUrl}?employee_id=${employeeId}`;
    return this.http.get<TaskAssignment[]>(url);
  }

  // Get task assignment by ID
  getAssignmentById(id: number): Observable<TaskAssignment> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<TaskAssignment>(url);
  }

  // Create a new task assignment
  createTaskAssignment(taskAssignment: TaskAssignment): Observable<TaskAssignment> {
    return this.http.post<TaskAssignment>(this.apiUrl, taskAssignment);
  }

  // Update an existing task assignment
  updateTaskAssignment(id: number, taskAssignment: TaskAssignment): Observable<TaskAssignment> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<TaskAssignment>(url, taskAssignment);
  }

  // Delete a task assignment
  deleteTaskAssignment(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  // Get task assignments by project ID
/*   getAssignmentsByProject(projectId: number): Observable<TaskAssignment[]> {
    const url = `${this.apiUrl}?project_id=${projectId}`;
    return this.http.get<TaskAssignment[]>(url);
  } */
    getAssignmentsByProject(projectId: number): Observable<TaskAssignment[]> {
      return this.http.get<TaskAssignment[]>(`${this.apiUrl}?project_id=${projectId}`).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            // If no assignments found, return an empty array
            return of([]);
          }
          return throwError(error); // Throw other errors
        })
      );
    }
  getAssignmentsByTask(taskId: number): Observable<TaskAssignment[]> {
    const url = `${this.apiUrl}?task_id=${taskId}`;
    return this.http.get<TaskAssignment[]>(url);
  }
}
