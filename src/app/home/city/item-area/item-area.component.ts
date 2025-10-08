import {Component, Inject, OnInit} from '@angular/core';
import {SingletonService} from "../../../singleton.service";
import {CityService} from "../city.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-item-area',
  templateUrl: './item-area.component.html',
  styleUrls: ['./item-area.component.scss']
})
export class ItemAreaComponent implements OnInit {

  loader = false;
  title = 'Add Area';
  selectedArea: any;
  selectedCity = '';
  constructor(public singleton: SingletonService,
              private cityService: CityService,
              public dialogRef: MatDialogRef<ItemAreaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { item: any },) {
    this.selectedArea = {
      name:'',
      lat:'' +data.item.lat,
      lng:'' +data.item.lng,
      idCity:'',
      radius:500
    }
  }

  ngOnInit(): void {
  }

  preview(): void {
    this.dialogRef.close()
  }

  save(): void {
    this.cityService.saveArea(this.selectedArea).subscribe((data:any) => {
      console.log(data)
      this.dialogRef.close(true);
    })
  }

  checkData(): boolean {
    this.selectedArea.idCity = this.selectedCity;
    if(this.selectedArea.idCity.length > 0 && this.selectedArea.name.length > 0
      && this.selectedArea.lat.length > 0
      && this.selectedArea.lng.length > 0){
      return true;
    }
    return false;
  }

}
