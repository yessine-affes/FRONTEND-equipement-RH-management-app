import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Task } from '../api/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://127.0.0.1:8000/api/tasks'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  /**
   * Get all tasks.
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Get a task by ID.
   */
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  getTasksByProjectId(projectId: number) {
    
    return this.http.get<Task[]>(`${this.apiUrl}?project_id=${projectId}`);

}

  /**
   * Create a new task.
   */
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Update a task by ID.
   */
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Delete a task by ID.
   */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Get tasks associated with a specific project.
   */
 /*  getTasksByProject(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}?project_id=${projectId}`).pipe(
      catchError((error) => this.handleError(error))
    );
  } */
    getTasksByProject(projectId: number): Observable<Task[]> {
      return this.http.get<Task[]>(`${this.apiUrl}?project_id=${projectId}`).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            // If no tasks found, return an empty array
            return of([]);
          }
          return throwError(error); // Throw other errors
        })
      );
    }
  /**
   * Get assignments associated with a specific task.
   */
  getTaskAssignments(taskId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${taskId}/assignments`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  /**
   * Handle HTTP errors.
   */
  private handleError(error: any): Observable<never> {
    console.error('TaskService Error:', error);
    return throwError(() => new Error('An error occurred in TaskService.'));
  }
}
