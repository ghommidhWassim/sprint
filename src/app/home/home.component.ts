
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Storage } from '@ionic/storage';
import {IonInput} from "@ionic/angular";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  inputName1='Depart'
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
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private storage: StorageService, private st:Storage) { }

  ngOnInit() {
  }

  // private ensureScript() {
  //   const document = this.mapDiv.nativeElement.ownerDocument;
  //   const script = <HTMLScriptElement>document.querySelector('script[id="googlemaps"]');
  //   if (script) {
  //   } else {
  //     const mapsScript = document.createElement('script');
  //     mapsScript.id = 'googlemaps';
  //     mapsScript.type = 'text/javascript';
  //     mapsScript.async = true;
  //     mapsScript.defer = true;
  //     mapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDaSaHBXNdvck-D-EWFlDPQCTM_AphIofA';
  //     mapsScript.onload = () => {

  //     };
  //     document.body.appendChild(mapsScript);
  //   }
  // }
}
