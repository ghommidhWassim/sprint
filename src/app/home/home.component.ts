
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Storage } from '@ionic/storage';
import {IonInput} from "@ionic/angular";
import {Event} from "@angular/router";
import {isEmpty} from "rxjs";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  depart!: google.maps.LatLng | undefined;
  destination!: google.maps.LatLng | undefined;

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private storage: StorageService, private st:Storage) {

  }

  ngOnInit() {
  }

  getGeo(place:google.maps.LatLng, key:string){
    if(key=='depart') {
      this.depart = place
    }else {this.destination=place}

  }

  setMapGeo(){
    if(this.depart && this.destination){
      console.log('setMapGeo',true);
      const DepartDestination = {
        depart: this.depart,
        destination: this.destination
      }
    }
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
