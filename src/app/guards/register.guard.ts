import { Observable } from 'rxjs/Rx';
import { Settings } from './../models/settings';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';

@Injectable()
export class RegisterGuard implements CanActivate {
    constructor(
        private router: Router,
        public settingsService: SettingsService
    ) {}

     canActivate(): Observable<boolean> {
      return this.settingsService.getSettings().map((s: Settings) => {
        if (s.allowRegistration === true) {

        return true;
       } else {
        this.router.navigate(['/login']);
        return false;
       }
      });
    }
}
