import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeComponent } from './addemployee.component'; // Change to AddEmployeeComponent

describe('AddEmployeeComponent', () => { // Change to AddEmployeeComponent
  let component: AddEmployeeComponent; // Change to AddEmployeeComponent
  let fixture: ComponentFixture<AddEmployeeComponent>; // Change to AddEmployeeComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmployeeComponent] // Change to AddEmployeeComponent
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEmployeeComponent); // Change to AddEmployeeComponent
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
