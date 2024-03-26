import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  blogs = [
    // {
    //   title: 'Space Owner',
    //   date: 'Dec 22, 2023',
    //   image: '../../assets/image1.webp',
    //   content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    // },
    // {
    //   title: '5 Star Hotel',
    //   date: 'Mar 15, 2023',
    //   image: '../../assets/image2.webp',
    //   content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    // },
    // {
    //   title: ' Space Owner team',
    //   date: 'Jan 05, 2023',
    //   image: 'https://cdn.tailgrids.com/2.0/image/application/images/blogs/blog-01/image-01.jpg',
    //   content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    // },
    {
      title: 'Teasting Team',
      date: 'Dec 22, 2023',
      image: 'https://cdn.tailgrids.com/2.0/image/application/images/blogs/blog-01/image-02.jpg',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      title: 'Meeting',
      date: 'Mar 15, 2023',
      image: 'https://cdn.tailgrids.com/2.0/image/application/images/blogs/blog-01/image-03.jpg',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      title: 'Library',
      date: 'Jan 05, 2023',
      image: '../../assets/image3.webp',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    }
  ];
  ngOnInit(): void {
    initFlowbite();
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".gs_reveal").forEach((elem :any) => {
      this.hide(elem);
      
      ScrollTrigger.create({
        trigger: elem,
        // markers: true,
        onEnter: () => { this.animateFrom(elem) },
        onEnterBack: () => { this.animateFrom(elem, -1) },
        onLeave: () => { this.hide(elem) }
      });
    });
  }
   
    animateFrom(elem: HTMLElement, direction: number = 1) {
      direction = direction || 1;
      let x = 0,
          y = direction * 100;
      if(elem.classList.contains("gs_reveal_fromLeft")) {
        x = -100;
        y = 0;
      } else if (elem.classList.contains("gs_reveal_fromRight")) {
        x = 100;
        y = 0;
      }
      elem.style.transform = `translate(${x}px, ${y}px)`;
      elem.style.opacity = "0";
      gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
        duration: 1.25, 
        x: 0,
        y: 0, 
        autoAlpha: 1, 
        ease: "expo", 
        overwrite: "auto"
      });
    }
  
    hide(elem: HTMLElement) {
      gsap.set(elem, {autoAlpha: 0});
    }
}
