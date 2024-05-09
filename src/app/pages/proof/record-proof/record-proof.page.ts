import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-record-proof',
  templateUrl: './record-proof.page.html',
  styleUrls: ['./record-proof.page.scss'],
})
export class RecordProofPage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

}