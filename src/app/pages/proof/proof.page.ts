import { Component, OnInit, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { Proof } from 'src/app/models/proof.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { count, orderBy } from 'firebase/firestore';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-proof',
  templateUrl: './proof.page.html',
  styleUrls: ['./proof.page.scss'],
})
export class ProofPage implements OnInit {

  constructor(
    private utilsSvc: UtilsService,
    private firebaseSvc: FirebaseService,
    private router: Router,
  ) { }

  // FORM DE FILTRO POR MES
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  currentDate = new Date()
  form = new FormGroup({
    month: new FormControl('Todos'),
    year: new FormControl(this.currentDate.getFullYear())
  });

  // Propiedades para el gráfico
  label: any = null
  graficoConstancias: any;
  constanciasData: any = {};
  monthCountTrue = []
  monthCountFalse = []

  // Propiedades para la lista de constancias
  constancias: Proof[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  constanciasPerPage: number = 8; // Número de constancias por página


  ngOnInit() {

  }
  ionViewWillEnter() {
    this.getConstancias()
  }

  ionViewWillLeave() {
    this.graficoConstancias.destroy()
  }

  // OBTIENE EL LABEL ELEGIDO PARA EL GRAFICO
  getLabel() {
    if (this.form.value.month == "Todos") {
      this.label = this.meses
    } else {
      this.label = this.form.value.month
    }
    console.log(this.label);
  }

  // RENDERIZAR GRAFICO
  cargarGrafico() {
    this.setGraphicData()
    const ctx = document.getElementById('grafico-constancias') as HTMLCanvasElement;
    this.graficoConstancias = new Chart(ctx, {
      type: 'bar', // Tipo de gráfico (bar, line, etc.)
      data: this.constanciasData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        }
      }
    });
  }

  // OBTIENE TODAS LAS CONSTRANCIAS
  getConstancias() {
    let path = `proofs`
    let query = [
      orderBy('createdAt', 'asc')
    ]

    let sub = this.firebaseSvc.getCollectionData(path, query).subscribe((data: any) => {
      this.constancias = data
      console.log(this.constancias);
      sub.unsubscribe()
      this.getLabel()
      this.cargarGrafico()
    });
  }

  // OBTIENE EL MES Y AÑO DE CREATEDAT DE CADA CONSTANCIA
  getCountByMonth() {
    const countByMonthTrue = {}
    const countByMonthFalse = {}
    for (let month = 0; month < 12; month++) {
      const monthYear = `${month}-${this.form.value.year}`
      countByMonthTrue[monthYear] = 0
      countByMonthFalse[monthYear] = 0
    }


    // OBTENEMOS EL MES Y AÑO DEL ATRIBUTO CREATED AT
    this.constancias.forEach(constancia => {
      const createdAt = new Date(constancia.createdAt)
      const monthYear = `${createdAt.getMonth()}-${createdAt.getFullYear()}`
      if (constancia.status) {
        countByMonthTrue[monthYear]++
        console.log(countByMonthTrue);

      } else {
        countByMonthFalse[monthYear]++
        console.log(countByMonthFalse);

      }
    })

    this.monthCountTrue = Object.values(countByMonthTrue)
    this.monthCountFalse = Object.values(countByMonthFalse)
    console.log(this.monthCountTrue);
    console.log(this.monthCountFalse);
  }

  setGraphicData() {
    this.getCountByMonth()
    this.constanciasData = {
      labels: this.meses,
      datasets: [{
        label: 'Constancias Activas',
        data: this.monthCountTrue,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }, {
        label: 'Constancias Inactivas',
        data: this.monthCountFalse,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    }

  }












  swipe(constancia: any): void {
    console.log('Swipe event on constancia:', constancia); // Implementar la lógica para mostrar/ocultar botones
  }

  enviarCorreo(constancia: any): void {
    console.log('Enviar correo a:', constancia.correo); // Implementar la lógica para enviar correo
  }

  editarConstancia(url: string, proof: Proof) {
    this.utilsSvc.setData(proof as Proof)
    this.utilsSvc.routerLink(url)
  }

  // -------- ELIMINACION DE UNA CONTANCIA
  async confirmDeleteProof(proof: Proof) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar contancia!',
      message: '¿Quieres eliminar esta consntacia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteProof(proof);
          }
        }
      ]
    })
  }

  async deleteProof(proof: Proof) {
    let path = `proofs/${proof.id}`

    const loading = await this.utilsSvc.loading()
    await loading.present()

    this.firebaseSvc.deleteDocument(path).then(async res => {
      this.utilsSvc.presentToast({
        message: "Contancia eliminada exitosamente",
        duration: 1500,
        icon: 'checkmark-circle-outline',
        color: 'success',
        position: 'middle'
      })
    }).catch(error => {
      console.log(error)
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        icon: 'alert-circle-outline',
        color: 'danger',
        position: 'middle'
      })
    }).finally(() => {
      loading.dismiss()
      this.getConstancias()
    })
  }

  registrarConstancia() {
    this.router.navigateByUrl('/proof/record-proof');
  }
}


