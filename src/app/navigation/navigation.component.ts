import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';

import { UtilitiesService } from '../services/utilities.service';
import { ParamsService } from '../services/params.service';
import { DefaultService } from '../services/default.service';
import { DataService } from '../services/data.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  categoryId: any;
  filteredProducts: Array<any> = [];
  tempFilteredProducts: Array<any> = [];
  setClickedRow: Function;
  selectedRow: Number;
  ln: string;
  cn: string;

  constructor(private dataService: DataService, private defaultService: DefaultService,
    private paramsService: ParamsService, private activatedRoute: ActivatedRoute, private router: Router,
    private utilitiesService: UtilitiesService, private translateService: TranslateService) {
    translateService.addLangs(["en", "fr"]);
    translateService.setDefaultLang('en');
    let browserLang = translateService.getBrowserLang();
    translateService.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }
    this.activatedRoute.params.subscribe(routingUrl => {
      console.log("====>", routingUrl.ln);

    });
    console.log("navigaton called");
  }

  menus: Array<any> = [];

  ngOnInit() {



    this.defaultService.getCategories().subscribe(response => {
      this.menus = response;
    });

    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        let tempParams = data.state.root.firstChild.params;
        this.ln = tempParams.ln;
        this.cn = tempParams.cn;
      }
    });

  }

  reloadproduct(menu, category, subCategory) {
    console.log(menu)
    console.log(category)
    console.log(subCategory)
    // let obj = {}
    this.router.navigate(['/shop/' + this.cn + "/" + this.ln + "/" + menu.menuId + "/" + category.categoryId + "/" + subCategory.id]);
  }
  switchLanguage(language: string) {

  }

  /**
  * 
  * @param event 
  * @param value 
  * Product Search Filter 
  */
  onSearchProduct(event, value) {
    console.log(value)
    console.log("filteredProd", this.filteredProducts)
    this.paramsService.fp.subscribe(response => {
      this.filteredProducts = response;
    })
    if (event.key == 'Enter') {
      if (value) {
        this.defaultService.getProducts().subscribe(response => {
          let arr = this.utilitiesService.searchFilter(response, value);
          this.paramsService.setFilteredProducts(arr);
        });
      } else {
        this.paramsService.oProducts.subscribe(response => {
          this.paramsService.setFilteredProducts(response);
        });
      }
    }
  }
  selectMenu(menu) {
    this.defaultService.getCategories().subscribe(response => {
      this.categoryId = response.filter(res => res.menuId == menu.menuId)[0].categories[0]
      this.router.navigate(["/shop", this.cn, this.ln, menu.menuId, this.categoryId.categoryId])
    })
  }

}
