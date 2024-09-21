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

  routerLink(url: string, replace: boolean) {
    return this.router.navigate([url], { replaceUrl: replace })
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

  // ====================================== ERRORES ======================================
  getErrorMessage(errorCode: string){
    switch (errorCode) {
      case 'auth/weak-password':
        return 'La contraseña debe es muy débil, debe ser de 6 caracteres';
        break;
      case "auth/email-already-in-use":
        return "Ya existe una cuenta asociada al email ingresado";
        break;
      case "auth/invalid-credential":
        return "El correo/contraseña son incorrectos. Intentelo nuevamente";
        break;
      case "auth/too-many-requests":
        return "Ha excedido el limite de intentos. Intenlo de nuevo más tarde"
      default:
        return "Ha ocurrido un error. Intentelo de nuevo";
        break;
    }
  }
}