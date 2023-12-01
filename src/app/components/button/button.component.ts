import { Component, ElementRef, Input, Renderer2, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent implements OnChanges {
  @Input() disponible: boolean = false;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  @Input() set tipo(value: string) {
    const buttonElement = this.el.nativeElement.querySelector('button');
    this.renderer.setAttribute(buttonElement, 'type', value);
  }

  ngOnChanges(changes: any): void {
    if (changes.disponible) {
      const buttonElement = this.el.nativeElement.querySelector('button');
      if (this.disponible)
        this.renderer.removeAttribute(buttonElement, 'disabled')
      else
        this.renderer.setAttribute(buttonElement, 'disabled', '');
      this.renderer.setStyle(buttonElement, 'opacity', this.disponible == true ? '1' : '0.4');
    }
  }
}
