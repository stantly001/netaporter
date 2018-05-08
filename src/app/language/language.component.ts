import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RoutesRecognized } from '@angular/router';

import { DefaultService } from '../services/default.service';
import { ParamsService } from '../services/params.service';
import { UtilitiesService } from '../services/utilities.service';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  ln: string;
  langName: string;
  languages: Array<any> = [];
  tempParams: Object;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private utilitiesService: UtilitiesService, private defaultService: DefaultService, private translateService: TranslateService) {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        let paramObj = data.state.root.firstChild.params;
        this.tempParams = paramObj;
        this.ln = paramObj.ln;
      }
    });
  }

  ngOnInit() {
    this.defaultService.getLanuage().subscribe(response => {
      this.languages = response;
      this.langName = this.utilitiesService.filterSelectedObj(response, this.ln, "languageShortName").languageName;
    });
  }

  /**
   * 
   * @param lang 
   * update Country Language
   */
  updateLanguage(lang) {
    let qParams: { [k: string]: any } = {};
    this.activatedRoute.queryParams.subscribe(response => {
      qParams = response;
    });
    this.ln = lang.languageShortName;
    this.langName = lang.languageName
    let routeUrl =  this.utilitiesService.buildUrl('language', this.ln, this.tempParams);
    this.router.navigate([routeUrl], { queryParams: qParams });
    this.translateService.use(this.ln);
  }


}
