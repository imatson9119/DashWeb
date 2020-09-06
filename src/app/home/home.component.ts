import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type')
    .append('Access-Control-Allow-Methods', 'POST')
    .append('Access-Control-Allow-Origin', '*');

    this.http.post('https://us-central1-dash-66822.cloudfunctions.net/pingLocation', 
    { plateNumber: "CKJ4091", latitude: 52, longitude: 53}).subscribe(data => {
      console.log(data);
    });

    this.http.post('https://us-central1-dash-66822.cloudfunctions.net/getAlerts', { plateNumber: "CKJ4091", latitude: 52, longitude: 53}).subscribe((data) => {
      console.log(data);
    });
  }
  closeTray(){
    document.getElementById("side-panel").classList.add('collapsed');
  }
  openTray(){
    document.getElementById("side-panel").classList.remove('collapsed');
  }
}
