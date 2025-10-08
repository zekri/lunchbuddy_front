import {Component, Inject, OnInit} from '@angular/core';
import {SingletonService} from "../../../singleton.service";
import {ProfileService} from "../../profile-def/profile.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../user.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  loader = false;
  title = 'Add | Edit User';
  selectedUser: any;
  constructor(public singleton: SingletonService,
              private userService: UserService,
              public dialogRef: MatDialogRef<ItemComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { item: any },) {
    this.selectedUser = {
      id: null,
      login: '',
      email: '',
      firstName:'',
      lastName:'',
      password:'',
      idProfile:'',
      active: true
    }

    if(data.item !== -1) {
      this.singleton.listUsers.forEach((item: any) => {
        if(item.id === data.item){
          this.selectedUser.id = item.id
          this.selectedUser.login = item.login
          this.selectedUser.firstName = item.firstName
          this.selectedUser.lastName = item.lastName
          this.selectedUser.email = item.email
          this.selectedUser.password = item.password
          this.selectedUser.idProfile = '' + item.idProfile
          this.selectedUser.active = item.active

        }
      })
    }
  }

  ngOnInit(): void {

  }

  setActive(event: any): void {
    this.selectedUser.active = event.checked;
  }

  preview(): void{
    this.dialogRef.close()
  }
  save(): void{
    this.userService.saveUser(this.selectedUser).subscribe((result: any) => {
      console.log(result)
      this.singleton.actionChange('refresh')
      this.dialogRef.close()
    })
  }



  checkData(): boolean{
    if(this.selectedUser.login.length > 0 && this.selectedUser.email.length >0 && this.selectedUser.password.length && this.selectedUser.idProfile.length){
      return  true
    }else{
      return  false
    }

  }

}
