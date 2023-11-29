import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-listado-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.css'
})
export class ListadoProductosComponent {
  items: any[] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  filteredItems: any[] = [];
  searchTerm: string = '';
  totalPages: number = 0;

  constructor(private cdr: ChangeDetectorRef) {
    for (let i = 1; i <= 50; i++) {
      this.items.push(
        {
          "id": `12sdss3`,
          "name": `231saa${i}`,
          "description": "dadsa",
          "logo": "https://sitechecker.pro/wp-content/uploads/2023/05/URL-meaning.jpg",
          "date_release": "2023-11-11T00:00:00.000+00:00",
          "date_revision": "2024-11-11T00:00:00.000+00:00"
        }
      );
    }
    this.filteredItems = this.items;
    this.totalPages = this.getTotalPages();
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

  eliminarItem(item: any): void {
  // Aquí debes implementar la lógica para eliminar el elemento
  // por ejemplo, puedes filtrar la lista de items para quitar el elemento a eliminar
  this.items = this.items.filter(i => i !== item);
  this.filterItems();
  this.cdr.detectChanges();
  // También podrías realizar una llamada a un servicio para eliminar el elemento en tu backend
}
}