import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskAssignmentsComponent } from './update-task-assignments.component';

describe('TaskAssignmentsComponent', () => {
  let component: UpdateTaskAssignmentsComponent;
  let fixture: ComponentFixture<UpdateTaskAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateTaskAssignmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateTaskAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
