import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hideHeader: boolean = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideHeader =
          this.activatedRoute.firstChild?.snapshot.data['hideHeader'];
      }
    });
  }
}
