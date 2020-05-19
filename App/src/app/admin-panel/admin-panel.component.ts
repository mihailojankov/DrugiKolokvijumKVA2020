import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  dodavanjeForm;
  izmenaForm;


  constructor(private builder:FormBuilder, private http:HttpClient) { 
    this.dodavanjeForm = builder.group({
      username:"",
      password:"",
      rola:""
    });
  }

  ngOnInit(): void {
  }

  dodaj(item:User){

    let token = window.sessionStorage.getItem("token");

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token': token
      })
    };

    let k = {username:item.username, password:item.password, rola:item.rola} as User;
    console.log(JSON.stringify(item.username) + " " + typeof(item));
    this.http.put<User>("http://localhost:8081/api/register/",k, httpOptions).subscribe(data => {
      console.log("Uspesno dodat");
    })
  }

}
