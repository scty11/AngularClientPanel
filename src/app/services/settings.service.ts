import { Settings } from './../models/settings';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

@Injectable()
export class SettingsService {
  settings: FirebaseObjectObservable<Settings>;

  constructor(public af: AngularFireDatabase) {

      this.settings = this.af.object('/settings/' +
      '1giwduClIDdLXwbJiDw7VdGYtm72') as FirebaseObjectObservable<Settings>;
  }

  getSettings() {
    return this.settings
  }

  changeSettings(settings: Settings){
    return this.settings.update(settings);
  }



}
