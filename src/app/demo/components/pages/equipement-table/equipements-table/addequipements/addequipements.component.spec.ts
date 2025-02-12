import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEquipementsComponent } from './addequipements.component'; // Changed to AddEquipementComponent

describe('AddEquipementComponent', () => { // Changed to AddEquipementComponent
  let component: AddEquipementsComponent; // Changed to AddEquipementComponent
  let fixture: ComponentFixture<AddEquipementsComponent>; // Changed to AddEquipementComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEquipementsComponent] // Changed to AddEquipementComponent
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEquipementsComponent); // Changed to AddEquipementComponent
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
