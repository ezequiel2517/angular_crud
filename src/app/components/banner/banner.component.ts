import { Component, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  template: `<img [src]="logo" alt="Logo">`,
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  logo: string = 'assets/logo.png';

  constructor(private router: Router) { }

  toMenu() : void{
    this.router.navigate(["/menu"]);
  }
}
