import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-podaci-okorisniku',
  templateUrl: './podaci-okorisniku.component.html',
  styleUrls: ['./podaci-okorisniku.component.css']
})
export class PodaciOKorisnikuComponent implements OnInit {

  korisnici:User[] = [];
  token:string;


  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.dobaviPodatke();
  }

  dobaviPodatke(){
    this.token = window.sessionStorage.getItem("token");


    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token': this.token
      })
    };

    this.http.get<User[]>("http://localhost:8081/api/users/", httpOptions).subscribe(data => {
      this.korisnici = data;
      console.log(this.korisnici);
    })
  }
  

}
