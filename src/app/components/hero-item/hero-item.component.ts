import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.css']
})
export class HeroItemComponent implements OnInit {
  @Input("data-hero") heroData: any;
  
  // Tạo sự kiện childCall
  @Output('childCall') call = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  remove(){
    console.log(1);
    this.call.emit(this.heroData); // kết  nối giữ cha và con
    
  }

}
