import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CertificationComponent } from './certifications.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: CertificationComponent },
     
      
    ]),
  ],
  exports: [RouterModule],
})
export class CertificationRoutingModule {}