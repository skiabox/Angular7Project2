import { Injectable } from '@angular/core';
import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authChange = new Subject<boolean>();

  private user: User;

  constructor(private router: Router) { }

  //methods
  public registerUser(authData: AuthData): void
  {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  public login(authData: AuthData): void
  {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 10000).toString()
    };
    this.authSuccessfully();
  }

  public logout()
  {
    this.user = null;
    this.authChange.next(false); //instead of emit the boolean when we used event emitter in components (false mean logged out)
    this.router.navigate(['/login']);
  }

  public getUser(): User
  {
    return { ...this.user };  //use spread operator to return a copy of the original object
  }

  public isAuth()
  {
    return this.user !== null;
  }

  //helper methods
  private authSuccessfully(): void
  {
    this.authChange.next(true);   //instead of emit the boolean when we used event emitter in components (true mean logged in)
    this.router.navigate(['/training']);
  }
}
