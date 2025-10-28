import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'portfolio-home',
  templateUrl: './portfolio-home.component.html',
  styleUrls: ['./portfolio-home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzGridModule,
    NzTagModule,
    NzToolTipModule
  ]
})
export class PortfolioHomeComponent {

  projects = [
    {
      title: 'LongRunningJobs',
      description: 'Background job processing system with real-time status updates and scalable queue management.',
      technologies: ['Angular', 'C#', '.NET', 'SignalR', 'Background Services'],
      liveDemo: 'https://longrunningjobs-ui.onrender.com',
      github: 'https://github.com/your-username/longrunningjobs',
      status: 'Live on Render',
      statusNote: 'May take 1-2 minutes to wake up from sleep mode',
      image: '/assets/longrunningjobs-preview.png'
    },
    {
      title: 'LessonTree',
      description: 'Full SaaS web application for educational content management with interactive lesson planning and progress tracking.',
      technologies: ['Angular', 'C#', '.NET', 'Entity Framework', 'PostgreSQL'],
      liveDemo: 'https://lessontree-ui.onrender.com',
      github: 'https://github.com/your-username/lessontree',
      status: 'Live on Render',
      statusNote: 'May take 1-2 minutes to wake up from sleep mode',
      image: '/assets/lessontree-preview.png'
    },
    {
      title: 'Lexical Parser',
      description: 'Recipe search query lexical parser that analyzes and processes complex search terms for precise ingredient matching.',
      technologies: ['Angular', 'C#', '.NET', 'Lexical Analysis'],
      liveDemo: 'https://recipefinder-ui.onrender.com',
      github: 'https://github.com/your-username/recipefinder',
      status: 'Live on Render',
      statusNote: 'May take 1-2 minutes to wake up from sleep mode',
      image: '/assets/recipefinder-preview.png'
    },
    {
      title: 'Angular Component Demo',
      description: 'Declarative table wrapper component demonstrating enterprise-grade data grid configuration.',
      technologies: ['Angular', 'TypeScript', 'NgZorro', 'Declarative Configuration'],
      liveDemo: '/table-wrapper',
      github: 'https://github.com/your-username/tablewrapper',
      status: 'Live Demo',
      statusNote: 'Interactive demo available immediately',
      image: '/assets/tablewrapper-preview.png'
    }
  ];

  techStack = [
    { category: 'Frontend', technologies: ['Angular', 'TypeScript', 'NgZorro', 'Angular Material', 'RxJS'] },
    { category: 'Backend', technologies: ['C#', '.NET Core', 'Entity Framework', 'SignalR', 'Web APIs'] },
    { category: 'Database', technologies: ['PostgreSQL', 'SQLite', 'SQL Server'] },
    { category: 'DevOps', technologies: ['Docker', 'Render.com', 'GitHub Actions', 'WSL'] },
    { category: 'Tools', technologies: ['Git', 'Visual Studio Code', 'Postman', 'Chrome DevTools'] }
  ];

  scrollToProjects(): void {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToContact(): void {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}