import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';

import { DefaultService } from '../services/default.service';
import { ParamsService } from '../services/params.service';
import { UtilitiesService } from '../services/utilities.service';

import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  page: number;
  sub: Subscription;
  menus: any;
  ln: string;
  cn: string;
  countries: Array<any> = [];
  languages: Array<any> = [];
  filteredProducts: Array<any> = [];
  tempFilteredProducts: Array<any> = [];
  setClickedRow: Function;
  selectedRow: Number;
  searchItems: string;
  tempParams: Object;
  countryName: string;
  langName: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router, private defaultService: DefaultService, private paramsService: ParamsService,
    private utilitiesService: UtilitiesService) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }
  }

  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        let tempParams = data.state.root.firstChild.params;
        this.ln = tempParams.ln;
        this.cn = tempParams.cn;
      }
    });
    this.defaultService.getCategories().subscribe(response => {
      this.menus = response;
    });
    this.defaultService.getCountry().subscribe(response => {
      this.countries = response;
      this.countryName = this.filterSelectedObj(response, this.cn, "countryShortName").countryName
    });
    this.defaultService.getLanuage().subscribe(response => {
      this.languages = response;
      this.langName = this.filterSelectedObj(response, this.ln, "languageShortName").languageName;
    });

  }
  /**
   * 
   * @param data 
   * @param val 
   * @param filterKey 
   * filter by [] to {}
   */
  filterSelectedObj(data, val, filterKey) {
    return data.filter(x => x[filterKey] == val)[0];
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
    this.countryName = country.countryName;
    this.buildUrl('country', country.countryShortName);
  }

  /**
   * 
   * @param lang 
   * update Country Language
   */
  updateLanguage(lang) {
    this.ln = lang.languageShortName;
    this.langName = lang.languageName
    this.buildUrl('language', lang.languageShortName);
  }

}
