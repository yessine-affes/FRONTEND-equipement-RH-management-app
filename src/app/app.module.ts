import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { EquipService } from './demo/service/equipements.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { AuthService } from '../app/demo/components/auth/auth.service';
import { AuthGuard } from '../app/demo/components/auth/auth.guard';
import { MissionService } from './demo/service/missions.service';
import { ReclamationService } from './demo/service/reclamations.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TechService } from './demo/service/techniciens.service';
import { EmployeesService } from './demo/service/employees.service';
import { CertificationService } from './demo/service/certification.service';
import { ProductService } from './demo/service/product.service';
import { ProjectService } from './demo/service/projects.service';
import { TaskService } from './demo/service/task.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule,    BrowserAnimationsModule,HttpClientModule    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,ProductService,ProjectService,TaskService,TaskService,
        PhotoService,EmployeesService,CertificationService, EquipService,AuthService, AuthGuard,MissionService,ReclamationService,CardModule, FormsModule,ButtonModule,InputTextModule,TechService
    ],
   
    bootstrap: [AppComponent],
})
export class AppModule {}
