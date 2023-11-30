import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  logo: string = 'assets/logo_02.png';

  constructor(private router: Router) { }

  toProductos(): void {
    this.router.navigate(['/productos']);
  }

  toRegistro(): void {
    this.router.navigate(['/registro']);
  }

  toGithub(): void {
    window.location.href = 'https://github.com/ezequiel2517'
  }

}
