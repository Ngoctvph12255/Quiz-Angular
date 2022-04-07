import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SetingService } from 'src/app/shared/services/seting.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  isCollapsed = false;

  constructor(
    public setingService: SetingService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  logoutAdmin(): void {
    this.authService.logoutAdmin();
  }
}
