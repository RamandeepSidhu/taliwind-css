// scroll-animation.directive.ts
import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
})
export class ScrollAnimationDirective {
  constructor(private el: ElementRef) {}

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // Adjust the threshold value as needed based on when you want the animation to start
    const threshold = 200;
    if (scrollPosition > threshold) {
      // Add your animation logic here
      this.el.nativeElement.classList.add('scroll-animation-class');
    } else {
      // Reset animation if scrolled back above the threshold
      this.el.nativeElement.classList.remove('scroll-animation-class');
    }
  }
}
