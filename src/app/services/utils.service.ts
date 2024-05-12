import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertController, LoadingController, ModalController, ModalOptions, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {


  //para mostrar el error despues de itentar hacer un login
  toastCtrl = inject(ToastController);
  router = inject(Router);


  data: Proof
  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  alertCtrl = inject(AlertController);
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

  // Agregar métodos para las demás funcionalidades (enviar correo, editar, eliminar, registrar)
  enviarCorreo(constancia: any): any {
    // Implementar la lógica para enviar correo a la API
  }

  editarConstancia(constancia: any): any {
    // Implementar la lógica para editar la constancia en la API
  }

  eliminarConstancias(constancia: any): any {
    // Implementar la lógica para eliminar la constancia en la API
  }



}
