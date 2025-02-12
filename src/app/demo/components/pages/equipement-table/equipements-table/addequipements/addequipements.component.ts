import { Component, OnInit } from '@angular/core';
import { Equipements, Status } from 'src/app/demo/api/equipements';
import { MessageService } from 'primeng/api';
import { EquipService } from 'src/app/demo/service/equipements.service';
import { PhotoService } from 'src/app/demo/service/photo.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-addequipement',
  templateUrl: './addequipements.component.html',
  styleUrls: ['./addequipements.component.scss'],
  providers: [MessageService]
})
export class AddEquipementsComponent implements OnInit {
  equipDialog: boolean = false;
  equipEditDialog: boolean = false;
  deleteEquipDialog: boolean = false;
  deleteEquipsDialog: boolean = false;
  equipements: Equipements[] = [];
  equip: Equipements = {
    id: 0,
    name: '',
    status: Status.Maintenance,
    taskId: 0,
    type: '',
    availability: 1,
    photo: '',
    maintenanceSchedule: '' // Default empty array
  };
  selectedEquips: Equipements[] = [];
  submitted: boolean = false;
  imageError: string | null = null;
  selectedFile: File | null = null; // File selected for upload
  statuses: { label: string, value: string }[] = [
    { label: 'Usable', value: 'Usable' },
    { label: 'Maintenance', value: 'Maintenance' }
  ];
  availabilityOptions: { label: string, value: number }[] = [
    { label: 'Available', value: 1 },
    { label: 'Not Available', value: 0 }
  ];

  constructor(
    private equipService: EquipService,
    private messageService: MessageService,
    private router: Router,
    private photoService: PhotoService // Inject PhotoService
  ) {}

  ngOnInit() {
    this.loadEquipements();
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
        this.equipements = data;
      });
  }

  openNew() {
    this.equip = {
      id: 0,
      name: '',
      status: Status.Maintenance,
      taskId: 0,
      type: '',
      availability: 1,
      photo: '',
      maintenanceSchedule: ''
    };
    this.submitted = false;
    this.equipDialog = true;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      if (fileExtension === 'jpg') {
        this.selectedFile = file; // Store the selected file
        this.imageError = null; // Clear previous errors
      } else {
        this.imageError = 'Please upload only .jpg images.';
        this.selectedFile = null;
      }
    } else {
      this.imageError = 'Please select a valid image file.';
      this.selectedFile = null;
    }
  }

  saveEquip() {
    this.submitted = true;

    if (this.equip.name && this.equip.status && this.equip.type) {
      // Check if a file is selected for upload
      if (this.selectedFile) {
        this.photoService.uploadImage(this.selectedFile).subscribe(
          () => {
            this.equip.photo = this.selectedFile!.name; // Set the filename
            this.saveEquipData(); // Save equipment data after photo upload
          },
          error => {
            console.error('Error uploading image:', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error uploading image', life: 3000 });
          }
        );
      } else {
        this.saveEquipData(); // Save equipment data without a photo
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields', life: 3000 });
    }
  }

  saveEquipData() {
    this.equipService.addEquip(this.equip).subscribe(
      () => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Equipment Created', life: 3000 });
        this.loadEquipements();
        setTimeout(() => {
          this.navigateToEquipementsTable();
        }, 1500);
      },
      error => {
        console.error('Error adding equipment:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error adding equipment', life: 3000 });
      }
    );
  }

  reset() {
    this.equip = {
      id: 0,
      name: '',
      status: Status.Maintenance,
      taskId: 0,
      type: '',
      availability: 1,
      photo: '',
      maintenanceSchedule: ''
    };
    this.selectedFile = null;
    this.imageError = null;
    this.equipDialog = false;
    this.equipEditDialog = false;
    this.submitted = false;
  }

  navigateToEquipementsTable() {
    this.router.navigate(['/pages/equipements']);
  }

  cancel() {
    this.router.navigate(['/pages/equipements/equipement-table']);
  }
}
