import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  //emit event back to the app.component.html to close the sidenav by creating a custom event
  @Output()
  public sidenavToggle = new EventEmitter<void>();    //void show a generic type - no payload needed here (on the receiver the event is called sidenavToggle)

  public isAuth: boolean;   //true if user is logged in or false if user is logged out

  //since we are subscribing to a service we will use a subscription property to properly subscribe/unsubscribe
  public authSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  //methods
  public onToggleSidenav()
  {
    this.sidenavToggle.emit();  //emit an event every time we click the emit button
  }

  public onLogout()
  {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
