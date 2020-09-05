import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  closeTray(){
    document.getElementById("side-panel").classList.add('collapsed');
  }
  openTray(){
    document.getElementById("side-panel").classList.remove('collapsed');
  }
}
