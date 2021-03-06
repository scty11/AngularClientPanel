import { Settings } from './../../models/settings';
import { SettingsService } from './../../services/settings.service';
import { ClientService } from './../../services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from './../../models/client';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
 disableBalanceOnAdd = true;

  constructor(public flashMessagesService: FlashMessagesService, public router: Router,
  public clientService: ClientService, public settingsService: SettingsService) { }

  ngOnInit() {
    this.settingsService.getSettings().subscribe((s: Settings) =>
      this.disableBalanceOnAdd = s.disableBalanceOnAdd);
  }

  onSubmit({value, valid}: {value: Client, valid: boolean}) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }

    if (!valid) {
      this.flashMessagesService.show('Please fill in all options', {cssClass: 'alert-danger', timeout: 4000})
      this.router.navigate(['add-client']);
    }else {
      this.clientService.newClient(value);

      this.flashMessagesService.show('New client added', {cssClass: 'alert-success', timeout: 4000})
      this.router.navigate(['/']);
    }
  }

  }

