import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MODEL_LAYOUT_ROUTE } from './routes/model-layout-routes';
import { MainComponent } from './shared/pages/main/main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'module',
    pathMatch: 'full',
  },
  {
    path: 'module',
    component: MainComponent,
    children: MODEL_LAYOUT_ROUTE,
  },
  { path: '**', redirectTo: 'module' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
