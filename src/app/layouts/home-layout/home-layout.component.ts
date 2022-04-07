import { AuthService } from './../../shared/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { NodeService } from 'src/app/shared/services/node.service';

@Component({
  selector: 'app-home-layout',
  providers: [NodeService],
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css'],
})
export class HomeLayoutComponent implements OnInit {
  // node?: Node;
  search: any;
  isLoggedIn: boolean = false;
  loggedInUser: any = null;
  constructor(
    private authService: AuthService,
    private nodeService: NodeService
  ) {}

  ngOnInit() {
    this.authService.logInUser.subscribe((user) => {
      console.log('Home login', user);
      if (user.email != undefined && user.googleId != undefined) {
        this.isLoggedIn = true;
        this.loggedInUser = user;
      }
    });
  }
  logout(): void {
    this.authService.logout();
  }
}
