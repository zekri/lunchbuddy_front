import { Component } from '@angular/core';
import {SingletonService} from "./singleton.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lunchBuddiesFront';
  constructor(private singleton: SingletonService) {
    if (localStorage.getItem('ngStorage-userLocale')) {
      let me: string | null = localStorage.getItem('ngStorage-userLocale')
      if (me != null) {
        this.singleton.me = JSON.parse(me);
      }
      console.log( this.singleton.me)
    }
  }

}
