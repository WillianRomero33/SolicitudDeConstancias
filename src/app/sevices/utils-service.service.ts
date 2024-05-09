import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ModalController, ModalOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsServiceService {

  constructor(
    private http: HttpClient,
    private httpClient: HttpClientModule,
    private modalCtrl: ModalController
  ) { }

  getConstanciasPorMes(): any {
    return this.http.get('https://api.ejemplo.com/constancias/por-mes'); // URL de la API para datos por mes
  }

  getConstancias(page: number, pageSize: number): any {
    return this.http.get(`https://api.ejemplo.com/constancias?page=${page}&pageSize=${pageSize}`); // URL de la API para paginación
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
