import { KayitOlComponent } from './components/kayitOl/kayitOl.component';

import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { HomeComponent } from './components/home/home.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GirisYapComponent } from './components/girisYap/girisYap.component';




const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'kayitlar', component: KayitlarComponent },
  { path: 'girisYap', component: GirisYapComponent },
  { path: 'kayitOl', component: KayitOlComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
