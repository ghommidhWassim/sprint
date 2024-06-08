import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent  implements OnInit {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  user:any={
    firstname: '',
    lastname: '',
    email: '',
    prefix: 0,
    phone: 0,
    password: '',
    role: '',
    vehicule: null,
    token: ''
  }
  constructor(private  storage: StorageService) { }

  async ngOnInit() {
    this.user= await this.storage.get('user')
    console.log('this.user', this.user);
  }

}
