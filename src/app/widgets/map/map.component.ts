import {Component, Input, OnInit} from '@angular/core';
import {MapDirectionsService} from "@angular/google-maps";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent  implements OnInit {
  @Input() depart: google.maps.LatLng | undefined;
  @Input() destination: google.maps.LatLng |undefined;

  directionResult: google.maps.DirectionsResult | undefined;
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555
};
zoom2 = 6;
display: any;
autoComplete: google.maps.places.Autocomplete | undefined
  constructor(private directionService: MapDirectionsService) { }

  ngOnInit() {}

  ngOnChanges(){
    const from = this.depart
    const to = this.destination
    if(from && to ){
      this.getDirection(from,to)
    }
  }

  getDirection(from: google.maps.LatLng,to: google.maps.LatLng){
      const request : google.maps.DirectionsRequest= {
        origin:from,
        destination:to,
        travelMode: google.maps.TravelMode.DRIVING
      }

      this.directionService.route(request).pipe(
        map(res => res.result)
      ).subscribe(
        (result)=>{ this.directionResult= result}
      )
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
}

/*------------------------------------------
--------------------------------------------
move()
--------------------------------------------
--------------------------------------------*/
move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
}

}
