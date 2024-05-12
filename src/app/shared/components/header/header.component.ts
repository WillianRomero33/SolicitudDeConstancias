import { Component, Input, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!: string;
  @Input() backButton!: string;
  @Input() isMain!: boolean;

  firebaseSvc = inject(FirebaseService)

  ngOnInit() {}

  signOut () {
    this.firebaseSvc.signOut()
  }
}
