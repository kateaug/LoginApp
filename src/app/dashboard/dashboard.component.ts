import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 quote = 'Loading...';
 email = 'Getting your email';

 constructor(private userService: UserService, private router: Router) { }

 ngOnInit() { 

 	this.userService.getData().subscribe(data => {
 	if(data.status) {
 	   this.quote = data.quote;
   	   this.email = data.email;
 	} else {
 		this.router.navigate(['logout']);
 	}	
   });

 }

  onUpdateQuote(event) {
  	const value = event.target.parentNode.querySelector('#myQuote').value
  	this.userService.updateQuote(value).subscribe(data => {
  		if(data.success) {
  			alert('Your quote was updated')
  		} else {
  			alert('Problem')
  		}
  	})
  }


}
