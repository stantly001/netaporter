import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { DefaultService } from '../services/default.service';
import { UtilitiesService } from '../services/utilities.service';
import { ParamsService } from '../services/params.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  topBrands: any[];
  brands: any;
  brandIds: any;
  categoryId: any;
  ln: any;
  topCategories: any;
  menuId: any;
  countryName: string;
  countries: Array<any> = [];
  cn: string;
  displayType: string;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService, private router: Router, private defaultService: DefaultService, private utilitiesService: UtilitiesService, private activatedRoute: ActivatedRoute, private paramsService: ParamsService) {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        let paramObj = data.state.root.firstChild.params;
        this.cn = paramObj.cn;
        this.ln = paramObj.ln;
        this.menuId = paramObj.menuId;
        this.categoryId = paramObj.categoryId;
        this.defaultService.getCategories().subscribe(response => {
          this.topCategories = response.filter(res => res.menuId == this.menuId)[0].categories;
        });
      }
    });

    this.defaultService.getMappingFilters().subscribe(response => {
      this.brandIds = response.filter(res => res.categoryId == this.categoryId)[0].brandId;
      this.defaultService.getBrands().subscribe(response => {
        this.brands = response;
        this.topBrands = this.utilitiesService.mapArrays(this.brandIds, this.brands, "brandId")
      });
    });

    this.paramsService.shipment.subscribe(response => {
      this.countryName = response['countryName'];
    });

  }

  ngOnInit() {
    this.displayType = "bottom";

    this.defaultService.getCountry().subscribe(response => {
      this.countries = response;
      let countryName = this.storage.get("shipping");
      if (countryName) {
        this.countryName = countryName;
      } else {
        this.countryName = response[0].countryName;
        this.storage.set("shipping", this.countryName);
      }
    })
  }
  shipTo(country) {
    this.countryName = country.countryName;
    this.paramsService.setShipTo(country);
    this.storage.set("shipping", this.countryName);
  }

}
