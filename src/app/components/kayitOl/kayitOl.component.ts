import { Router } from '@angular/router';
import { Uye } from './../../models/uye';
import { Sonuc } from './../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { FbServisService } from 'src/app/services/fbServis.service';

@Component({
  selector: 'kayitOl',
  templateUrl: './kayitOl.component.html',
  styleUrls: ['./kayitOl.component.css']
})
export class KayitOlComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();
  secUye: Uye = new Uye();
  constructor(
    public fbServis: FbServisService,
    public router:Router
  ) { }

  ngOnInit() {
  }

  KayitYap(){
    this.fbServis.UyeOl(this.secUye).then(d =>{
      d.user.updateProfile({
        displayName: this.secUye.adsoyad
      }).then();
      this.secUye.uid = d.user.uid;
      localStorage.setItem("user", JSON.stringify(d.user));
      this.UyeEkle();
    }, err => {
      this.sonuc.islem = false;
      this.sonuc.mesaj ="hata oluştu tekrar deneyiniz";
    });
  
  }
    
  UyeEkle(){
    this.fbServis.UyeEkle(this.secUye).then(d=>{
      this.router.navigate(['/'])
    })
  }

}


