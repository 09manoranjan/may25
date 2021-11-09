import { Component,OnInit } from '@angular/core';
import { CommonServiceService } from './common-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular Project of May 25';
  showUpdate = false;
  allUserdata:any;existingUsermail:any= [];
  userObj = {
    userName: "",
    phone: "",
    email: "",
    address: "",
    id: ""
  }
  constructor(private service:CommonServiceService){}
  ngOnInit(){
    this.getUserData();
  }
  addData(val){
    console.log("value received----------->",val)
    if(this.existingUsermail.includes(val.email)){
      alert("Existing Data");
    }
    else if(val.email == ""){
      alert("No Data Found !");
    }
    else{
      this.service.createUser(val).subscribe((response)=>{
        console.log("User has been added------------->\n\n",response);
        this.getUserData();
        this.showUpdate = false;
      })
    }
  }
  getUserData(){
    this.service.getAllUsers().subscribe((data)=>{
      this.allUserdata = data;
      this.allUserdata.forEach(element => {
        this.existingUsermail.push(element.email);
        })
    })
  }
  editUser(val){
    this.userObj = val;
    this.showUpdate = true;
  }
  updateData(){
    this.service.updateUser(this.userObj).subscribe(()=>{
      this.getUserData();
      this.showUpdate = false;
    })
  }
  deleteUser(val){
    this.service.deleteUser(val).subscribe(()=>{
      this.getUserData();
    })
  }
}
