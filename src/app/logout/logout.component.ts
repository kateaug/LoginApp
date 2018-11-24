import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authorizationService: AuthorizationService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
   
   this.userService.logout().subscribe(data => {
   	if(data.success) {
   		this.router.navigate([''])
   		this.authorizationService.setLoggedIn(false)
   	} else {
   		window.alert('Error occured!')
   	}
   })

  }

}
