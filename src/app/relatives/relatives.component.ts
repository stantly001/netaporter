import { Component, OnInit } from '@angular/core';
import { DefaultService } from '../services/default.service';

@Component({
  selector: 'app-relatives',
  templateUrl: './relatives.component.html',
  styleUrls: ['./relatives.component.css']
})
export class RelativesComponent implements OnInit {

  constructor(private defaultService:DefaultService) { }
  
  ads:Array<any>=[];
  
  ngOnInit() {

    /**
     * Ads in Section Bottom Call
     */
    this.defaultService.getAds().subscribe(response => {
      this.ads = response;
    });
  }

}
