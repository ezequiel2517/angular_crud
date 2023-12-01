import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';



@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './banner.component.html',
  template: `<img [src]="logo" alt="Logo">`,
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  logo: string = 'assets/logo.png';

  constructor(private router: Router) { }

  toMenu() : void{
    this.router.navigate(["/productos"]);
  }
}
