import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioComponent } from './formulario.component';
import { DatePipe } from '@angular/common';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioComponent],
      providers: [DatePipe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('FORMULARIO INPUTS VALIDOS', () => {
    spyOn(component.onSubmitForm, 'emit');

    component.productoForm.setValue({
      Id: '123',
      Nombre: 'Producto de prueba',
      Descripcion: 'Descripción del producto de prueba',
      Logo: 'logo.png',
      FechaLiberacion: '2023-11-01',
      FechaRevision: '2023-12-01',
    });

    component.submitForm();

    expect(component.onSubmitForm.emit).toHaveBeenCalledWith({
      id: '123',
      name: 'Producto de prueba',
      description: 'Descripción del producto de prueba',
      logo: 'logo.png',
      date_release: '2023-11-01',
      date_revision: '2023-12-01'
    });

  });

  it('FORMULARIO INPUTS INVALIDOS', () => {
    spyOn(component.onSubmitForm, 'emit');
  
    component.productoForm.setValue({
      Id: '',
      Nombre: 'Producto de prueba',
      Descripcion: 'Descripción del producto de prueba',
      Logo: 'logo.png',
      FechaLiberacion: '2023-11-01',
      FechaRevision: '2023-12-01',
    });

    component.submitForm();
  
    expect(component.onSubmitForm.emit).not.toHaveBeenCalled();
  });

});
