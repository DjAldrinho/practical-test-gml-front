import { TestBed } from '@angular/core/testing';
import { ClientServiceService } from './client-service.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  ClientResponse,
  CreateClientRequest,
  SearchRequest,
} from '../models/client.model';
import { environment } from '../../../environments/environment';
import { provideHttpClient } from '@angular/common/http';

describe('ClientServiceService', () => {
  let service: ClientServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ClientServiceService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(ClientServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all clients', () => {
    const mockResponse: ClientResponse = {
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
    };

    service.getClients().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/clients`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should search clients', () => {
    const searchRequest: SearchRequest = {
      param: 'email',
      value: 'test@example.com',
    };
    const mockResponse: ClientResponse = {
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
      message: 'Search results',
    };

    service.searchClients(searchRequest).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/clients/search`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(searchRequest);
    req.flush(mockResponse);
  });

  it('should export clients to CSV', () => {
    const mockBlob = new Blob(['csv content'], { type: 'text/csv' });

    service.exportClients().subscribe((response) => {
      expect(response).toEqual(mockBlob);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/clients/export-csv`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBlob);
  });

  it('should create a new client', () => {
    const newClient: CreateClientRequest = {
      businessId: 'BID123',
      sharedKey: 'sharedKey123',
      email: 'newclient@example.com',
      phone: '0987654321',
    };
    const mockResponse: ClientResponse = {
      data: [
        {
          id: 2,
          businessId: 'BID123',
          sharedKey: 'sharedKey123',
          email: 'newclient@example.com',
          phone: '0987654321',
          dataAddedFormatted: '2024-08-02',
        },
      ],
      message: 'Client created successfully',
    };

    service.createClient(newClient).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/clients`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newClient);
    req.flush(mockResponse);
  });
});
