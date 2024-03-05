import {Component} from '@angular/core';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  showImageFlag: boolean = false;
  isHidden = false;

  showImage(imageNumber: number): void {
    this.showImageFlag = true;
  }

  hideImage(): void {
    this.showImageFlag = false;
  }
}
