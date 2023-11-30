import { Routes } from '@angular/router';
import { RegistroComponent } from './components/registro/registro.component';
import { ListadoProductosComponent } from './components/listado-productos/listado-productos.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
    {path: "", redirectTo: "menu", pathMatch: "full"},
    {path: "menu", component: MenuComponent},
    {path: "registro", component: RegistroComponent},
    {path: "productos", component: ListadoProductosComponent}
];
