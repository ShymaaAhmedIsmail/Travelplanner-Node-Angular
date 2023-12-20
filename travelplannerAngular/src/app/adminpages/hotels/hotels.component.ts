import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { GlobalserviceService } from 'src/app/services/globalservice.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent {
  hotelsData:any
  hotelsname:any

    model={
      Name:"",
      cityname:"",
      pricePerDay:"",
      images:[]
    }
    editModel={
      Name:"",
      cityname:"",
      pricePerDay:"",
      images:[]
    }
    specifichotel:any
    result:any
    selectedImage: any  = null;
    citesNames:any=[]
    hotelid:any
  constructor(private service :GlobalserviceService,private formBuilder: FormBuilder){}
  ngOnInit(){
    this.service.getallhotels().subscribe(res=>{
      this.hotelsData=res.data
      console.log(this.hotelsData)
    
    })
    this.service.getallcitiesName().subscribe(res=>{
      this.citesNames=res.data
      console.log(this.citesNames)
    
    })

  }
  onImageSelected(event: any) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      this.selectedImage = Array.from(target.files);
      console.log("target",target.files)
      console.log( "selected",this.selectedImage)


    }
  }
 
  submitForm(form : NgForm ) {
   
    if(form.valid){
      console.log("ana valiid")
      let formData=new FormData()
    console.log("marez",this.selectedImage)
    for (const image of this.selectedImage) {
      formData.append('images', image);
    }
      formData.append('Name',this.model.Name)
      formData.append('cityname',this.model.cityname)
      formData.append('pricePerDay',this.model.pricePerDay)
      console.log("form data",form.value)
    
      
      this.service.Addnewhotel(formData).subscribe(res=>{
              this.result=res
              console.log(this.result)
   
      
      })

  
    }
  }

  editForm(form : NgForm  ) {

    if(form.valid){
      console.log("ana valiid")
      let formData=new FormData()
    console.log("marez",this.selectedImage)
    if(this.selectedImage){
      for (const image of this.selectedImage) {
        formData.append('images', image);
      }  
    }
  else
  {
    formData.append('images', this.specifichotel.images);
  }
      formData.append('Name',this.editModel.Name)
      formData.append('cityname',this.editModel.cityname)
      formData.append('pricePerDay',this.editModel.pricePerDay)
      console.log("form data",form.value)
    
    
      this.service.edithotel(formData,this.hotelid).subscribe(res=>{
              this.result=res
              console.log(this.result)
   
      
      })

  
    }
  }
  
  oneditclick(id:any){
    console.log("id of edit hotel",id)
    this.hotelid=id
this.service.getspecifichotel(id).subscribe(res=>{
  this.specifichotel=res.data
console.log(this.specifichotel)
this.editModel.Name=this.specifichotel.Name
this.editModel.cityname=this.specifichotel.cityname
this.editModel.pricePerDay=this.specifichotel.pricePerDay

})
  }
  deletehotel(i:any){
    let id =this.hotelsData[i]._id
    this.hotelsData.splice(i,1)
    this.service.deletehotel(id).subscribe(res=>{
  
    })
  }

}
