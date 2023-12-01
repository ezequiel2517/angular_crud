import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})

export class ModalComponent {
  @Input() mostrarAceptar : boolean = true;
  @Input() mostrarCancelar : boolean = true;

  @Output() aceptarClicked = new EventEmitter<void>();
  @Output() cancelarClicked = new EventEmitter<void>();

  onAceptar() {
    this.aceptarClicked.emit();
  }

  onCancelar() {
    this.cancelarClicked.emit();
  }
}
