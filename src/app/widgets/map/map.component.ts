import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent  implements OnInit {
  center: google.maps.LatLngLiteral = {
    lat: 22.2736308,
    lng: 70.7512555
};
zoom2 = 6;
display: any;
autoComplete: google.maps.places.Autocomplete | undefined
  constructor() { }

  ngOnInit() {}

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
