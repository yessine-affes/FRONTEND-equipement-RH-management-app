import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTasksComponent } from './readtasks.component';

describe('ProfilComponent', () => {
  let component: ReadTasksComponent;
  let fixture: ComponentFixture<ReadTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadTasksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
