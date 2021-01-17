import { Uye } from './../models/uye';
import { Kayit } from './../models/kayit';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFireUploadTask } from '@angular/fire/storage/task';
import { KiraDurumu } from '../models/kiraDurumu';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FbServisService {

  kayitRef: AngularFireList<Kayit> = null;
  kiraDurumRef: AngularFireList<KiraDurumu> = null;
  uyeRef: AngularFireList<Uye> = null;
  resimRef: AngularFireStorageReference;
  private dbKayit = '/Araçlar';
  private dbUye = '/Uyeler';
  private dbKiraDurum = '/KiraDurumu';

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public storage: AngularFireStorage
  ) {
    this.kayitRef = db.list(this.dbKayit);
    this.kiraDurumRef = db.list(this.dbKiraDurum);
    this.uyeRef = db.list(this.dbUye);
    this.resimRef = this.storage.ref('/Arac Resim');
  }

  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }

  DosyaGetir(kayit: Kayit) {
    return this.resimRef.child(kayit.key).getDownloadURL();
  }

  DosyaYukle(kayitKey: string, file): AngularFireUploadTask {
    const storageRef: AngularFireStorageReference = this.resimRef.child(kayitKey);
    return storageRef.put(file);
  }

  OturumKapat() {
    return this.afAuth.signOut();
  }

  UyeOl(uye: Uye) {
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
  }

  KayitListele(uye: Uye) {
    return this.db.list(this.dbKayit, ref => uye ? ref.orderByChild('kayUyeMail').equalTo(uye.mail) : ref) as AngularFireList<Kayit>;
  }

  KiraDurumListele() {
    return this.db.list(this.dbKiraDurum) as AngularFireList<KiraDurumu>;
  }

  KayitEkle(kayit: Kayit) {
    return this.kayitRef.push(kayit);
  }

  KiraDurumEkle(kiraDurumu: KiraDurumu) {
    return this.kiraDurumRef.push(kiraDurumu);
  }


  KayitDuzenle(kayit: Kayit) {
    return this.kayitRef.update(kayit.key, kayit);
  }

  KayitSil(key: string) {
    return this.kayitRef.remove(key);
  }

  UyeEkle(uye: Uye) {
    return this.uyeRef.push(uye);
  }

}
