import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from './../../models/settings';
import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings = {
  };

  constructor(
    public settingsService: SettingsService,
    public flashMessagesService: FlashMessagesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.settingsService.getSettings().subscribe(setting => {
      this.settings.allowRegistration = setting.allowRegistration === true;
      this.settings.disableBalanceOnAdd = setting.disableBalanceOnAdd === true;
      this.settings.disableBalanceOnEdit = setting.disableBalanceOnEdit === true;
    });
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMessagesService.show('Settings saved', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/settings']);
  }

}
