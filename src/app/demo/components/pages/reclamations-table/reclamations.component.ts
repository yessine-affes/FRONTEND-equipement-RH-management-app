import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/demo/api/reclamation';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ReclamationService } from 'src/app/demo/service/reclamations.service';
import { catchError, of } from 'rxjs';
import { EmailService } from 'src/app/demo/service/email.service';
import { EmployeesService } from 'src/app/demo/service/employees.service';
import { Employee } from 'src/app/demo/api/employee';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './reclamations.component.html',
    styleUrls: ['./reclamations.component.scss'],
    providers: [MessageService]
})
export class ReclamationsComponent implements OnInit {
    // Dialog states
    recreplyDialog: boolean = false;
    deleteRecDialog: boolean = false;
    readRecDialog: boolean = false;

    // Data
    recs: Reclamation[] = [];
    employees: Employee[] = [];
    selectedRecs: Reclamation[] = [];
    submitted: boolean = false;

    // Reply form data
    formData: string[] = ['', ''];

    // Chatbot Data
    userMessage: string = '';
    chatMessages: { sender: string; content: string }[] = [];

    // Miscellaneous
    cols: any[] = [];
    rowsPerPageOptions = [5, 10, 20];

    rec: Reclamation = {
        id: 0,
        employee_id: 0,
        subject: '',
        content: '',
        photo: ''
    };
    chatbotApiUrl: string = 'https://your-chatbot-endpoint.com/api'; // Replace with your chatbot API URL
    chatbotToken: string = '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'; // Replace with your actual token
    
    constructor(
        private recService: ReclamationService,
        private messageService: MessageService,
        private emailService: EmailService,
        private employeesService: EmployeesService,
        private http: HttpClient // Add HttpClient here

    ) {}

    ngOnInit() {
        this.loadReclamations();
        this.loadEmployees();

        this.cols = [
            { field: 'subject', header: 'Subject' },
            { field: 'content', header: 'Content' },
            { field: 'photo', header: 'Photo' }
        ];
    }

    // Load reclamations from the API
    loadReclamations() {
        this.recService
            .getRecs()
            .pipe(
                catchError(error => {
                    console.error('Error fetching reclamations:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Error fetching reclamations.',
                        life: 3000
                    });
                    return of([] as Reclamation[]);
                })
            )
            .subscribe(data => {
                this.recs = data;
                console.log('Loaded reclamations:', this.recs);
            });
    }

    // Load employees from the API
    loadEmployees() {
        this.employeesService
            .getEmployees()
            .pipe(
                catchError(error => {
                    console.error('Error fetching employees:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to load employees.',
                        life: 3000
                    });
                    return of([] as Employee[]);
                })
            )
            .subscribe(data => {
                this.employees = data;
                console.log('Loaded employees:', this.employees);
            });
    }
    getEmployeeFirstName(employee_id: number): string {
        const employee = this.employees.find(e => e.id === employee_id);
        return employee ? employee.first_name : 'Unknown';
    }
    
    // Open dialog to read reclamation
    readRec(reclamation: Reclamation) {
        console.log('Selected Reclamation:', reclamation); // Debugging step
    
        if (!reclamation || !reclamation.id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Invalid reclamation selected.',
            });
            return;
        }
    
        this.recService.getRec(reclamation.id) // Assuming this API call gets detailed data
            .subscribe(
                (response) => {
                    this.rec = response; // Assign the detailed reclamation
                    this.readRecDialog = true; // Open dialog
                },
                (error) => {
                    console.error('Failed to fetch reclamation details:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to fetch reclamation details.',
                    });
                }
            );
    }
    

    // Open Reply Dialog
    openreply(rec: Reclamation) {
        this.rec = { ...rec }; // Pre-fill with selected reclamation data
        this.formData = ['', '']; // Reset form data
        this.chatMessages = []; // Reset chatbot messages
        this.userMessage = ''; // Reset chatbot input
        this.recreplyDialog = true;
    }

    // Send Reply Logic
    sendreply() {
        this.submitted = true;

        // Validate reply form
        if (!this.formData[0] || !this.formData[1]) {
            this.messageService.add({
                severity: 'error',
                summary: 'Validation Error',
                detail: 'Both subject and content are required.',
                life: 3000
            });
            return;
        }

        const replyData = {
            subject: this.formData[0],
            content: this.formData[1]
        };

        // Send email or save reply logic
        this.emailService
            .sendEmail(this.getEmployeeEmail(this.rec.employee_id), replyData.subject, replyData.content)
            .subscribe(
                () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Reply Sent',
                        detail: 'The reply was successfully sent.',
                        life: 3000
                    });
                    this.recreplyDialog = false; // Close dialog
                },
                error => {
                    console.error('Error sending reply:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to send reply.',
                        life: 3000
                    });
                }
            );
    }

    // Chatbot Interaction Logic
    sendChatbotResponseAsEmail(botResponse: string) {
        // Fetch the employee's email corresponding to the reclamation
        const employeeEmail = this.getEmployeeEmail(this.rec.employee_id);
    
        if (!employeeEmail || employeeEmail === 'unknown@example.com') {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Employee email not found.',
                life: 3000
            });
            return;
        }
    
    }
    
    sendMessageToBot() {
        if (!this.userMessage.trim()) return;
    
        // Add user's message to the chat
        this.chatMessages.push({ sender: 'user', content: this.userMessage });
    
        // Prepare the payload for the chatbot API
        const payload = { message: this.userMessage };
    
        // Make the API call to the chatbot backend
        this.http.post<{ reply: string }>('http://localhost:3000/api/chat', payload).subscribe(
            response => {
                // Add chatbot's reply to the chat
                const botResponse = response.reply || 'Sorry, I didn’t understand that.';
                this.chatMessages.push({ sender: 'bot', content: botResponse });
    
                // Send the chatbot response as an email to the employee
                this.sendChatbotResponseAsEmail(botResponse);
            },
            error => {
                console.error('Chatbot API error:', error);
                this.chatMessages.push({ sender: 'bot', content: 'Error fetching chatbot response.' });
            }
        );
    
        // Clear user's input
        this.userMessage = '';
    }
    
    
    

    // Get employee email by ID (mocked for now)
    getEmployeeEmail(employee_id: number): string {
        const employee = this.employees.find(e => e.id === employee_id);
        return employee ? employee.email || 'unknown@example.com' : 'unknown@example.com';
    }

    // Open delete dialog for a reclamation
    deleteRec(reclamation: Reclamation) {
        this.rec = { ...reclamation };
        this.deleteRecDialog = true;
    }

    // Confirm deletion of a reclamation
    confirmDelete() {
        this.recService.deleteRec(this.rec.id).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Deleted',
                    detail: 'Reclamation deleted successfully.',
                    life: 3000
                });
                this.loadReclamations(); // Reload the list
                this.deleteRecDialog = false;
            },
            error => {
                console.error('Error deleting reclamation:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Failed to delete reclamation.',
                    life: 3000
                });
            }
        );
    }

    // Fallback for missing images
    setFallbackImage(event: Event): void {
        const target = event.target as HTMLImageElement;
        target.src = 'assets/demo/images/complaints.jpg';
    }

    // Reset the current reclamation object
    resetRec() {
        this.rec = {
            id: 0,
            employee_id: 0,
            subject: '',
            content: '',
            photo: ''
        };
    }

    // Hide dialogs
    hideDialog() {
        this.recreplyDialog = false;
        this.readRecDialog = false;
        this.submitted = false;
    }

    // Apply global filter
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
