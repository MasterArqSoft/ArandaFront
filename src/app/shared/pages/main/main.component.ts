import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  @ViewChild('wrapper') wrapperMenuToggle!: ElementRef<any>;
  constructor() {}

  onMenuToggle(toggled: any) {
    this.wrapperMenuToggle.nativeElement.classList.toggle(toggled);
  }
}
