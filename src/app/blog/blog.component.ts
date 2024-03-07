import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent {
  blogs = [
    {
      title: 'Space Owner',
      date: 'Dec 22, 2023',
      image: '../../assets/image1.webp',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      title: '5 Star Hotel',
      date: 'Mar 15, 2023',
      image: '../../assets/image2.webp',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
    {
      title: ' Space Owner team',
      date: 'Jan 05, 2023',
      image: 'https://cdn.tailgrids.com/2.0/image/application/images/blogs/blog-01/image-01.jpg',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
    },
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
  }
  
}
