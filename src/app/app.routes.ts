import { Routes } from '@angular/router';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';

export const routes: Routes = [
    {path: "editar", component: EditarProductoComponent},
    {path: "crear", component: CrearProductoComponent},
    {path: "productos", component: ListadoProductosComponent},
    {path: "", redirectTo: "productos", pathMatch: "full"}
];
