import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
@Input() childData?:String;
@Output() childMsg = new EventEmitter();
ngOnInit():void {
console.log(this.childData);
this.childMsg.emit("data from Child");
}

}
