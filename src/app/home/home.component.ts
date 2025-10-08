import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";
import {SingletonService} from "../singleton.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showFiller = false;
  @ViewChild('drawer') sidenav: MatSidenav | undefined;
  constructor(private route: Router,
              public singleton: SingletonService) { }

  ngOnInit(): void {
  }

  goToScreen(screen: string): void {
this.route.navigate(['/' +screen]);
 this.sidenav?.toggle();
  }

}
