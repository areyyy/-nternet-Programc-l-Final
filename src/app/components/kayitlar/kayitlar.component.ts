import { Kayit } from './../../models/kayit';
import { FbServisService } from './../../services/fbServis.service';
import { Sonuc } from './../../models/sonuc';
import { Component, OnInit } from '@angular/core';

import { map } from 'rxjs/operators';
import { Uye } from '../../models/uye';
import { Router } from '@angular/router';
import { KiraDurumu } from '../../models/kiraDurumu';

@Component({
  selector: 'app-kayitlar',
  templateUrl: './kayitlar.component.html',
  styleUrls: ['./kayitlar.component.css']
})
export class KayitlarComponent implements OnInit {
  kayitlar: Kayit[] = [];
  secKayit: Kayit = new Kayit();
  sonuc: Sonuc = new Sonuc();
  uye: Uye = new Uye();
  secResim;

  constructor(
    private router: Router,
    public fbServis: FbServisService
  ) {
  }

  ngOnInit() {
    this.SuankiUyeyiGetir();
    this.KayitListele();
    this.secKayit.key = null;
  }

  DosyaSec(event) {
    this.secResim = event.target.files[0];
  }

  KayitListele() {
    this.fbServis.KayitListele(this.uye).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.kayitlar = data.filter(x => x.marka != null);
      if (this.kayitlar && this.kayitlar.length > 0) {
        this.fbServis.KiraDurumListele().snapshotChanges().pipe(
          map(changes =>
            changes.map(c =>
              ({ key: c.payload.key, ...c.payload.val() })
            )
          )
        ).subscribe(result => {
          for (let i = 0; i < this.kayitlar.length; i++) {
            let durum = result.find(x => x.modelKey == this.kayitlar[i].key);
            this.kayitlar[i].kiraDurum = durum && durum.kiraDurum;
            this.fbServis.DosyaGetir(this.kayitlar[i]).subscribe(dosya => {
              this.kayitlar[i].resim = dosya;
            });
          }
        });
      }
    });
  }

  KayitDuzenle(kayit: Kayit) {
    Object.assign(this.secKayit, kayit);
  }

  KayitSil(kayit: Kayit) {
    this.fbServis.KayitSil(kayit.key).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = 'Kayıt Silindi';
    });
  }

  Kirala(kiraDurumu, modelKey: string) {
    let kiraDurum = new KiraDurumu();
    if (kiraDurumu = undefined) {
      kiraDurum.kiraDurum = false;
    } else {
      kiraDurum.kiraDurum = !kiraDurumu;
    }
    kiraDurum.modelKey = modelKey;

    this.fbServis.KiraDurumEkle(kiraDurum);
  }

  async Kaydet() {
    const tarih = new Date();
    this.secKayit.duzTarih = tarih.getTime().toString();
    this.secKayit.kiraDurum = false;
    if (this.secKayit.key == null) {
      this.secKayit.ilanTarih = tarih.getTime().toString();
      this.secKayit.kayUyeMail = this.uye.mail;
      await this.fbServis.KayitEkle(this.secKayit).then((data) => {
        this.secKayit.key = data.key;
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Kayıt Eklendi';
      });
    } else {
      await this.fbServis.KayitDuzenle(this.secKayit).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Kayıt Düzenlendi';
      });
    }
    this.DosyaYukle();
  }

  DosyaYukle() {
    this.fbServis.DosyaYukle(this.secKayit.key, this.secResim).then((result => {
      result.ref.getDownloadURL().then(url => {
        this.secKayit.resim = url;
        this.kayitlar[0].resim = url;
      });
    }));
  }

  Vazgec() {
    this.secKayit = new Kayit();
    this.secKayit.key = null;
  }

  SuankiUyeyiGetir() {
    this.uye = undefined;
    const uyeJson = JSON.parse(localStorage.getItem('user'));
    if (uyeJson) {
      this.uye = new Uye();
      this.uye.mail = uyeJson.email;
      this.uye.adsoyad = uyeJson.displayName;
    }
  }

  GirisYap() {
    this.router.navigate(['/girisYap']);
  }

  CikisYap() {
    this.uye = undefined;
    this.fbServis.OturumKapat().then(result => {
      localStorage.removeItem('user');
      this.router.navigate(['/']);
    });
  }
}
