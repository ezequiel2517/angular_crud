import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  buttonActivo: string = "";

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
  }

  toProductos(): void {
    this.buttonActivo = "productos"
    this.router.navigate(['/productos']);
  }

  toRegistro(): void {
    this.buttonActivo = "crear"
    this.router.navigate(['/crear']);
  }

  toGithub(): void {
    window.open('https://github.com/ezequiel2517', "_blank");
  }

  isRouteActive(route: string): boolean {
    return this.router.isActive(route, false);
  }
}
