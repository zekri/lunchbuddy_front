import {Component,EventEmitter, OnInit, Output} from '@angular/core';
import {SingletonService} from "../../singleton.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  tooltipRefresh = '';
  @Output() toggleClicked = new EventEmitter();
  constructor(public singleton: SingletonService,
              private router: Router,) {
    console.log( this.singleton.me)
  }

  ngOnInit(): void {
    this.tooltipRefresh = 'Refresh'
  }

  onDraw(): void {
    if(this.singleton.titleHeader ==='Dashbord')
    this.toggleClicked.emit('city');
    else
      this.toggleClicked.emit('');
  }

  logOut(): void {
      localStorage.removeItem('CMPST_CNFG');
      localStorage.removeItem('IsLoggedIn');
    if(this.singleton.titleHeader ==='Dashbord'){
      this.router.navigate(['city']);
    }else{
      this.router.navigate(['']);
    }

  }

  refresh(): void {
     this.singleton.actionChange('refresh')
  }

}
