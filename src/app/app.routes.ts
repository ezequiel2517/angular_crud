import { Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { AppComponent } from './app.component';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';

export const routes: Routes = [
    {path: "", redirectTo: "registro", pathMatch: "full"},
    {path: "registro", component: RegistroComponent},
    {path: "prueba", component: ListadoProductosComponent}
];
