import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  admin(){
    console.log("navegar a ");
    this.router.navigateByUrl('admin')
  }
  bienvenida(){
    console.log("navegar a ");
    this.router.navigateByUrl('bienvenida')
  }
  listado(){
    console.log("navegar a ");
    this.router.navigateByUrl('listado')
  }
  toLogin(){
    console.log("navegar a ");
    this.router.navigateByUrl('login')
  }
}
