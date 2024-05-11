import { Injectable, inject } from '@angular/core';
import { Proof } from '../models/proof.model';
import { AlertController, AlertOptions, LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  data: Proof
  loadingCtrl = inject(LoadingController)
  toastCtrl = inject(ToastController)
  alertCtrl = inject(AlertController)
  router = inject(Router)

  routerLink(url: string) {
    return this.router.navigateByUrl(url)
  }

  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' })
  }

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts)
    await toast.present()
  }

  async presentAlert(opts?: AlertOptions) {
    const alert = await this.alertCtrl.create(opts)
    await alert.present()
  }

  // --------- FUNCIONES DEL LOCAL STORAGE ---------
  setInLocalStorage(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  getFromLocalStorage(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  deleteFromLocalStorage(key: string) {
    return localStorage.removeItem(key)
  }

  // --------- GET Y SET DEL MES ---------
  setData(data: Proof) {
    this.data = data
  }

  getData() {
    return this.data as Proof
  }

  deleteData() {
    this.data = null
  }
}