import { Component, Input } from '@angular/core';
import { GlobalserviceService } from 'src/app/services/globalservice.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent {
  alltravelsbyid:any
  @Input() public travelid:any
  constructor(private service: GlobalserviceService){
    console.log(this.travelid)
  }
  ngOnInit(){
    this.service.gettravelbyid(this.travelid).subscribe(res=>{
this.alltravelsbyid=res
console.log(this.alltravelsbyid)
    })
  }
}
