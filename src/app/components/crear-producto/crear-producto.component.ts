import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiBancoService } from '../../services/api-banco.service';
import { Producto } from '../../models/producto';
import { ModalComponent } from '../modal/modal.component';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [CommonModule, FormularioComponent, ModalComponent],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss'
})
export class CrearProductoComponent {
  producto: Producto;
  mostrarRespuesta: boolean = false;
  mRespuesta: string = "";

  constructor(private api: ApiBancoService) {
    this.producto = history.state;
  }

  handleFormSubmit(producto: Producto): void {
    this.api.crearProducto(producto).subscribe(
      (res) => {
        this.mRespuesta = `Se creó el elemento de id: ${res.id}, con éxito`;
        this.mostrarRespuesta = true;
      },
      message => {
        this.mostrarRespuesta = true;
        this.mRespuesta = `Error al crear el elemento: ${message?.error}`;
      }
    );
  }

  onAceptar() : void {
    this.mostrarRespuesta = false;
  }

}
