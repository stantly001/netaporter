import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';

import { UtilitiesService } from '../services/utilities.service';
import { ParamsService } from '../services/params.service';
import { DefaultService } from '../services/default.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  filteredProducts: Array<any> = [];
  tempFilteredProducts: Array<any> = [];
  setClickedRow: Function;
  selectedRow: Number;
  ln:string;
  cn:string;

  constructor(private dataService:DataService,private defaultService:DefaultService,
    private paramsService:ParamsService,private activatedRoute:ActivatedRoute,private router:Router,
    private utilitiesService:UtilitiesService) {

    this.setClickedRow = function (index) {
      this.selectedRow = index;
    }

  }

  menus:Array<any>=[];


  ngOnInit() {

    console.log("navigaton called");
    
    this.defaultService.getCategories().subscribe(response => {
      this.menus = response;
    });

    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        console.log(data.state.root.firstChild.params);
        let tempParams= data.state.root.firstChild.params;
        this.ln = tempParams.ln;
        this.cn = tempParams.cn; 
      }
    });

  }

  reloadproduct(menu, category, subCategory){
    console.log(menu)
    console.log(category)
    console.log(subCategory)
    // let obj = {}
    this.router.navigate(['/shop/'+this.cn+"/"+this.ln+"/"+menu.menuId+"/"+category.categoryId+"/"+subCategory.id]);
  }

   /**
   * 
   * @param event 
   * @param value 
   * Product Search Filter 
   */
  onSearchProduct(event, value) {
    console.log(value)
    console.log("filteredProd",this.filteredProducts)
    this.paramsService.fp.subscribe(response => {
      this.filteredProducts=response;
    })
    if (event.key == 'Enter') {
      let arr = (value) ? this.utilitiesService.searchFilter(this.filteredProducts, value) : this.tempFilteredProducts;
      console.log(this.utilitiesService.searchFilter(this.filteredProducts, value));
      console.log(this.tempFilteredProducts)
      console.log(arr)
      this.paramsService.setFilteredProducts(arr);
      this.router.navigate([], {relativeTo: this.activatedRoute,queryParams: {
        srchKey:value
      },
      queryParamsHandling: 'merge',});
      // this.paramsService.setFilteredProducts(arr);
    }
  }

}
