import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {IonicModule} from "@ionic/angular";
import {RouterLinkActive, RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {GoogleAutocompleteInputComponent} from "./google-autocomplete-input/google-autocomplete-input.component";



@NgModule({
  declarations: [MapComponent, SideMenuComponent, GoogleAutocompleteInputComponent],
  imports: [
    CommonModule,
    GoogleMapsModule,
    IonicModule,
    HttpClientModule,
    RouterLinkActive,
    RouterModule
  ],
  exports: [MapComponent, SideMenuComponent, GoogleAutocompleteInputComponent]
})
export class WidgetsModule { }
