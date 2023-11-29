import { Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';

export const routes: Routes = [
    {path: "", redirectTo: "productos", pathMatch: "full"},
    {path: "registro", component: RegistroComponent},
    {path: "productos", component: ListadoProductosComponent}
];
