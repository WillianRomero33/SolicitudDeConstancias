import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }
  
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
