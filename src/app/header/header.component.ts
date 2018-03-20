import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menus:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.http.get('assets/datas/menu.json').subscribe(response=>{
      this.menus = response;
    });
  }

}
