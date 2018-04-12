import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';

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
  type:string;

  constructor(private router:Router,private defaultService:DefaultService,private utilitiesService:UtilitiesService) { 
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        let paramObj = data.state.root.firstChild.params;
        this.cn = paramObj.cn;
      }
    });
  }

  ngOnInit() {
    this.type="bottom";
    this.defaultService.getCountry().subscribe(response => {
      this.countries = response;
      this.countryName = this.utilitiesService.filterSelectedObj(response, this.cn, "countryShortName").countryName
    });
  }

}
