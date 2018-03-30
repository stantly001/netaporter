import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';

import { DefaultService } from '../services/default.service';
import { ParamsService } from '../services/params.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menus: any;
  ln: string;
  cn: string;
  countries: Array<any> = [];
  languages: Array<any> = [];

  selectedRow: Number;
  searchItems: string;
  tempParams:Object;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router, private defaultService: DefaultService, private paramsService: ParamsService,
    private utilitiesService: UtilitiesService) {}

  ngOnInit() {

    this.defaultService.getCountry().subscribe(response => {
      this.countries = response;
    });

    this.defaultService.getLanuage().subscribe(response => {
      this.languages = response;
    });

  }

  /**
   * 
   * @param type 
   * @param value
   * Build url on Page load 
   */
  buildUrl(type: string, value: string) {
    let params: { [k: string]: any } = {};
    let qParams: { [k: string]: any } = {};
    this.paramsService.urlQueryParameters.subscribe(response => {
      qParams = response;
    });

    this.paramsService.urlParameters.subscribe(response => {
      params = response;
    });

    let paramsObj = JSON.parse(JSON.stringify(params));
    if (type == 'country') {
      paramsObj.cn = value;
    }
    if (type == "language") {
      paramsObj.ln = value;
    }
    let routeUrl = this.utilitiesService.buildRoutingUrl(paramsObj);
    this.router.navigate([routeUrl], { queryParams: qParams });
  }

  /**
   * 
   * @param country 
   */
  updateCountry(country) {
    this.cn = country.countryShortName;
    this.buildUrl('country', country.countryShortName);
  }

  /**
   * 
   * @param lang 
   * update Country Language
   */
  updateLanguage(lang) {
    console.log(lang);
    this.ln = lang.languageShortName;
    this.buildUrl('language', lang.languageShortName);
  }

}
