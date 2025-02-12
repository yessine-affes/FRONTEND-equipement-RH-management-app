import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReadEquipementsRoutingModule } from './readequipements-routing.module'; // Create a separate routing module for ReadEquipements
import { ReadEquipementsComponent } from './readequipements.component'; // Adjust the path as needed
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [ReadEquipementsComponent],
    imports: [
        CommonModule,
        ReadEquipementsRoutingModule, // Import the routing module for read functionality
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        DropdownModule,
        CalendarModule
    ],
})
export class ReadEquipementsModule { }
