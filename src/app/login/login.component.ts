import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthorizationService,
  	          private router: Router) { }

  ngOnInit() {
  }

  loginUser(event) {
  	event.preventDefault();
  	const target = event.target;
  	const username = target.querySelector('#username').value;
  	const password = target.querySelector('#password ').value;

  	this.authService.getUserDetails(username, password).subscribe(data => {
       if(data.success) {
     	//redirect person to /admin
       	this.router.navigate(['dashboard'])
       	this.authService.setLoggedIn(true)
       } else {
       	window.alert(data.message)
       }
  	})
  	console.log(username, password);
  }

}
