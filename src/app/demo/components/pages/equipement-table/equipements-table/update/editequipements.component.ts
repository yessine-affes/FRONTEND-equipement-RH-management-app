import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipements, Status } from 'src/app/demo/api/equipements';
import { EquipService } from 'src/app/demo/service/equipements.service';
import { PhotoService } from 'src/app/demo/service/photo.service'; // Import PhotoService
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-equipement',
  templateUrl: './editequipements.component.html',
  styleUrls: ['./editequipements.component.scss'],
  providers: [MessageService],
})
export class EditEquipementsComponent implements OnInit {
  equip: Equipements = {
    id: 0,
    name: '',
    status: Status.Maintenance,
    taskId: 0,
    type: '',
    availability: 1,
    photo: '',
    maintenanceSchedule: '',
  };

  submitted: boolean = false;
  selectedFile: File | null = null;
  imageError: string | null = null;
  statuses: { label: string; value: Status }[] = [];
  availabilityOptions: { label: string; value: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private equipService: EquipService,
    private photoService: PhotoService, // Inject PhotoService
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const equipId = +params['id'];
      if (equipId) {
        this.loadEquip(equipId);
      }
    });

    this.statuses = [
      { label: 'Maintenance', value: Status.Maintenance },
      { label: 'Usable', value: Status.Usable },
    ];
    this.availabilityOptions = [
      { label: 'Available', value: '1' },
      { label: 'Not Available', value: '0' },
    ];
  }

  loadEquip(id: number) {
    this.equipService.getEquip(id).subscribe(
      (data) => {
        this.equip = data;
      },
      (error) => {
        console.error('Error fetching equipment:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Equipment not found.',
          life: 3000,
        });
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
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

  saveEditEquip() {
    this.submitted = true;

    if (this.equip.name && this.equip.status && this.equip.type) {
      if (this.selectedFile) {
        // Upload the selected file and update the photo field
        this.photoService.uploadImage(this.selectedFile).subscribe(
          () => {
            this.equip.photo = this.selectedFile!.name; // Assign filename to the photo field
            this.updateEquipDetails(); // Update equipment after successful upload
          },
          (error) => {
            console.error('Error uploading image:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error uploading image.',
              life: 3000,
            });
          }
        );
      } else {
        this.updateEquipDetails(); // Update equipment if no new photo is selected
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill all required fields.',
        life: 3000,
      });
    }
  }

  updateEquipDetails() {
    this.equipService.updateEquip(this.equip).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Equipment Updated',
          life: 3000,
        });
        setTimeout(() => this.navigateToEquipementsTable(), 1500);
      },
      (error) => {
        console.error('Error updating equipment:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error updating equipment.',
          life: 3000,
        });
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
      maintenanceSchedule: '',
    };
    this.selectedFile = null;
    this.imageError = null;
    this.submitted = false;
  }

  navigateToEquipementsTable() {
    this.router.navigate(['/pages/equipements']);
  }
}
