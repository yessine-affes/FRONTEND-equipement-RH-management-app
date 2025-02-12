import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProjectRoutingModule } from './updateproject-routing.module';
import {  UpdateProjectComponent } from './updateproject.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar'; // For date selection
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        UpdateProjectRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        ToastModule,
        CalendarModule,
        RippleModule,
        
    ],
    declarations: [UpdateProjectComponent]
})
export class UpdateProjectModule { }
