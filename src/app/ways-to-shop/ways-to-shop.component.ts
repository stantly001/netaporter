import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefaultService } from '../services/default.service';

@Component({
  selector: 'app-ways-to-shop',
  templateUrl: './ways-to-shop.component.html',
  styleUrls: ['./ways-to-shop.component.css']
})
export class WaysToShopComponent implements OnInit {

  ln: any;
  cn: any;
  moreCategories: any;
  categories: any;
  menuId: any;
  categoryId: any;
  constructor(private activatedRoute: ActivatedRoute,private defaultService:DefaultService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(response => {
      console.log(response);
      this.cn=response.cn;
      this.ln=response.ln;
      this.menuId=response.menuId;
      this.categoryId=response.categoryId;
      this.defaultService.getCategories().subscribe(response=>{
        console.log("122",response)
      this.categories=response.filter(res=>res.menuId==this.menuId)[0].categories;
      this.moreCategories=this.categories.filter(res=>res.categoryId==this.categoryId)
      console.log(this.moreCategories);
      })
    })
  }

}
