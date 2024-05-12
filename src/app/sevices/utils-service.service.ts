import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AlertController, LoadingController, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsServiceService {

  loadingCtrl = inject(LoadingController);

  //para mostrar el error despues de itentar hacer un login
  toastCtrl = inject(ToastController);
  router = inject(Router);
  alertCtrl = inject(AlertController);

  constructor(
    private http: HttpClient,
    //private httpClient: HttpClientModule,
    private modalCtrl: ModalController
  ) { }

  getConstanciasPorMes(): any {
    //return this.http.get('https://api.ejemplo.com/constancias/por-mes'); // URL de la API para datos por mes
  }

  getConstancias(page: number, pageSize: number): any {
    //return this.http.get(`https://api.ejemplo.com/constancias?page=${page}&pageSize=${pageSize}`); // URL de la API para paginación
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


  // ========= loading =========
  loading() {
    return this.loadingCtrl.create({ spinner: 'crescent' });
  }

    //========== Toasts =========
    async presentToast(opts?: ToastOptions) {
      const toast = await this.toastCtrl.create(opts);
      toast.present();
    }



}
