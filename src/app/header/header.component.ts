import { Component, OnInit } from '@angular/core';
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
  tempParams:Object;

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

    this.defaultService.getCategories().subscribe(response => {
      this.menus = response;
    });

    this.defaultService.getCountry().subscribe(response => {
      this.countries = response;
    });

    this.defaultService.getLanuage().subscribe(response => {
      this.languages = response;
    });

    this.defaultService.getProducts().subscribe(response => {
      this.filteredProducts = response;
      this.tempFilteredProducts = response;
    });
    //this.buildUrl('','');

    let params: { [k: string]: any } = {};
    let qParams: { [k: string]: any } = {};
    this.paramsService.urlQueryParameters.subscribe(response => {
      qParams = response;
    });

    this.paramsService.urlParameters.subscribe(response => {
      params = response;
    });

    let paramsObj = JSON.parse(JSON.stringify(params));

    console.log("parmsObj ==>", paramsObj);

    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        let tempParams= data.state.root.firstChild.params;
        this.ln = tempParams.ln;
        this.cn = tempParams.cn; 
      }
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
    if (type == "langulage") {
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
    this.ln = lang.languageShortName;
    this.buildUrl('language', lang.languageShortName);
  }

  /**
   * 
   * @param event 
   * @param value 
   * Product Search Filter 
   */
  onSearchProduct(event, value) {
    if (event.key == 'Enter') {
      console.log("value -->", value);
      let arr = (value) ? this.utilitiesService.searchFilter(this.filteredProducts, value) : this.tempFilteredProducts;
      this.paramsService.setFilteredProducts(arr);
    }
  }
}
