import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditEquipementsComponent } from './editequipements.component';

describe('EditEquipementsComponent', () => {
  let component: EditEquipementsComponent;
  let fixture: ComponentFixture<EditEquipementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEquipementsComponent],
      // If there are dependencies (like services), add them here in the providers array
      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEquipementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
