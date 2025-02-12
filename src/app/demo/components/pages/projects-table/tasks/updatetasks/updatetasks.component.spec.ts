import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTasksComponent } from './updatetasks.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

describe('AddTasksComponent', () => {
  let component: AddTasksComponent;
  let fixture: ComponentFixture<AddTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTasksComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        CalendarModule,
        InputTextareaModule,
        DropdownModule,
        ButtonModule
      ],
      providers: [MessageService]
    }).compileComponents();

    fixture = TestBed.createComponent(AddTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 5 predefined tasks', () => {
    expect(component.tasks.length).toBe(5);
  });
});
