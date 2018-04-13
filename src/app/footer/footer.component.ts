import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

import { DefaultService } from '../services/default.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  countryName:string;
  countries:Array<any>=[];
  cn:string;
  displayType:string;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private router:Router,private defaultService:DefaultService,private utilitiesService:UtilitiesService) { 
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        let paramObj = data.state.root.firstChild.params;
        this.cn = paramObj.cn;
      }
    });
  }

  ngOnInit() {
    this.displayType="bottom";
    this.defaultService.getCountry().subscribe(response => {
      this.countries = response;
      let countryName=this.storage.get("shipping")
      if(countryName){
        this.countryName=countryName;
      }else{
      this.countryName=response[0].countryName;
      this.storage.set("shipping",this.countryName);
      }
    })
  }
  shipTo(country){
    this.countryName=country.countryName;
    this.storage.set("shipping",this.countryName);
  }
}
