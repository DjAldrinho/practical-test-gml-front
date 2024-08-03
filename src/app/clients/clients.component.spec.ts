import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsComponent } from './clients.component';
import { provideHttpClient } from '@angular/common/http';
import { ClientServiceService } from './services/client-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from '../common/nav/nav.component';
import { PanelButtonsComponent } from './components/panel-buttons/panel-buttons.component';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { of } from 'rxjs';
import { Client } from './models/client.model';

describe('ClientsComponent', () => {
  let component: ClientsComponent;
  let fixture: ComponentFixture<ClientsComponent>;
  let clientService: ClientServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ClientsComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NavComponent,
        PanelButtonsComponent,
        SearchComponent,
        TableComponent,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClient(),
        ClientServiceService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsComponent);
    component = fixture.componentInstance;
    clientService = TestBed.inject(ClientServiceService);

    // Simular el método getClients del servicio
    spyOn(clientService, 'getClients').and.returnValue(
      of({
        data: [
          {
            id: 1,
            businessId: 'BID123',
            sharedKey: 'sharedKey123',
            email: 'test@example.com',
            phone: '1234567890',
            dataAddedFormatted: '2024-08-02',
          },
        ],
        message: 'Clients fetched successfully',
      })
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load clients on init', () => {
    component.ngOnInit();
    expect(clientService.getClients).toHaveBeenCalled();
    expect(component.clients.length).toBe(1);
    expect(component.clients[0].email).toBe('test@example.com');
  });

  it('should reload clients when a new client is created', () => {
    spyOn(component, 'loadClients'); // Espiar el método loadClients
    component.onClientCreated();
    expect(component.loadClients).toHaveBeenCalled();
  });

  it('should update clients when search returns results', () => {
    const searchResults: Client[] = [
      {
        id: 2,
        businessId: 'BID124',
        sharedKey: 'sharedKey124',
        email: 'search@example.com',
        phone: '0987654321',
        dataAddedFormatted: '2024-08-03',
      },
    ];

    component.onSearch(searchResults);
    expect(component.clients).toEqual(searchResults);
  });

  it('should reload clients when search returns no results', () => {
    spyOn(component, 'loadClients'); // Espiar el método loadClients
    component.onSearch([]);
    expect(component.loadClients).toHaveBeenCalled();
  });
});
