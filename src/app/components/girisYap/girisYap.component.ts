import {Sonuc} from './../../models/sonuc';
import {FbServisService} from './../../services/fbServis.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'girisYap',
  templateUrl: './girisYap.component.html',
  styleUrls: ['./girisYap.component.css']
})
export class GirisYapComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();
  loading = false;
  constructor(
    public fbServis: FbServisService,
    public router: Router
  ) {
  }

  ngOnInit() {
  }

  GirisYap(mail: string, parola: string) {
    this.loading = true;
    this.fbServis.OturumAc(mail, parola).then(d => {
      localStorage.setItem('user', JSON.stringify(d.user));
      this.loading = false;
      this.router.navigate(['/']);
    }, err => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = 'E-Posta veya Parola Hatalı!..';
      this.loading = false;
    });
  }
}
