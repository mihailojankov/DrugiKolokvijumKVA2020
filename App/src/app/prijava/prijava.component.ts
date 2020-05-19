import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { build$ } from 'protractor/built/element';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  loginForma;
  payload;
  token;

  constructor(private builder:FormBuilder, private http:HttpClient, private router:Router) { 
    this.loginForma = builder.group({
      username:"",
      password:""
    });
  }

  ngOnInit(): void {
    
  }

  login(item){
    this.http.put<any>("http://localhost:8081/api/login/", item).subscribe(data =>{
      window.sessionStorage.setItem("token", data.token);
      this.token = data.token;
      this.payload = JSON.parse(atob(this.token.split('.')[1]));

      if(this.payload.rola == "ROLE_USER"){
        this.router.navigate(["oKorisniku"]);
      }
      if(this.payload.rola == "ROLE_ADMIN"){
        this.router.navigate(["adminPanel"]);
      }
  });

  }
}
