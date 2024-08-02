import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../common/nav/nav.component';
import { Client } from './models/client.model';
import { ClientServiceService } from './services/client-service.service';
import { CommonModule } from '@angular/common';

import { PanelButtonsComponent } from './components/panel-buttons/panel-buttons.component';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    NavComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelButtonsComponent,
    SearchComponent,
    TableComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  paramsValue: any[] = [];

  constructor(
    private clientService: ClientServiceService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  //Listado de clientes
  loadClients(): void {
    this.clientService.getClients().subscribe((response) => {
      this.clients = response.data;
    });
  }

  onClientCreated(): void {
    this.loadClients();
  }

  onSearch(clients: Client[]): void {
    if (clients.length > 0) {
      this.clients = clients;
    } else {
      this.loadClients();
    }
  }
}
