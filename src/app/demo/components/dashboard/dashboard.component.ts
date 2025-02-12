import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { EmployeesService } from 'src/app/demo/service/employees.service';
import { ProjectService } from 'src/app/demo/service/projects.service';
import { Project } from 'src/app/demo/api/project';
import { Reclamation } from '../../api/reclamation';
import { Employee } from '../../api/employee';
import { ReclamationService } from '../../service/reclamations.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth/auth.service';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
    projectsInProgressCount: number = 0;
    totalEmployees: number = 0;
    totalProjects: number = 0;
    employeesAddedThisYear: number = 0;
    projectsDoneThisMonth: number = 0;
    projectsInProgress: Project[] = [];
    reclamationsToday: Reclamation[] = [];
    totalReclamations: number = 0;
    totalReclamationsThisMonth: number = 0;
    projectsDoneLastSixMonths: { month: string, count: number }[] = [];
    chartData: any;
    chartOptions: any;
    top5Employees: Employee[] = [];
    maxScore: number = 0;
    employees!: Employee[];
    subscription!: Subscription;

    constructor(
        private recService: ReclamationService,
        private projectService: ProjectService,
        private empService: EmployeesService,
        public layoutService: LayoutService,
        private authService: AuthService
    ) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {});
    }

    ngOnInit() {
        this.getTotalEmployees();
        this.loadTotalProjects();
        this.loadEmployeesAddedThisYear();
        this.loadProjectsInProgressThisMonth();
        this.loadProjectsInProgress();
        this.loadReclamationsToday();
        this.loadTotalReclamations();
        this.loadReclamationsThisMonth();
        this.loadProjectsStartedLastSixMonths();
        this.loadTop5Employees();
    }

    loadTop5Employees(): void {
        this.empService.getTop5Employees().subscribe(
            (data: Employee[]) => {
                if (data.length > 0) {
                    this.top5Employees = data;
                    this.maxScore = Math.max(...data.map((emp) => emp.score));
                    console.log('Loaded Top 5 Employees:', this.top5Employees);
                } else {
                    console.warn('No employees found.');
                }
            },
            (error: any) => console.error('Error loading top 5 employees:', error)
        );
    }

    getScorePercentage(score: number): string {
        return `${(score / this.maxScore) * 100}%`;
    }

    getScoreColor(index: number): string {
        const colors = ['cyan-500', 'pink-500', 'green-500', 'purple-500', 'teal-500'];
        return colors[index] || 'gray-500';
    }

    loadProjectsStartedLastSixMonths(): void {
        this.projectService.getProjectsStartedLastSixMonths().subscribe(
            (data: { month: string, count: number }[]) => {
                if (data && data.length > 0) {
                    this.projectsDoneLastSixMonths = data;
                    this.setupChart();
                } else {
                    console.warn('No data available for the last 6 months.');
                    this.projectsDoneLastSixMonths = []; // Set empty array if no data
                }
            },
            (error: any) => {
                console.error('Error loading data: ', error);
                this.projectsDoneLastSixMonths = []; // Set empty array on error
            }
        );
    }
    
    setupChart(): void {
        console.log('Projects Data for Last 6 Months:', this.projectsDoneLastSixMonths);  // Debugging
    
        // Check if the count is incremented correctly in each month
        this.projectsDoneLastSixMonths.forEach((item, index) => {
            console.log(`Month: ${item.month}, Count: ${item.count}`);  // Debugging
        });
    
        if (!this.projectsDoneLastSixMonths || this.projectsDoneLastSixMonths.length === 0) {
            console.warn('No projects data available for chart.');
            return;
        }
    
        this.chartData = {
            labels: this.projectsDoneLastSixMonths.map((item) => item.month),
            datasets: [
                {
                    label: 'Projects Started Per Month',
                    data: this.projectsDoneLastSixMonths.map((item) => item.count),
                    fill: false,
                    borderColor: '#42A5F5',
                    tension: 0.4,
                },
            ],
        };
    
        this.chartOptions = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Projects Started Per Month',
                },
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Month',
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Projects Started Per Month',
                    },
                    beginAtZero: true,
                },
            },
        };
    }
    
    loadReclamationsToday(): void {
        this.recService.getReclamationsToday().subscribe(
            (reclamations: Reclamation[]) => (this.reclamationsToday = reclamations),
            (error: any) => console.error(error)
        );
    }

    getTotalEmployees(): void {
        this.empService.getTotalEmployees().subscribe(
            (total: number) => (this.totalEmployees = total),
            (error: any) => console.error(error)
        );
    }

    loadTotalProjects(): void {
        this.projectService.getTotalProjects().subscribe(
            (total: number) => (this.totalProjects = total),
            (error: any) => console.error(error)
        );
    }

    loadEmployeesAddedThisYear(): void {
        this.empService.getEmployeesAddedThisYear().subscribe(
            (total: number) => (this.employeesAddedThisYear = total),
            (error: any) => console.error(error)
        );
    }

    loadProjectsInProgressThisMonth(): void {
        this.projectService.getProjectsInProgressCount().subscribe(
            (count: number) => {
                this.projectsInProgressCount = count;
            },
            (error: any) => console.error(error)
        );
    }

    loadProjectsInProgress(): void {
        this.projectService.getProjectsInProgress().subscribe(
            (projects: Project[]) => (this.projectsInProgress = projects),
            (error: any) => console.error(error)
        );
    }

    loadTotalReclamations(): void {
        this.recService.getTotalReclamations().subscribe(
            (total: number) => (this.totalReclamations = total),
            (error: any) => console.error(error)
        );
    }

    loadReclamationsThisMonth(): void {
        this.recService.getReclamationsThisMonth().subscribe(
            (total: number) => (this.totalReclamationsThisMonth = total),
            (error: any) => console.error(error)
        );
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    logout() {
        this.authService.logout();
    }
}
