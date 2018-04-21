import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { forkJoin } from "rxjs/observable/forkJoin";
import { ActivatedRoute, Params, Router, CanLoad } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  constructor() {}
  ngOnInit() { }
}
