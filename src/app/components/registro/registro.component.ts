import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiBancoService } from '../../services/api-banco.service';
import { Producto } from '../../models/producto';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  productoForm: FormGroup;

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
    console.log("gola")
    const producto: Producto = {
      id: this.productoForm.get('Id')?.value,
      name: this.productoForm.get('Nombre')?.value,
      description: this.productoForm.get('Descripcion')?.value,
      logo: this.productoForm.get('Logo')?.value,
      date_release: this.productoForm.get('FechaLiberacion')?.value,
      date_revision: this.productoForm.get('FechaRevision')?.value,
  };
    const datosJson = JSON.stringify(producto);
    console.log(datosJson);

    this.api.enviarDatos(datosJson).subscribe(
        response => {
            // Maneja la respuesta aquí
            console.log('Respuesta:', response);
        },
        error => {
            // Maneja los errores aquí
            console.error('Error al realizar la solicitud:', error);
        }
    );
}


  private validarCampo(min: number, max: number) {
    return (control: any) => {
      const largo: number = String(control.value).length;
      if (largo < min || largo > max) {
        return { invalidCampo: true };
      } else {
        return null;
      }
    };
  }

  private validarFecha(control: any) {
    const fecha = new Date(control.value);
    return !isNaN(fecha.getTime()) ? null : { invalidDate: true };
  }
}