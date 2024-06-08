import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonInput} from "@ionic/angular";

@Component({
  selector: 'app-google-autocomplete-input',
  templateUrl: './google-autocomplete-input.component.html',
  styleUrls: ['./google-autocomplete-input.component.scss'],
})
export class GoogleAutocompleteInputComponent  implements OnInit, AfterViewInit {
  @ViewChild('Field', { read: IonInput, static: false }) Field!: IonInput;
  autoComplete: google.maps.places.Autocomplete | undefined;
  @Input() inputName = '';
  constructor() { }

  ngOnInit() {}
  ngAfterViewInit() {
    this.initializeAutocomplete();
  }

  initializeAutocomplete() {
    this.Field.getInputElement().then((nativeInputElement: HTMLInputElement) => {
      console.log('nativeInputElement', nativeInputElement);
      console.log('autocomplete', this.autoComplete);

      this.autoComplete = new google.maps.places.Autocomplete(nativeInputElement);
      console.log('autocomplete11', this.autoComplete);
      this.autoComplete.addListener('place_changed', () => {
        const depart = this.autoComplete?.getPlace();
        console.log('depart', depart);
      });
    });

  }
}
