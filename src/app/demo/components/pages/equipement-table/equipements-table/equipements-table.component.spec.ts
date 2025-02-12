import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipementsTableComponent } from './equipements-table.component';

describe('EquipementsTableComponent', () => {
  let component: EquipementsTableComponent;
  let fixture: ComponentFixture<EquipementsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipementsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipementsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
