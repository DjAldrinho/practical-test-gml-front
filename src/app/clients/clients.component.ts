import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { NavComponent } from '../common/nav/nav.component';
import {
  Client,
  CreateClientRequest,
  SearchRequest,
} from './models/client.model';
import { ClientServiceService } from './services/client-service.service';
import { CommonModule } from '@angular/common';

import {
  ModalDismissReasons,
  NgbDatepickerModule,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { PanelButtonsComponent } from './components/panel-buttons/panel-buttons.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    NavComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PanelButtonsComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent implements OnInit {
  searchForm: FormGroup;
  sharedKey: string = '';
  clients: Client[] = [];
  showAdvancedSearch: boolean = false;
  paramsValue: any[] = [];

  constructor(
    private clientService: ClientServiceService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      phone: [''],
      email: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  setShowAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  //Listado de clientes
  loadClients(): void {
    this.clientService.getClients().subscribe((response) => {
      this.clients = response.data;
    });
  }

  //Buscar clientes
  searchClients(): void {
    const formValues = this.searchForm.value;

    let searchClient: SearchRequest = {
      param: '',
      value: '',
      value2: '',
    };

    if (this.sharedKey) {
      searchClient = { param: 'sharedKey', value: this.sharedKey };
    } else if (formValues.phone) {
      searchClient = { param: 'phone', value: formValues.phone };
    } else if (formValues.email) {
      searchClient = { param: 'email', value: formValues.email };
    } else if (formValues.startDate || formValues.endDate) {
      searchClient = {
        param: 'dataAdded',
        value: formValues.startDate,
        value2: formValues.endDate,
      };
    } else {
      this.loadClients(); // Recargar lista de clientes
    }

    this.clientService.searchClients(searchClient).subscribe((response) => {
      this.clients = response.data;
    });
  }

  //Resetear parametros de busqueda
  resetSearch(): void {
    this.searchForm.reset();
    this.sharedKey = '';
  }

  onClientCreated(): void {
    this.loadClients();
  }
}
