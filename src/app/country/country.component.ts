import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';

import { DefaultService } from '../services/default.service';
import { ParamsService } from '../services/params.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  cn: string;
  countryName: string;
  countries: Array<any> = [];
  tempParams: Object;
  @Input() displayType:string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private utilitiesService: UtilitiesService, private defaultService: DefaultService) {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        let paramObj = data.state.root.firstChild.params;
        this.tempParams = paramObj;
        this.cn = paramObj.cn;
      }
    });

  }

  ngOnInit() {
    this.defaultService.getCountry().subscribe(response => {
      this.countries = response;
      this.countryName = this.utilitiesService.filterSelectedObj(response, this.cn, "countryShortName").countryName
    });
  }

  /**
   * 
   * @param country 
   */
  updateCountry(country) {
    let qParams: { [k: string]: any } = {};
    this.activatedRoute.queryParams.subscribe(response => {
      qParams = response;
    });
    this.cn = country.countryShortName;
    this.countryName = country.countryName;
    let routeUrl = this.utilitiesService.buildUrl('country', this.cn, this.tempParams);
    this.router.navigate([routeUrl], { queryParams: qParams });
  }


}
