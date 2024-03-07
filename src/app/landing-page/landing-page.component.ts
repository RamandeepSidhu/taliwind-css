import {Component, HostListener} from '@angular/core';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  showImageFlag: boolean = false;
  isHidden = false;
  services = [
    { id: 1, title: 'Fitness Blog', description: 'Elevate your fitness journey with expert tips, workout routines, and healthy living inspiration. Join us on the path to a stronger, happier, and more vibrant you.', expanded: false },
    { id: 1, title: 'Fashion and Style Blog', description: 'Step into the world of fashion and express your unique style. Get inspired by the latest trends, styling tips, and stories that celebrate individuality.', expanded: false },
    { id: 1, title: 'Space Owner', description: 'Unlock the doors to knowledge with our curated educational content. From fascinating facts to in-depth explorations, we make learning an enriching experience. ', expanded: false },
    { id: 1, title: 'Educational Platform', description: ' Unlock the doors to knowledge with our curated educational content. From fascinating facts to in-depth explorations, we make learning an enriching experience. ', expanded: false },
    { id: 1, title: 'Inspiration Hub ', description: ' Ignite your creativity, motivation, and curiosity. Explore stories of resilience, innovation, and the extraordinary individuals shaping our world.', expanded: false },

  ];
  toggleAccordion(service:any): void {
    this.services.forEach(s => {
      if (s !== service) {
        s.expanded = false;
      }
    });
    service.expanded = !service.expanded;
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    const clickedInside = this.isDescendantOfAccordion(event.target as Node);
    if (!clickedInside) {
      this.services.forEach(s => (s.expanded = false));
    }
  }

  private isDescendantOfAccordion(target: Node): boolean |null {
    const accordionContainer = document.querySelector('.m-2');
    return accordionContainer && accordionContainer.contains(target);
  }
 ngOninit() {
  
 }
}
