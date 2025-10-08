import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import * as Leaflet from "leaflet";
import {SingletonService} from "../../../singleton.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-item-event',
  templateUrl: './item-event.component.html',
  styleUrls: ['./item-event.component.scss']
})
export class ItemEventComponent implements OnInit,AfterViewInit {
  loader = false;
  title = 'View Restaurant';
  selectedEvent: any;
  map: any;

  constructor(  public singleton: SingletonService,
                public dialogRef: MatDialogRef<ItemEventComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { item: any },) {
    this.selectedEvent = data.item;
    this.title = 'Event: ' + this.selectedEvent.title + ', ' + this.selectedEvent.eventDate
    this.selectedEvent.listJoin.forEach((itemC: any) => {
      this.singleton.listSocialUsers.forEach((itemI: any) => {
        if(itemC.idUser === itemI.idRow){
          itemC.user = itemI
        }
      })
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
    setTimeout(() => this.refreshMap(), 500);
  }

  private initMap(): void {

    this.map = Leaflet.map('map', {
      center: [ this.selectedEvent.restaurant.lat, this.selectedEvent.restaurant.lng ],
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
    const itemMarker: any = Leaflet.marker([this.selectedEvent.restaurant.lat, this.selectedEvent.restaurant.lng], {
      icon: Leaflet.icon({
        iconSize: [15, 26],
        iconAnchor: [7, 26],
        popupAnchor: [1, -18],
        iconUrl: 'assets/orangemaker.png',
      }),
      title: this.selectedEvent.restaurant.name,
    });
    itemMarker.name = this.selectedEvent.restaurant.name;

    itemMarker.addTo(this.map);

  }

}
