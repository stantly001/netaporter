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

  activeIndex: number;
  removeSelectedIndex: Function;
  categoryId: any;
  filteredProducts: Array<any> = [];
  tempFilteredProducts: Array<any> = [];
  setClickedRow: Function;
  setMenuClickedRow: Function;
  selectedRow: Number;
  selectedMenuRow: Number;
  removeMsg: string;
  ln: string;
  cn: string;

  constructor(private dataService: DataService, private defaultService: DefaultService,
    private paramsService: ParamsService, private activatedRoute: ActivatedRoute, private router: Router,
    private utilitiesService: UtilitiesService, private translateService: TranslateService) {
    translateService.addLangs(["en", "fr"]);
    translateService.setDefaultLang('en');
    let browserLang = translateService.getBrowserLang();
    translateService.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.removeMsg = ""
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }

    this.setMenuClickedRow = function (index) {
      // this.removeMsg = ""
      this.selectedMenuRow = index;
    }

    this.removeSelectedIndex = function () {
      this.removeMsg = "removeMouse"
    }
  }

  menus: Array<any> = [];

  ngOnInit() {

    this.selectedMenuRow = -1;
    this.defaultService.getCategories().subscribe(response => {
      this.menus = response;
    });

    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        let tempParams = data.state.root.firstChild.params;
        this.ln = tempParams.ln;
        this.cn = tempParams.cn;
        this.activeIndex = tempParams.menuId - 1;
      }
    });

  }

  /**
  * 
  * @param event 
  * @param value 
  * Product Search Filter 
  */
  onSearchProduct(event, value) {
    console.log(value)
    let arr: Array<any> = [];
    if (event.key == 'Enter') {
      if (value) {
        this.paramsService.fp.subscribe(response => {
          arr = this.utilitiesService.searchFilter(response, value);
        })
        this.paramsService.setFilteredProducts(arr);
      } else {
        this.paramsService.oProducts.subscribe(response => {
          this.paramsService.setFilteredProducts(response);
        });
      }
    }
  }

  /**
   * 
   * @param menu 
   * When click in menu, function is called and returns the selected menu first category name
   */
  selectMenu(menu) {
    this.defaultService.getCategories().subscribe(response => {
      this.categoryId = response.filter(res => res.menuId == menu.menuId)[0].categories[0]
      this.router.navigate(["/shop", this.cn, this.ln, menu.menuId, this.categoryId.categoryId]);
    })
  }

}
