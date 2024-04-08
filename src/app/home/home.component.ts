/// <reference path="../../../node_modules/@types/google.maps/index.d.ts" />

import { Component, OnInit, AfterContentInit, Input, ViewChild,
  ContentChildren, ElementRef, QueryList, ChangeDetectionStrategy, Renderer2 } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { User } from '../models/user';



import { debounceTime } from 'rxjs/operators';

export interface IMapDataPoint {
  longitude: number;
  latitutde: number;
  markerText?: string;
}

@Component({
  selector: 'cm-map-point',
  template: ``
})
export class MapPointComponent implements OnInit {

  @Input() longitude: number = 0;
  @Input() latitude: number = 0;
  @Input() markerText: string = '';

  constructor() { }

  ngOnInit() {

  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit, AfterContentInit {

  private isEnabled: boolean = false;
  private loadingScript: boolean = false;
  private map: google.maps.Map = {} as google.maps.Map;
  private markers: google.maps.Marker[] = [];
  mapEvents: google.maps.event = {} as google.maps.event
  mapHeight: string | null = null;
  mapWidth: string | null = null;
  rootFontSize: string = '';

  @Input() height: number = 0;
  @Input() width: number = 0;
  @Input() latitude = 7.5400;
  @Input() longitude = 5.5471;
  @Input() markerText = 'Your Location';
  @Input() zoom = 8;
  private _dataPoints: IMapDataPoint[] = [];
  @Input() public get dataPoints() {
    return this._dataPoints as IMapDataPoint[];
  }

  public set dataPoints(value: any[]) {
    this._dataPoints = value;
    this.renderMapPoints();
  }

  // Necessary since a map rendered while container is hidden
  // will not load the map tiles properly and show a grey screen
  @Input() get enabled(): boolean {
    return this.isEnabled;
  }

  set enabled(isEnabled: boolean) {
    this.isEnabled = isEnabled;
    this.init();
  }

  @ViewChild('mapContainer', { static: true }) mapDiv: ElementRef = {} as ElementRef;
  @ContentChildren(MapPointComponent) mapPoints: QueryList<MapPointComponent> = {} as QueryList<MapPointComponent>;

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
  constructor(private storage: StorageService) { }

  async ngOnInit() {
    this.user= await this.storage.get('user')
    console.log(this.user
      );
      if (this.latitude && this.longitude) {
        if (this.mapHeight && this.mapWidth) {
          this.mapHeight = this.height + 'px';
          this.mapWidth = this.width + 'px';
        } else {
          const hw = this.getWindowHeightWidth(this.mapDiv.nativeElement.ownerDocument);
          this.mapHeight = hw.height / 2 + 'px';
          this.mapWidth = hw.width + 'px';
        }
      }
  }

  ngAfterContentInit() {
    this.mapPoints.changes
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        if (this.enabled) {
          this.renderMapPoints();
        }
      });
  }

  init() {
    // Need slight delay to avoid grey box when google script has previously been loaded.
    // Otherwise map <div> container may not be visible yet which causes the grey box.
    setTimeout(() => {
      this.ensureScript();
    }, 200);
  }

  private getWindowHeightWidth(document: Document) {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;


    const height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;

    // if (width > 900) { width = 900; }

    const myElement = document.getElementById('form');
    if (myElement) {
      return { height: height, width: myElement.getBoundingClientRect().width };
    }

    return { height: height, width: width };
  }

  private ensureScript() {
    this.loadingScript = true;
    const document = this.mapDiv.nativeElement.ownerDocument;
    const script = <HTMLScriptElement>document.querySelector('script[id="googlemaps"]');
    if (script) {
      if (this.isEnabled) { this.renderMap(); }
    } else {
      const mapsScript = document.createElement('script');
      mapsScript.id = 'googlemaps';
      mapsScript.type = 'text/javascript';
      mapsScript.async = true;
      mapsScript.defer = true;
      mapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDaSaHBXNdvck-D-EWFlDPQCTM_AphIofA';
      mapsScript.onload = () => {
        this.loadingScript = false;
        if (this.isEnabled) { this.renderMap(); }

        this.addSingleMarkerListener()
      };
      document.body.appendChild(mapsScript);
    }
  }

  private renderMap() {
    const latlng = this.createLatLong(this.latitude, this.longitude) as google.maps.LatLng;
    const options = {
      zoom: this.zoom,
      center: latlng,
      mapTypeControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: true
    } as google.maps.MapOptions;

    this.map = new google.maps.Map(this.mapDiv.nativeElement, options);

    // See if we have any mapPoints (child content) or dataPoints (@Input property)
    if ((this.mapPoints && this.mapPoints.length) || (this.dataPoints && this.dataPoints.length)) {
      this.renderMapPoints();
    }
  }

  private createLatLong(latitude: number, longitude: number) {
    return (latitude && longitude) ? new google.maps.LatLng(latitude, longitude) : null;
  }

  private renderMapPoints() {
    if (this.map && this.isEnabled) {
      this.clearMapPoints();

      // lon/lat can be passed as child content or via the dataPoints @Input property
      const mapPoints = (this.mapPoints && this.mapPoints.length) ? this.mapPoints : this.dataPoints;

      if (mapPoints) {
        for (const point of mapPoints) {
          let markerText = (point.markerText) ? point.markerText : `<h3>${point.firstName} ${point.lastName}</h3>`;
          const mapPointLatlng = this.createLatLong(point.latitude, point.longitude) as google.maps.LatLng;
          this.createMarker(mapPointLatlng, markerText);
        }
      }
    }
  }

  private clearMapPoints() {
    this.markers.forEach((marker: google.maps.Marker) => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  private createMarker(position: google.maps.LatLng, title: string, singleMarker?: boolean) {
    console.log("🚀 ~ file: map.component.ts:205 ~ MapComponent ~ createMarker ~ po:sition:", position)
    const infowindow = new google.maps.InfoWindow({
      content: title
    });

    const marker = new google.maps.Marker({
      position: position,
      map: this.map,
      title: title,
      animation: google.maps.Animation.DROP
    });


    if (singleMarker) {
      this.clearMapPoints();
      this.markers.push(marker);
    } else {
      this.markers.push(marker);
    }

    marker.addListener('click', () => {
      infowindow.open(this.map, marker);
    });
  }

  addSingleMarkerListener() {
    google.maps.event.addListener(this.map, "click", (event:any) => {
      this.createMarker(event.latLng, 'store', true)
    });
  }
}