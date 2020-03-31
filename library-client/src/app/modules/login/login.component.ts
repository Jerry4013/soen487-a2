import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginInvalid: boolean;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.authService.login(f.value.username, f.value.password).subscribe(response => {
      if (response) {
        this.authService.isLogin = true;
        this.router.navigate(['/library']);
      } else {
        this.loginInvalid = !response;
      }
    });
    f.reset();
  }
}
