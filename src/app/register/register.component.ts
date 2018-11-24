import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService,
  	          private router: Router) { }

  ngOnInit() {
  }

  registerUser(event) {
  	event.preventDefault();
  	const error = [];
  	const target = event.target;
  	const username = target.querySelector('#username').value;
  	const password = target.querySelector('#password ').value;
  	const cpassword = target.querySelector('#cpassword ').value;

    if(password != cpassword) {
    	error.push('Passwords do not match!');
    }

    if(error.length === 0) {
      this.authorizationService.registerUser(username, password).subscribe(data => {
      	console.log(data)
      	if(data.success) {
      		this.router.navigate(['dashboard'])
      	}
      })
    }
  
  	console.log(username, password);
  }

}
