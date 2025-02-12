import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Equipements, Status } from 'src/app/demo/api/equipements'; // Import Status enum
import { MessageService } from 'primeng/api';
import { EquipService } from 'src/app/demo/service/equipements.service';
import { catchError, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './readequipements.component.html',
  styleUrls: ['./readequipements.component.scss'],
  providers: [MessageService]
})
export class ReadEquipementsComponent implements OnInit {
  equip: Equipements = { 
    id: 0, 
    name: '', 
    status: Status.Maintenance, // Default status
    taskId: 0, 
    type: '', 
    availability: 1, 
    photo: '', 
    maintenanceSchedule: ''
  };
  displayEditDialog: boolean = false;
  editForm: FormGroup;
  equipId: number;
  maintenanceSchedule: Date[] = []; // Store maintenance schedule dates

  constructor(
    private equipService: EquipService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.equipId = +params['id']; // Convert string to number
      this.loadEquip(this.equipId); // Load equipment data on initialization
      this.maintenanceSchedule = [

      ];
      
    });
    
    // Initialize edit form
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      status: [Status.Maintenance, Validators.required],
      type: ['', Validators.required],
      availability: [true],
    });
  }

  loadEquip(equipId: number) {
    this.equipService.getEquip(equipId)
      .pipe(
        catchError(error => {
          console.error('Error fetching equipment:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching equipment', life: 3000 });
          return of(null);
        })
      )
      .subscribe(data => {
        if (data) {
          this.equip = data;
          console.log('Fetched equipment:', this.equip);
          
          // Check if maintenance schedule exists and has valid data
          if (this.equip.maintenanceSchedule && this.equip.maintenanceSchedule.trim() !== '') {
            this.loadMaintenanceSchedule(this.equip.maintenanceSchedule); // Process maintenance schedule
          }
        }
      });
  }

  loadMaintenanceSchedule(scheduleStr: string) {
    console.log(`Raw maintenance schedule: ${scheduleStr}`);
    
    // If the maintenance schedule is a string, split it by commas or other delimiters if needed.
    // Assuming maintenanceSchedule is a string with comma-separated dates in ISO format
    const dateStrings = scheduleStr.split(',');
  
    // Convert the date strings into Date objects
    const parsedDates = dateStrings.map(dateStr => {
      const parsedDate = new Date(dateStr.trim()); // Convert string to Date object
      console.log('Parsed date:', parsedDate);
      
      // Check if the date is valid before adding it to the list
      return parsedDate.getTime() ? parsedDate : null; 
    }).filter(date => date !== null);  // Filter out any invalid dates
    
    // Assign the valid parsed dates to the maintenanceSchedule array
    this.maintenanceSchedule = parsedDates;
    console.log('Final parsed maintenance schedule:', this.maintenanceSchedule);
  }
  
   
  edit() {
    this.displayEditDialog = true;
    this.editForm.patchValue({
      name: this.equip.name,
      status: this.equip.status,
      type: this.equip.type,
      availability: this.equip.availability
    });
  }

  cancelEdit() {
    this.displayEditDialog = false;
  }
}
