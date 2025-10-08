import {Component, Inject, OnInit} from '@angular/core';
import {SingletonService} from "../../../singleton.service";
import {CityService} from "../../city/city.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProfileService} from "../profile.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  loader = false;
  title = 'Add | Edit Profile';
  selectedProfile: any;
  constructor(public singleton: SingletonService,
              private profileService: ProfileService,
              public dialogRef: MatDialogRef<ItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { item: any },) {
    console.log(data)
    this.selectedProfile = {
      id: null,
      name: '',
      description: '',
      listModules: [],
      active: true
    }
    if(data.item !== -1) {

      this.singleton.listProfiles.forEach((item: any) => {
        if(item.id === data.item){
          this.selectedProfile.id = item.id
          this.selectedProfile.active = item.active
          this.selectedProfile.name = item.name
            this.selectedProfile.description = item.description
          item.listModules.forEach((itemModule: any)=> {
            this.singleton.listModules.forEach((module: any) => {
              if(module.id === itemModule.idModule){
                module.listRoles.forEach((role: any) => {
                  if(role.id === itemModule.idRole)
                  role.checked = true;
                })
              }
            })
          })

        }
      })
    }else{
      this.singleton.listModules.forEach((module: any) => {
        module.checked = false
        module.listRoles.forEach((role: any) => {
          role.checked = false
        })

      })
    }
  }

  ngOnInit(): void {
  }

  preview(): void{
    this.dialogRef.close()
  }
  save(): void{
    this.selectedProfile.listModules = []
    this.singleton.listModules.forEach((module: any) => {
        module.listRoles.forEach((role: any) => {
          if(role.checked){
              let obj: any = {
                id: null,
                idProfile: this.selectedProfile.id,
                idModule: module.id,
                idRole: role.id
              }
              this.selectedProfile.listModules.push(obj);
          }
        })

    })

    this.profileService.saveProfile(this.selectedProfile).subscribe((result: any) => {
      console.log(result)
      this.singleton.actionChange('refreshProfile')
      this.dialogRef.close()
    })
  }



  checkData(): boolean{
    if(this.selectedProfile.name.length > 0){
      return  true
    }else{
      return  false
    }

  }
  setModule(event: any, id : number): void {
    this.singleton.listModules.forEach((module: any) => {
      if(module.id === id){
        module.checked = event.checked;
        module.listRoles.forEach((role: any) => {
          role.checked =  event.checked;
        })
      }
    })
  }

  setRole(event: any, idRole : number, idModule : number): void {
      this.singleton.listModules.forEach((module: any) => {
        if(module.id === idModule){
          module.listRoles.forEach((role: any) => {
            if(role.id === idRole) {
              role.checked = event.checked;
            }
          })
        }
      })
  }

  setActive(event: any): void {
   this.selectedProfile.active = event.checked;
  }
}
