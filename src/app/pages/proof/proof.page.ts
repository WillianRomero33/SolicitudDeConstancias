import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UtilsService } from 'src/app/services/utils.service';
import { Proof } from 'src/app/models/proof.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { orderBy } from 'firebase/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { Platform } from '@ionic/angular';
// PDF
import { FileOpener } from "@awesome-cordova-plugins/file-opener";
import { File } from "@awesome-cordova-plugins/file";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// EMAIL
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-proof',
  templateUrl: './proof.page.html',
  styleUrls: ['./proof.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProofPage implements OnInit {
  
  user: User
  loading: boolean = false
  pdfObj: any
  page: number = 1
  constructor(
    private utilsSvc: UtilsService,
    private firebaseSvc: FirebaseService,
    private emailComposer: EmailComposer,
    private platform: Platform
  ) {
    this.user = this.utilsSvc.getFromLocalStorage('user')
    for (let year = this.currentDate.getFullYear(); year >= this.minYear; year--) {
      this.years.push(year)
    }
  }

  // FORM DE FILTRO POR MES
  years = []
  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  currentDate = new Date()
  minYear = 2020
  form = new FormGroup({
    month: new FormControl('Todos'),
    year: new FormControl<number>(this.currentDate.getFullYear())
  });

  // Propiedades para el gráfico
  label: any = null
  graficoConstancias: any;
  constanciasData: any = {};
  monthCountTrue = []
  monthCountFalse = []

  // Propiedades para la lista de constancias
  constancias: Proof[] = []
  proofs: Proof[] = []

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getConstancias()
  }

  ionViewWillLeave() {
    this.graficoConstancias.destroy()
  }

  // OBTIENE TODAS LAS CONSTRANCIAS
  getConstancias() {
    this.loading = true
    let path = `proofs`
    let query = [orderBy('createdHour', 'desc')]

    let sub = this.firebaseSvc.getCollectionData(path, query).subscribe((data: any) => {
      this.proofs = data
      sub.unsubscribe()
      this.getFilteredProofs()
      this.getLabel()
      this.cargarGrafico()
      this.loading = false
    });
  }

  // OBTENER NUEVO ARRAY DE CONSTANCIAS CON FILTRO
  getFilteredProofs() {
    if (this.form.value.month !== "Todos") {
      // OBTENER EL MES Y AÑO DE CREATED AT
      const monthObject = this.proofs.map(constancia => {
        const createdAt = new Date(constancia.createdAt);
        const monthYear = `${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`;
        return { monthYear, constancia };
      })
      this.constancias = monthObject
        .filter(data => data.monthYear === `${this.form.value.month + 1}-${this.form.value.year}`)
        .map(filteredData => filteredData.constancia)
    } else {
      // OBTENER EL MES Y AÑO DE CREATED AT
      const monthObject = this.proofs.map(constancia => {
        const createdAt = new Date(constancia.createdAt);
        const monthYear = `${createdAt.getFullYear()}`;
        return { monthYear, constancia };
      })
      this.constancias = monthObject
        .filter(data => data.monthYear === `${this.form.value.year}`)
        .map(filteredData => filteredData.constancia)
    }   
  }

  // OBTIENE EL LABEL ELEGIDO PARA EL GRAFICO
  getLabel() {
    if (this.form.value.month == "Todos") {
      this.label = this.meses
    } else {
      this.label = [this.meses[this.form.value.month]]
    }
  }

  // RENDERIZAR GRAFICO
  cargarGrafico() {
    this.setGraphicData()
    const ctx = document.getElementById('grafico-constancias') as HTMLCanvasElement;
    this.graficoConstancias = new Chart(ctx, {
      type: 'bar',
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

  // SETEA LA INFORMACION QUE IRA EN EL GRAFICO
  setGraphicData() {
    this.getCountByMonth()
    this.constanciasData = {
      labels: this.label,
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

  // OBTIENE EL MES Y AÑO DE CREATEDAT DE CADA CONSTANCIA
  getCountByMonth() {
    const countByMonthTrue = {}
    const countByMonthFalse = {}
    // OBTENER UN OBEJTO PARA ACTIVOS E INACTIVOS CON TODOS LOS MESES DEL AÑO CON CONTEO INIZIALIZADO A 0
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
      } else {
        countByMonthFalse[monthYear]++
      }
    })

    this.monthCountTrue = Object.values(countByMonthTrue)
    this.monthCountFalse = Object.values(countByMonthFalse)

    if (this.form.value.month !== "Todos") {
      this.monthCountTrue = [this.monthCountTrue[this.form.value.month]]
      this.monthCountFalse = [this.monthCountFalse[this.form.value.month]]
    }
  }

  // REFRESCAR GRAFICO Y SOLICITUDES CON FILTRO DE MES Y AÑO
  filterGraphic() {
    this.graficoConstancias.destroy()
    this.page = 1
    this.getFilteredProofs()
    this.getLabel()
    this.cargarGrafico()    
  }

  // ENVIAR CORREO
  async sendMail(constancia: Proof) {
    let email = {
      to: constancia.email,
      cc: '',
      bcc: [],
      attachments: [],
      subject: 'Constancia lista',
      body: `Le informamos que su constancias de ${constancia.type} ya esta lista`,
      isHtml: false
    }
    // URL personalizada de Gmail con los parámetros del correo electrónico
    let gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + email.to + '&su=' + encodeURIComponent(email.subject) + '&body=' + encodeURIComponent(email.body);

    const loading = await this.utilsSvc.loading()
    await loading.present()

    this.emailComposer.open(email).then(() => {
      console.log("Correo Enviado")
    }).catch((error) => {
      console.error("Ha ocurrido un error", error)
      window.open(gmailUrl, '_blank');
    }).finally(() => {
      loading.dismiss()
    })
  }

  // EDITAR CONSTANCIA
  editarConstancia(url: string, proof: Proof) {
    this.utilsSvc.setData(proof as Proof)
    this.utilsSvc.routerLink(url, false)
  }

  // -------- ELIMINACION DE UNA CONTANCIA --------
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
      this.graficoConstancias.destroy()
      this.getConstancias()
    })
  }

  // ================== PDF ===============

  async createPdf() {
    try {
      let content = [
        ['Mes', 'Activas', 'Inactivas', 'Totales']
      ]
      for (let i = 0; i < this.label.length; i++) {
        // Obtenemos el mes, el conteo de activas y el conteo de inactivas para este índice
        let mes = this.label[i];
        let activas = this.monthCountTrue[i];
        let inactivas = this.monthCountFalse[i];
        let totales = activas + inactivas;
        // Creamos una nueva fila con esta información y la agregamos al cuerpo del PDF
        let fila = [mes, activas, inactivas, totales];
        content.push(fila);
      }
      
      let docObj = this.getPdfDefinition(content)
      this.pdfObj = pdfMake.createPdf(docObj).download()
    } catch (error) {
      console.log(error)
    }
  }

  getPdfDefinition(content) {
    var dd = {
      content: [
        { text: 'Informe de Solicitudes Registrados', style: 'header' },
        { text: '\n\n' },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*'],
            body: content
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        }
      }
    }
    return dd
  }
}


