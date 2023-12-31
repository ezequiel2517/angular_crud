import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { ApiBancoService } from '../../services/api-banco.service';
import { Producto } from '../../models/producto';
import { CargandoComponent } from '../cargando/cargando.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, CargandoComponent],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.scss'
})
export class ListadoProductosComponent implements OnInit {
  items: Producto[] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  filteredItems: Producto[] = [];
  searchTerm: string = '';
  totalPages: number = 0;
  cargando: boolean = true;
  mostrarError : boolean = false;
  mErrror : string = "";

  constructor(private cdr: ChangeDetectorRef, private api: ApiBancoService, private router: Router) {
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.totalPages = this.getTotalPages();
  }

  toProdcuto(item: Producto) : void {
    this.router.navigate(['editar'], {
      state: item,
    });
  }

  obtenerProductos(): void {
    setTimeout(() => {
      this.api.getProductos().subscribe(
        productos => {
          this.items = productos;
          this.filteredItems = this.items;
          this.cargando = false;
        }
      );
    }, 2000);

  }

  getItemsForPage(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredItems.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  filterItems(): void {
    // Verificar si searchTerm está vacío
    if (this.searchTerm.trim() === '') {
      // Si está vacío, mostrar todos los elementos sin filtrar
      this.filteredItems = this.items;
    } else {
      // Filtrar elementos según el término de búsqueda
      this.filteredItems = this.items.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // Reiniciar a la primera página después de aplicar el filtro
    this.currentPage = 1;

    // Recalcular el número total de páginas basado en la lista filtrada
    this.totalPages = this.getTotalPages();
  }

  eliminarItem(itemId: string): void {
    this.api.deleteProducto(itemId).subscribe(
      res => {
        if (res?.status===200) {
          this.items = this.items.filter(item => item.id !== itemId);
          this.filterItems();
          this.cdr.detectChanges();
        }
      },
      error => {
        if (error?.status===200) {
          this.items = this.items.filter(item => item.id !== itemId);
          this.filterItems();
          this.cdr.detectChanges();
        }
        else {        
            this.mostrarError=true;
            this.mErrror = `Error al crear el elemento: ${error?.error}`;
        }
      }
    );
  }

  mostrarPopupPorItem: { [key: string]: boolean } = {};

  mostrarPopup(itemId: string) {
    this.mostrarPopupPorItem[itemId] = true;
  }

  onAceptar(itemId: string) {
    this.eliminarItem(itemId);
    this.mostrarPopupPorItem[itemId] = false;
  }

  onCancelar(itemId: string) {
    this.mostrarPopupPorItem[itemId] = false;
  }

  onAceptarError(){
    this.mostrarError = false;
  }
}