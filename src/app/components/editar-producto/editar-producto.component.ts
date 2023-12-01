import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiBancoService } from '../../services/api-banco.service';
import { Producto } from '../../models/producto';
import { ModalComponent } from '../modal/modal.component';
import { FormularioComponent } from '../formulario/formulario.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ModalComponent, FormularioComponent],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.scss'
})

export class EditarProductoComponent {
  producto: Producto;
  mostrarRespuesta: boolean = false;
  mRespuesta: string = "";

  constructor(private api: ApiBancoService) {
    this.producto = history.state;
  }

  handleFormSubmit(producto: Producto): void {
    console.log(producto);
    this.api.updateProducto(producto).subscribe(
      (res) => {
        this.mRespuesta = `Se actualizó el elemento de id: ${res.id}, con éxito`;
        this.mostrarRespuesta = true;
      },
      message => {
        this.mostrarRespuesta = true;
        this.mRespuesta = `Error al actualizar el elemento: ${message?.error}`;
      }
    );
  }

  onAceptar() : void {
    this.mostrarRespuesta = false;
  }

}