import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [MainComponent, SidebarComponent, NavbarComponent],
  imports: [CommonModule, RouterModule],
  exports: [MainComponent],
})
export class SharedModule {}
