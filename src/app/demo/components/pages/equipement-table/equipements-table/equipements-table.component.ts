import { Component, OnInit } from '@angular/core';
import { Equipements, Status } from 'src/app/demo/api/equipements'; // Import Status enum
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EquipService } from 'src/app/demo/service/equipements.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipements-table',
  templateUrl: './equipements-table.component.html',
  providers: [MessageService]
})
export class EquipementsTableComponent implements OnInit {
  equipDialog: boolean = false;
  deleteEquipDialog: boolean = false;
  equipeditDialog: boolean = false;
  equips: Equipements[] = [];
  equip: Equipements = this.resetEquip();
  selectedEquips: Equipements[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  types: any[] = [];
  statuses: any[] = [];
  availabilityOptions: any[] = []; // Declare the availability options
  rowsPerPageOptions = [5, 10, 20];
  selectedFile: File | null = null;
  imageError: string | null = null;
  maintenanceSchedule: string = ''; // Déclarée comme une chaîne

   
  constructor(
    private equipService: EquipService,
    private messageService: MessageService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadEquipements();
    this.types = [
      { label: 'Installation', value: 'installation' },
      { label: 'Integration', value: 'integration' },
      { label: 'SAV', value: 'SAV' }
    ];

    this.availabilityOptions = [  // Initialize the availability options
      { label: 'Available', value: true },
      { label: 'Unavailable', value: false }
    ];
    
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'status', header: 'Status' },
      { field: 'type', header: 'Type' },
      { field: 'availability', header: 'Availability' },
      { field: 'photo', header: 'Photo' }
    ];

    this.statuses = [
      { label: 'Maintenance', value: Status.Maintenance },
      { label: 'Usable', value: Status.Usable },
    ];
  }

  loadEquipements() {
    this.equipService.getEquipements()
      .pipe(
        catchError(error => {
          console.error('Error fetching equipements:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching equipements', life: 3000 });
          return of([] as Equipements[]);
        })
      )
      .subscribe(data => {
        this.equips = data;
      });
  }

  openNew() {
    this.equip = this.resetEquip();
    this.submitted = false;
    this.equipDialog = true;
  }

  openEdit(equipement: Equipements) {
    this.equip = { ...equipement }; // Copy the selected equipment data to be edited
    this.equipeditDialog = true;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      if (fileExtension === 'jpg') {
        this.selectedFile = file;
        this.imageError = null;
      } else {
        this.imageError = 'Please upload only .jpg images.';
        this.selectedFile = null;
      }
    } else {
      this.imageError = 'Please select a valid image file.';
      this.selectedFile = null;
    }
  }

  async uploadPhoto(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('photo', file);
  
    try {
      const response = await this.http.post<string>('http://127.0.0.1:8000/api/upload-image', formData).toPromise();
      return response; 
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('File upload failed');
    }
  }

  async saveEquip() {
    this.submitted = true;

    if (this.equip.name && this.equip.status) {
      try {
        if (this.selectedFile) {
          const filename = await this.uploadPhoto(this.selectedFile);
          this.equip.photo = filename.split('.')[0];
        }

        this.equipService.addEquip(this.equip).subscribe(
          () => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Equipement Created', life: 3000 });
            this.loadEquipements(); 
            this.hideDialog();
          },
          error => {
            console.error('Error adding equipement:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding equipement', life: 3000 });
          }
        );
      } catch (error) {
        console.error('Error in saveEquip:', error);
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields', life: 3000 });
    }

    this.equipDialog = false;
    this.equip = this.resetEquip();
  }

  editEquip(equipement: Equipements) {
    this.router.navigate(['/pages/equipements/edit-equipements', equipement.id])
      .catch(err => {
        console.error('Navigation error:', err);
      });
  }
  saveeditEquip() {
    this.submitted = true;

    if (this.equip.name && this.equip.status) {
      this.equipService.updateEquip(this.equip).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Equipement Updated', life: 3000 });
          this.loadEquipements();
          this.hideDialog();
        },
        error => {
          console.error('Error updating equipement:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating equipement', life: 3000 });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields', life: 3000 });
    }

    this.equipeditDialog = false;
    this.equip = this.resetEquip();
  }

  deleteEquip(equipement: Equipements) {
    this.deleteEquipDialog = true; 
    this.equip = { ...equipement }; 
  }

  confirmDelete() {
    if (this.equip && this.equip.id) {
      this.equipService.deleteEquip(this.equip.id).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Equipement Deleted', life: 3000 });
          this.loadEquipements(); 
          this.deleteEquipDialog = false; 
          this.equip = this.resetEquip(); 
        },
        error => {
          console.error('Error deleting equipement:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting equipement', life: 3000 });
          this.deleteEquipDialog = false; 
        }
      );
    }
  }

  hideDialog() {
    this.equipDialog = false;
    this.submitted = false;
    this.equipeditDialog = false;
  }

  resetEquip(): Equipements {
    return { 
      id: 0, 
      name: '', 
      status: Status.Maintenance, 
      taskId: 0, 
      type: '', 
      availability:1,  // Initialize availability
      photo: '', 
      maintenanceSchedule: ''
    };
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  readEquip(equipement: Equipements) { 
    //this.loadMaintenanceSchedule(equipement.id);
    this.router.navigate(['/pages/equipements/read-equipements', equipement.id])
      .catch(err => {
        console.error('Navigation error:', err);
      });
  }

  setFallbackImage(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/demo/images/equipments.jpg';
}


/*loadMaintenanceSchedule(equipId: number) {
  this.equipService.getMaintenanceSchedule(equipId).subscribe(
    schedule => {
      // Convertir le tableau de dates en une chaîne séparée par des tirets
      this.maintenanceSchedule = schedule.join(' - ');
      console.log('Maintenance Schedule:', this.maintenanceSchedule);
    },
    error => {
      console.error('Error fetching maintenance schedule:', error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching maintenance schedule', life: 3000 });
    }
  );
}*/
navigateToAddEquipements() {
  this.router.navigate(['/pages/equipements/add-equipements']);
}
}