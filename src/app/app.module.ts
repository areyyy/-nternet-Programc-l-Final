import { KayitOlComponent } from './components/kayitOl/kayitOl.component';
import { KayitlarComponent } from './components/kayitlar/kayitlar.component';
import { environment } from './../environments/environment';
import { HomeComponent } from './components/home/home.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { GirisYapComponent } from './components/girisYap/girisYap.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    KayitlarComponent,
    GirisYapComponent,
    KayitOlComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
