export interface Client {
  id: number;
  businessId: string;
  sharedKey: string;
  email: string;
  phone: string;
  dataAddedFormatted: string;
}

export interface ClientResponse {
  data: Client[];
  message: string;
}

export interface CreateClientRequest {
  businessId: string;
  sharedKey: string;
  email: string;
  phone: string;
}

export interface SearchRequest {
  param: string;
  value: string;
  value2?: string;
}

