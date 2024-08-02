import { Component, EventEmitter, Output } from '@angular/core';
import { ClientServiceService } from '../../services/client-service.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Client, SearchRequest } from '../../models/client.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  sharedKey: string = '';
  searchForm: FormGroup;
  showAdvancedSearch: boolean = false;
  clients: Client[] = [];
  @Output() clientsFound = new EventEmitter<Client[]>();

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
    }
    this.clientService.searchClients(searchClient).subscribe((response) => {
      this.clients = response.data;
      this.clientsFound.emit(this.clients); // Emite la lista de clientes encontrada
    });
  }

  //Resetear parametros de busqueda
  resetSearch(): void {
    this.searchForm.reset();
    this.sharedKey = '';
  }

  //Mostrar/Ocultar panel de advanced search
  setShowAdvancedSearch() {
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }
}
