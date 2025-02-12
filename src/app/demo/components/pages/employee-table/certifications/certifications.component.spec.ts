import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationComponent } from './certifications.component';

describe('CertificationsComponent', () => {
  let component: CertificationComponent;
  let fixture: ComponentFixture<CertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
