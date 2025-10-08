import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SingletonService} from "../../../singleton.service";
import * as Leaflet from "leaflet";

@Component({
  selector: 'app-item-restaurant',
  templateUrl: './item-restaurant.component.html',
  styleUrls: ['./item-restaurant.component.scss']
})
export class ItemRestaurantComponent implements OnInit,AfterViewInit {
  loader = false;
  title = 'View Restaurant';
  selectedRestuarant: any;
  map: any;

  constructor(  public singleton: SingletonService,
                public dialogRef: MatDialogRef<ItemRestaurantComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { item: any },) {
   this.selectedRestuarant = data.item;
 this.title = 'Restaurant: ' + this.selectedRestuarant.name + ' (' + this.selectedRestuarant.cityName + ')'
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
    setTimeout(() => this.refreshMap(), 500);
  }

  private initMap(): void {

    this.map = Leaflet.map('map', {
      center: [ this.selectedRestuarant.lat, this.selectedRestuarant.lng ],
      zoom: 14
    });

    const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  refreshMap(): void {
      const itemMarker: any = Leaflet.marker([this.selectedRestuarant.lat, this.selectedRestuarant.lng], {
        icon: Leaflet.icon({
          iconSize: [15, 26],
          iconAnchor: [7, 26],
          popupAnchor: [1, -18],
          iconUrl: 'assets/orangemaker.png',
        }),
        title: this.selectedRestuarant.name,
      });
      itemMarker.name = this.selectedRestuarant.name;

      itemMarker.addTo(this.map);

  }
}
