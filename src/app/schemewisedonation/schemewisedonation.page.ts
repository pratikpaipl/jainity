import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-schemewisedonation',
  templateUrl: './schemewisedonation.page.html',
  styleUrls: ['./schemewisedonation.page.scss'],
})
export class SchemewisedonationPage implements OnInit {

  items:any=[];
  constructor(private location: Location) { 
    
    for(let i = 0; i <= 4; i++){
      this.items.push('SCHEME GROUP Wise Donation '+(i+1));
    }
  }

  ngOnInit() {
  }

  onBackClick(){
    this.location.back();
   }
}