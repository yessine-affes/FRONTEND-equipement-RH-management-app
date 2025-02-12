import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from 'src/app/demo/api/user';
import { MessageService } from 'primeng/api';
import { UpdatedUser } from 'src/app/demo/api/updateuser';

@Component({
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  providers: [MessageService]
})
export class ProfilComponent implements OnInit {
  user: User;
  displayEditDialog: boolean = false;
  editField: string;
  editForm: FormGroup;
  photoFile: File | null = null;
  updateduser: UpdatedUser;
  imageError: string | null = null;
  imageName: string | null = null;

  constructor(public authService: AuthService, private messageService: MessageService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUserData();
    this.editForm = this.fb.group({
      username: ['', Validators.required],  // Updated to reflect the new username field
      email: ['', [Validators.required, Validators.email]],
      photo: [null, Validators.required]
    });
  }

  loadUserData() {
    this.authService.getProfile().subscribe(
      (data: User) => {
        this.user = data;
        
        this.editForm.patchValue({
          username: this.user.username,
          email: this.user.email,
       
        });
        console.log("User data loaded successfully:", this.user);
      },
      (error) => {
        console.error('Error loading user data:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load user data.' });
      }
    );
  }

  edit(field: string) {
    this.editField = field;
    this.displayEditDialog = true;
    this.editForm.patchValue({ 
      username: this.user.username,  // Ensuring this is set correctly
      email: this.user.email 
    });
  }

  cancelEdit() {
    this.displayEditDialog = false;
  }

  async saveEdit() {
    if (this.editField === 'photo' && this.photoFile) {
      const formData = new FormData();
      formData.append('photo', this.photoFile);

      try {
        const response = await this.authService.uploadPhoto(formData).toPromise();
        
        this.imageName = response.filename;
      } catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload photo.' });
        return;
      }
    } else {
      // Ensure we are saving username and email correctly
      this.user.username = this.editForm.value.username;
      this.user.email = this.editForm.value.email;
    }

    this.displayEditDialog = false;
    this.save();  // Call save to update the profile
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop()?.toLowerCase();
      if (fileExtension === 'jpg') {
        this.photoFile = file;
        this.imageError = null;
      } else {
        this.imageError = 'Please upload only .jpg images.';
        this.photoFile = null;
      }
    } else {
      this.imageError = 'Please select a valid image file.';
      this.photoFile = null;
    }
  }

  save() {
    this.updateduser = {
      username: this.user.username,  // Ensure this reflects the username
      email: this.user.email,
      
    };

    if (this.updateduser) {
      this.authService.updateProfile(this.updateduser).subscribe(
        () => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully.' });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update profile.' });
        }
      );
    }
  }
}
