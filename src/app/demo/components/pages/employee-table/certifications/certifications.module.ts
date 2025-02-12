import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CertificationRoutingModule } from './certifications-routing.module';
import { CertificationComponent } from './certifications.component';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';

// Import AddCertificationComponent


@NgModule({
    imports: [
        TableModule,
        CalendarModule,
        InputTextModule,
        CommonModule,
        CertificationRoutingModule,
        FormsModule, // Include this only if needed
        CardModule,
        ChipModule,
        RouterModule,
        ButtonModule,
        ToastModule,
        DialogModule,
        ReactiveFormsModule,
        ToastModule,
    ],
    declarations: [
        CertificationComponent,         
    
    ]
})
export class CertificationModule {}