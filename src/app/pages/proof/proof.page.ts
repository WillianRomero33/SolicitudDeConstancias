import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { Proof } from 'src/app/models/proof.model';

@Component({
  selector: 'app-proof',
  templateUrl: './proof.page.html',
  styleUrls: ['./proof.page.scss'],
})
export class ProofPage implements OnInit {

    // Propiedades para el gráfico
    graficoConstancias: any;
    constanciasData: any = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [{
        label: 'Constancias Activas',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }, {
        label: 'Constancias Inactivas',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]

    };

     // Propiedades para la lista de constancias
  constancias: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  constanciasPerPage: number = 8; // Número de constancias por página



  constructor(
    private utilsSvc: UtilsService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.cargarGrafico()
    this.cargarConstancias();
  }

  cargarGrafico(): void {
    const ctx = document.getElementById('grafico-constancias') as HTMLCanvasElement;
    this.graficoConstancias = new Chart(ctx, {
      type: 'bar', // Tipo de gráfico (bar, line, etc.)
      data: this.constanciasData,
      options: {
        scales: {
          y: {
            beginAtZero: true,

          }
        }
      }
    });

    // Cargar datos del gráfico desde el servicio (ejemplo)
    this.utilsSvc.getConstanciasPorMes().subscribe((data: any) => {
      this.constanciasData.datasets[0].data = data.activas;
      this.constanciasData.datasets[1].data = data.inactivas;
      this.graficoConstancias.update(); // Actualizar el gráfico
    });
  }

  cargarConstancias(): void {
    this.utilsSvc.getConstancias(this.currentPage, this.constanciasPerPage)
      .subscribe((data: any) => {
        this.constancias = data.constancias;
        this.totalPages = data.totalPages;
      });
  }

  swipe(constancia: any): void {
    console.log('Swipe event on constancia:', constancia); // Implementar la lógica para mostrar/ocultar botones
  }

  enviarCorreo(constancia: any): void {
    console.log('Enviar correo a:', constancia.correo); // Implementar la lógica para enviar correo
  }

  editarConstancia(constancia: any): void {
    console.log('Editar constancia:', constancia.id); // Implementar la lógica para editar constancia
  }

  eliminarConstancia(constancia: any): void {
    console.log('Eliminar constancia:', constancia.id); // Implementar la lógica para eliminar constancia
  }

  registrarConstancia() {
  //this.router.navigateByUrl('/src/app/pages/proof');
    this.router.navigateByUrl('/proof/record-proof');
  }

  // onPageChange(event: any): void {
  //   this.currentPage = event.detail.page;
  //   this.cargarConstancias();
  // }




}
  


