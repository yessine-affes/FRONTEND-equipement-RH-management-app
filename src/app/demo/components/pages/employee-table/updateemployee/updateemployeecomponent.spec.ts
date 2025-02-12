import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEmployeeComponent } from './updateemployee.component'; // Update to UpdateEmployeeComponent

describe('UpdateEmployeeComponent', () => { // Update to UpdateEmployeeComponent
  let component: UpdateEmployeeComponent; // Update to UpdateEmployeeComponent
  let fixture: ComponentFixture<UpdateEmployeeComponent>; // Update to UpdateEmployeeComponent

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateEmployeeComponent] // Update to UpdateEmployeeComponent
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateEmployeeComponent); // Update to UpdateEmployeeComponent
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
