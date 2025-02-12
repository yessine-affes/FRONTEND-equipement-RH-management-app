import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEquipementsRoutingModule } from './editequipements-routing.module';
import { EditEquipementsComponent } from './editequipements.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar'; // For date selection
import { RippleModule } from 'primeng/ripple';

@NgModule({
    imports: [
        CommonModule,
        EditEquipementsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        DropdownModule,
        ToastModule,
        CalendarModule,
        RippleModule,
        
    ],
    declarations: [EditEquipementsComponent]
})
export class EditEquipementsModule { }
