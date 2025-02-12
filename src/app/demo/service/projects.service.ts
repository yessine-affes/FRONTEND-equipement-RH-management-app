import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../api/project';
import { map, Observable } from 'rxjs';

@Injectable()
export class ProjectService {
    private apiUrl = 'http://127.0.0.1:8000/api/projects';

    constructor(private http: HttpClient) { }

    // Get all projects
    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.apiUrl);
    }

    // Get a single project by ID
    getProjectById(id: number): Observable<Project> {
        return this.http.get<Project>(`${this.apiUrl}/${id}`);
    }

    // Create a new project
    createProject(project: Project): Observable<Project> {
        return this.http.post<Project>(this.apiUrl, project);
    }

    // Update an existing project
    updateProject(id: number, project: Project): Observable<Project> {
        return this.http.put<Project>(`${this.apiUrl}/${id}`, project);
    }

    // Delete a project
    deleteProject(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Search for projects by a specific field (e.g., name or status)
    searchProjects(query: string): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.apiUrl}?search=${query}`);
    }




    getTotalProjects(): Observable<number> {
        return this.http.get<Project[]>(`${this.apiUrl}`).pipe(
            map((projects) => projects.length)
        );
    }

    // Count projects in progress
    getProjectsInProgressCount(): Observable<number> {
        return this.http.get<Project[]>(`${this.apiUrl}`).pipe(
            map((projects) =>
                projects.filter((project) => project.status === 'active').length
            )
        );
    }

    // List projects in progress
    getProjectsInProgress(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.apiUrl}`).pipe(
            map((projects) => projects.filter((project) => project.status === 'ongoing'))
        );
    }

    // Count projects started in the last six months
   /* getProjectsStartedLastSixMonths(): Observable<{ month: string; count: number }[]> {
        return this.http.get<Project[]>(`${this.apiUrl}`).pipe(
            map((projects) => {
                const currentMonth = new Date().getMonth();
                const counts = Array(6).fill(0); // Initialize counts for last 6 months
                const monthLabels = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                ];
                projects.forEach((project) => {
                    const startDate = new Date(project.start_date);
                    const diffMonths =
                        currentMonth - startDate.getMonth() + (12 * (new Date().getFullYear() - startDate.getFullYear()));
                    if (diffMonths >= 0 && diffMonths < 6) {
                        counts[5 - diffMonths]++;
                    }
                });
                return counts.map((count, index) => ({
                    month: monthLabels[(currentMonth - index + 12) % 12],
                    count,
                }));
            })
        );
    }*/
        getProjectsStartedLastSixMonths(): Observable<{ month: string, count: number }[]> {
            return this.http.get<Project[]>(this.apiUrl).pipe(
                map((projects: Project[]) => {
                    const now = new Date(); // Current date
                    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1); // Start of the month 6 months ago
                    const counts = Array(6).fill(0); // Initialize counts for each month
                    const monthNames: string[] = [];
        
                    // Generate month names
                    for (let i = 5; i >= 0; i--) {
                        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
                        monthNames.push(date.toLocaleString('fr-FR', { month: 'long' }));
                    }
        
                    console.log("Now:", now);
                    console.log("Six months ago:", sixMonthsAgo);
                    console.log("Month Names:", monthNames);
        
                    // Process each project
                    projects.forEach((project) => {
                        const startDateParts = project.start_date.split('T')[0].split('-');
                        if (startDateParts.length === 3) {
                            const startDate = new Date(
                                Number(startDateParts[0]),
                                Number(startDateParts[1]) - 1,
                                Number(startDateParts[2])
                            );
        
                            if (!isNaN(startDate.getTime())) {
                                console.log("Parsed start date:", startDate);
        
                                // Check if the start date falls within the last 6 months
                                if (startDate >= sixMonthsAgo && startDate <= now) {
                                    const monthDiff =
                                        (now.getFullYear() - startDate.getFullYear()) * 12 +
                                        (now.getMonth() - startDate.getMonth());
        
                                    if (monthDiff >= 0 && monthDiff < 6) {
                                        counts[5 - monthDiff]++;
                                        console.log(
                                            `Count incremented for '${monthNames[5 - monthDiff]}'`
                                        );
                                    } else {
                                        console.warn(
                                            `Month diff out of range for project: ${project.title}, MonthDiff: ${monthDiff}`
                                        );
                                    }
                                } else {
                                    console.warn(
                                        `Project '${project.title}' not in range. Start Date: ${startDate}`
                                    );
                                }
                            } else {
                                console.error("Invalid start date:", project.start_date);
                            }
                        } else {
                            console.error("Invalid start_date format:", project.start_date);
                        }
                    });
        
                    console.log("Counts after processing projects:", counts);
        
                    // Map counts to month names
                    return counts.map((count, index) => ({
                        month: monthNames[index],
                        count,
                    }));
                })
            );
        }
        
        
}
