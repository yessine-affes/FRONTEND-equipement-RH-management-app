import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateProjectComponent } from './updateproject.component';

describe('EditEquipementsComponent', () => {
  let component: UpdateProjectComponent;
  let fixture: ComponentFixture<UpdateProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProjectComponent],
      // If there are dependencies (like services), add them here in the providers array
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
