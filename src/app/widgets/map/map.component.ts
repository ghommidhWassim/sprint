import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {  MapDirectionsService } from "@angular/google-maps";
import { Geolocation } from '@capacitor/geolocation';
import { map } from "rxjs/operators";
import { GoogleMap } from '@capacitor/google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() depart: google.maps.LatLng | undefined;
  @Input() destination: google.maps.LatLng | undefined;
  @ViewChild('map', { static: true }) map!: GoogleMap;

  directionResult: google.maps.DirectionsResult | undefined;
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555
  };
  zoom = 6;
  display: any;
  markerPosition: google.maps.LatLng | undefined;
  distance: string | undefined;
  currentPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  watchId: string | undefined;
  @ViewChild('map')
  mapRef: any;
  newMap: GoogleMap;
  constructor(private directionService: MapDirectionsService) { }

  ngOnInit() {
    this.startTracking();
  }
  ngAfterViewInit() {
    this.createMap()

  }

  async createMap() {
    console.log('this.mapRef',this.mapRef)
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: 'AIzaSyDaSaHBXNdvck-D-EWFlDPQCTM_AphIofA',
      config: {
        center: {
          lat: 33.6,
          lng: -117.9,
        },
        zoom: 8,
      },
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['depart'] || changes['destination']) {
      const from = this.depart;
      const to = this.destination;
      if (from && to) {
        this.getDirection(from, to);
      } else if (from) {
        this.goToLocation(from);
      } else if (to) {
        this.goToLocation(to);
      }
    }
  }

  async startTracking() {
    console.log(this.depart)
    try {
      const position = await Geolocation.getCurrentPosition();
      this.currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.center = this.currentPosition;

      this.watchId = await Geolocation.watchPosition({ enableHighAccuracy: true }, (position, err) => {
        if (err) {
          console.error('Error watching position:', err);
          return;
        }
        if (position) {
          console.log('position', position)

          this.currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.center = this.currentPosition; // Optionally center the map on the current position

          let testplae = setInterval(() => {
            this.currentPosition = {
              lat: 36.837753,
              lng: 10.177953
            };
            this.center = this.currentPosition; // Optionally center the map on the current position

            this.getDirection(this.currentPosition, {
              lat: 36.644665,
              lng: 10.177953
            })
          }, 8000);

          testplae = setInterval(() => {
            this.currentPosition = {
              lat: 36.755665,
              lng: 10.177953
            };
            this.center = this.currentPosition; // Optionally center the map on the current position

            this.getDirection(this.currentPosition, {
              lat: 36.644665,
              lng: 10.177953
            })
          }, 10000);

          testplae = setInterval(() => {
            this.currentPosition = {
              lat: 36.755775,
              lng: 10.177953
            };
            this.center = this.currentPosition; // Optionally center the map on the current position

            this.getDirection(this.currentPosition, {
              lat: 36.644665,
              lng: 10.177953
            })
          }, 10000);

          testplae = setInterval(() => {
            this.currentPosition = {
              lat: 34.644665,
              lng: 10.177953
            };
            this.center = this.currentPosition; // Optionally center the map on the current position

            this.getDirection(this.currentPosition, {
              lat: 36.644665,
              lng: 10.177953
            })
          }, 10000);

        }
      });
    } catch (error) {
      console.error('Error getting location', error);
    }
  }

  async stopTracking() {
    if (this.watchId) {
      await Geolocation.clearWatch({ id: this.watchId });
    }
  }

  goToLocation(location: google.maps.LatLng) {
    this.markerPosition = location;
    // this.map.panTo(location);
    this.zoom = 17;
    this.directionResult = undefined;
  }

  getDirection(from: any, to: any) {
    this.zoom = 40;

    const request: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionService.route(request).pipe(
      map(res => res.result)
    ).subscribe(
      (result) => {
        this.directionResult = result;
        this.calculateDistance(from, to);
        this.markerPosition = undefined;
      },
      (error) => {
        console.error('Error getting directions:', error);
      }
    );
  }

  calculateDistance(from: google.maps.LatLng, to: google.maps.LatLng) {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [from],
        destinations: [to],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
      },
      (response, status) => {
        if (status === 'OK' && response?.rows[0]?.elements[0]?.status === 'OK') {
          const distanceInMeters = response.rows[0].elements[0].distance.value;
          this.distance = `${(distanceInMeters / 1000).toFixed(2)} km`; // Converts to kilometers and fixes to 2 decimal places
          console.log('distance', this.distance);
        } else {
          console.error('Error calculating distance:', status);
        }
      }
    );
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.center = event.latLng.toJSON();
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
    }
  }
}
