import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from '../login/login.component';
import { LoggerService, betterLogger } from '../../../logger.service';


@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterOutlet, MatSidenavModule, MatButtonModule, MatIconModule, LoginComponent],
  providers: [{provide: betterLogger, useClass: LoggerService}],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  showFiller = false;
  


  test = inject(LoggerService);
  ngOnInit(){
    this.test.runLog("test");
    console.log()
  }
}
