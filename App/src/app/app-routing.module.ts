import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrijavaComponent } from './prijava/prijava.component';
import { PodaciOKorisnikuComponent } from './podaci-okorisniku/podaci-okorisniku.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';


const routes: Routes = [
  {path:"", component:PrijavaComponent},
  {path:"oKorisniku",component:PodaciOKorisnikuComponent},
  {path:"adminPanel", component:AdminPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
