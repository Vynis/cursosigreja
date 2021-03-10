import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SecurityUtil } from 'src/app/core/utils/security.util';
import { Usuario } from 'src/app/core/_models/usurario.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  public user: Usuario = null;

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.user = SecurityUtil.getUsuario();
  }

  logout() {
    SecurityUtil.clear();
    this.navCtrl.navigateRoot('/login');
  }

}
