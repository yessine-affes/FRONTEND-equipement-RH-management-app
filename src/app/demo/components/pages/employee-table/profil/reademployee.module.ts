import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import only if using template-driven forms
import { RouterModule } from '@angular/router';
import {ReadEmployeeComponent } from './reademployee.component';
import { ProfilRoutingModule } from './reademployee-routing.module';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
  declarations: [ReadEmployeeComponent],
  imports: [
    TableModule,
    CalendarModule,
    InputTextModule,
    CommonModule,
    ProfilRoutingModule,
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
  // No need to export BrowserAnimationsModule or BrowserModule
})
export class ReadEmployeeModule { }
