import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiBancoService } from '../../services/api-banco.service';
import { Producto } from '../../models/producto';
import { ButtonComponent } from '../button/button.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, ModalComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {
  productoForm: FormGroup;
  mostrarRespuesta: boolean = false;
  mRespuesta : string = "";

  private validarCampo(min: number, max: number) {
    return (control: any) => {
      const largo: number = String(control.value).length;
      if (largo < min || largo > max)
        return { invalidCampo: true };
      else
        return null;
    };
  }

  private validarFecha(control: any) {
    const fecha = new Date(control.value);
    const esFechaValida = !isNaN(fecha.getTime());
    const esFormatoCorrecto = /^\d{4}-\d{2}-\d{2}$/.test(control.value);
  
    return esFechaValida && esFormatoCorrecto ? null : { invalidDate: true };
  }

  constructor(private fb: FormBuilder, private api: ApiBancoService) {
    this.productoForm = this.fb.group({
      Id: ["", this.validarCampo(3, 10)],
      Nombre: ["", this.validarCampo(5, 100)],
      Descripcion: ["", this.validarCampo(10, 200)],
      Logo: ["", [Validators.required]],
      FechaLiberacion: ["", [Validators.required, this.validarFecha]],
      FechaRevision: ["", [Validators.required, this.validarFecha]]
    });
  }

  onSubmit() {
    const producto: Producto = {
      id: this.productoForm.get('Id')?.value,
      name: this.productoForm.get('Nombre')?.value,
      description: this.productoForm.get('Descripcion')?.value,
      logo: this.productoForm.get('Logo')?.value,
      date_release: this.productoForm.get('FechaLiberacion')?.value,
      date_revision: this.productoForm.get('FechaRevision')?.value,
    };

    const productoJson = JSON.stringify(producto);

    this.api.enviarDatos(productoJson).subscribe(
      (res) => {
        this.mRespuesta = `Se creó el elemento de id: ${res.id}, con éxito`;
        this.mostrarRespuesta=true;
        this.productoForm.reset();
      },
      message => {
        this.mostrarRespuesta=true;
        this.mRespuesta = `Error al crear el elemento: ${message?.error}`;
      }
    );
  }

  onAceptar(){
    this.mostrarRespuesta = false;
  }
}