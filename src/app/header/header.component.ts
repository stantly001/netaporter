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
  tempParams: Object;
  countryName: string;
  langName: string;
  type: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private router: Router, private defaultService: DefaultService, private paramsService: ParamsService,
    private utilitiesService: UtilitiesService) {

    this.type = "top";

    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        let paramObj = data.state.root.firstChild.params;
        this.tempParams = paramObj;
        this.ln = paramObj.ln;
        this.cn = paramObj.cn;
      }
    });
    console.log("hedear loaded okay");
  }

  ngOnInit() {
  }

  /**
   * 
   * @param event 
   * @param value 
   * Product Search Filter 
   */
  // onSearchProduct(event, value) {
  //   this.filteredProducts = this.tempFilteredProducts;
  //   if (event.key == 'Enter') {
  //     let arr = (value) ? this.utilitiesService.searchFilter(this.filteredProducts, value) : this.tempFilteredProducts;
  //     console.log("search Arr ==>",arr);
  //     // this.paramsService.setFilteredProducts(arr);
  //   }
  // }

}
