import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../api/employee';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../demo/components/auth/auth.service'; // Assuming you have an AuthService to get the admin_id

@Injectable()
export class EmployeesService {
    private apiUrl = 'http://127.0.0.1:8000/api/employees'; // Replace with your API URL

    constructor(private http: HttpClient, private authService: AuthService) {}
    // Add a method to fetch an employee by email
    getEmployeeByEmail(email: string): Observable<Employee | undefined> {
        return this.http.get<Employee[]>(this.apiUrl).pipe(
            map(employees => employees.find(emp => emp.email === email))
        );
    }

    // Fetch all employees
    getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(this.apiUrl);
    }
    getAvailableEmployees(): Observable<Employee[]> {
        const url = `${this.apiUrl}?availability=1`; // Adjust if your API supports such queries
        return this.http.get<Employee[]>(url);
    }
    updateEmployeeAvailability(employeeId: number, availability: number): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${employeeId}`, { availability });
      }
      
    
    getEmp(employeeId:number): Observable<Employee> { 
      console.log("Fetching employee");
      return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`); 
    }
  
    // Add a new employee
    addEmployee(employee: Employee): Observable<Employee> {
        console.log("Employee to add:", employee);
        const currentAdminId = this.authService.getCurrentUserId(); // Get the current admin ID
        employee.admin_id = currentAdminId; // Automatically assign admin_id

        return this.http.post<Employee>(this.apiUrl, employee);
    }

    // Update an existing employee
    updateEmployee(employee: Employee): Observable<Employee> {
        const url = `${this.apiUrl}/${employee.id}`; // Assuming the API endpoint for updating an employee requires the employee ID in the URL
        return this.http.put<Employee>(url, employee);
    }

    // Delete an employee by ID
    deleteEmployee(employeeId: number): Observable<any> {
        const url = `${this.apiUrl}/${employeeId}`; // Assuming the API endpoint for deleting an employee requires the employee ID in the URL
        return this.http.delete<any>(url);
    }
    getEmailEmployeeById(id: number): Observable<string | undefined> {
        return this.getEmployees().pipe(
          map(employees => {
            const employee = employees.find(t => t.id === id);
            return employee ? employee.email : undefined;
          })
        );
      }



      getTop5Employees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${this.apiUrl}`).pipe(
            map((employees) =>
                employees
                    .sort((a, b) => b.score - a.score) // Sort by score (highest first)
                    .slice(0, 5) // Take top 5
            )
        );
    }

    // Derive total number of employees
    getTotalEmployees(): Observable<number> {
        return this.http.get<Employee[]>(`${this.apiUrl}`).pipe(
            map((employees) => employees.length)
        );
    }

    // Derive employees added this year
    getEmployeesAddedThisYear(): Observable<number> {
        const currentYear = new Date().getFullYear();
        return this.http.get<Employee[]>(`${this.apiUrl}`).pipe(
            map((employees) =>
                employees.filter(
                    (emp) => new Date(emp.created_at).getFullYear() === currentYear
                ).length
            )
        );
    }
}
