import {
  Component,
  EventEmitter,
  inject,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ClientServiceService } from '../../services/client-service.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgbAlertModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel-buttons',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbAlertModule],
  templateUrl: './panel-buttons.component.html',
  styleUrl: './panel-buttons.component.scss',
})
export class PanelButtonsComponent {
  private modalService = inject(NgbModal);
  createClientForm: FormGroup;

  successMessage = '';
  errorMessage = '';

  @Output() clientCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private clientService: ClientServiceService,
    private fb: FormBuilder
  ) {
    this.createClientForm = this.fb.group({
      businessId: ['', Validators.required],
      sharedKey: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  //Exportar clientes
  exportClients(): void {
    this.clientService.exportClients().subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'clients.csv';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  //Crear cliente
  createClient(modal: any): void {
    if (this.createClientForm.valid) {
      this.clientService.createClient(this.createClientForm.value).subscribe(
        (response) => {
          this.successMessage = 'Client created:';
          console.log('Client created:', response);
          this.clientCreated.emit(); // Emitir el evento cuando se cree el cliente
          console.log(modal);
          modal.close();
          this.createClientForm.reset();
        },
        (error) => {
          console.log('Error', error);
          this.errorMessage = error.error.message;
        }
      );
    }
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          console.log(result);
        },
        (reason) => {
          console.log(reason);
        }
      );
  }
}
