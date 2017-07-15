import { Client } from './../../models/client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ClientService } from './../../services/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;

  constructor( public clientService: ClientService,
  public flashMessagesService: FlashMessagesService,
  public router: Router,
  public route: ActivatedRoute, ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id).subscribe(client => {
      if (client.balance > 0) {
        this.hasBalance = true;
      }else
       {
        this.hasBalance = false;
      }
      this.client = client;
    });
  }

   updateBalance(id: string) {
    // Update client
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance Updated', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/client/' + this.id]);
  }

    onDeleteClick() {
    if (confirm('Are you sure to delete?')) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client Deleted', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/']);
    }
  }

}
