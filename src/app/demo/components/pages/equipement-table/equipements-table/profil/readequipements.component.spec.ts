import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadEquipementsComponent } from './readequipements.component';

describe('ProfilComponent', () => {
  let component: ReadEquipementsComponent;
  let fixture: ComponentFixture<ReadEquipementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadEquipementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadEquipementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
