import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalserviceService } from 'src/app/services/globalservice.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.css']
})
export class TravelsComponent {
  travelData: any
  travelboolen: boolean = true
  myForm: FormGroup = this.formBuilder.group({
    // Define form controls and their initial values
    cityname: ['', Validators.required],
    hotelid: [''],
    startDate: [''],
    endDate: ['']


  })
  travelsarr: any = []
  hoteldata: any
  citesNames: any
  travelid :any
  constructor(private service: GlobalserviceService, private formBuilder: FormBuilder) {

  }
  travelDetails(id:any) {
    this.travelboolen = !this.travelboolen
    this.travelid=id
    console.log("travel id is ",id)
  }
  ngOnInit() {
    this.service.getalltravels().subscribe(res => {
      this.travelData = res.data
      console.log(this.travelData)
      this.service.getallhotels().subscribe(result => {
        this.hoteldata = result.data
        this.travelData.forEach((element: any) => {

          let hotel = this.hoteldata.find((h: any) => h._id === element.hotelid);
          console.log("api travel", element.hotelid)
          console.log(hotel)


          let travelobj = {
            cityname: element.cityname,
            hotelname: hotel.Name,
            startdate: element.startDate,
            enddate: element.endDate,
            id: element._id
          }
          this.travelsarr.push(travelobj)
          console.log("travel arr after hbd", this.travelsarr)

        })
        
      })

    })

    this.service.getallcitiesName().subscribe(res => {
      this.citesNames = res.data
      console.log(this.citesNames)

    })
  }
  deletetravel(i: any) {
    let id = this.travelData[i]._id
    this.travelData.splice(i, 1)
    this.service.deletetravel(id).subscribe(res => {

    })
  }
  addnewtravel() {
    console.log("annnnnnnnna ")

    this.service.Addnewtravel(this.myForm.value).subscribe(res => {
      console.log(res)
      window.location.reload()
    })






  }
}
