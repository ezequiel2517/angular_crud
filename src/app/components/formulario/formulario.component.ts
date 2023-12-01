import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../models/producto';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss'
})
export class FormularioComponent implements OnInit {
  @Input() produto!: Producto;
  productoForm!: FormGroup;
  fechaRevisionFormated!: string | null;
  fechaLiberacionFormated!: string | null;

  @Output() onSubmitForm = new EventEmitter<Producto>();

  constructor(private fb: FormBuilder, private datePipe: DatePipe) {
  }

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

  ngOnInit(): void {
    this.produto = history.state;
    this.fechaLiberacionFormated = this.datePipe.transform(this.produto?.date_release, 'yyyy-MM-dd');
    this.fechaRevisionFormated = this.datePipe.transform(this.produto?.date_revision, 'yyyy-MM-dd');

    this.productoForm = this.fb.group({
      Id: [this.produto?.id, this.validarCampo(3, 10)],
      Nombre: [this.produto?.name, this.validarCampo(5, 100)],
      Descripcion: [this.produto?.description, this.validarCampo(10, 200)],
      Logo: [this.produto?.logo, [Validators.required]],
      FechaLiberacion: [this.fechaLiberacionFormated, [Validators.required, this.validarFecha]],
      FechaRevision: [this.fechaRevisionFormated, [Validators.required, this.validarFecha]]
    });
  }

  fechaRevision(): void {
    const fechaLiberacion = this.productoForm.get('FechaLiberacion')?.value;
    if (!this.productoForm.get('FechaLiberacion')?.hasError('invalidDate')) {
      const fechaCalculada = new Date(fechaLiberacion);
      fechaCalculada.setFullYear(fechaCalculada.getFullYear() + 1);
      this.productoForm.get('FechaRevision')?.setValue(fechaCalculada.toISOString().split('T')[0]);
    }
  }

  submitForm(): void {
    if (this.productoForm.valid) {
      const producto: Producto = {
        id: this.productoForm.value?.Id,
        name: this.productoForm.value?.Nombre,
        description: this.productoForm.value?.Descripcion,
        logo: this.productoForm.value?.Logo,
        date_release: this.productoForm.value?.FechaLiberacion,
        date_revision: this.productoForm.value?.FechaRevision
      }
      this.onSubmitForm.emit(producto);
    }
  }
}