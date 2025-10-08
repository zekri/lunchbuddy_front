import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {SingletonService} from "../singleton.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login='';
  password = '';
  error= '';
  constructor(private route: Router,
              private singleton: SingletonService,
              private loginService: LoginService) { }

  ngOnInit(): void {
  }

  public submit(): void {
    let obj: any = {
      login: this.login,
      password: this.password
    }
    this.loginService.login(obj).subscribe((data: any) => {
      if(data){
        this.singleton.me = data;
        localStorage.setItem('ngStorage-userLocale', JSON.stringify( this.singleton.me));
        localStorage.setItem('IsLoggedIn', 'yes');
        this.route.navigate(['']);
      }

    })

  }

}
