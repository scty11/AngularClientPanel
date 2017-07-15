import { Settings } from './../../models/settings';
import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessagesService: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

   ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.settingsService.getSettings().subscribe((s: Settings) => {
    // tslint:disable-next-line:no-debugger
    debugger;
      this.showRegister =  (s.allowRegistration === true)
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessagesService.show('You are logged out', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/login']);
  }

}
