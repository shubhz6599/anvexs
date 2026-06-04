import { Component, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealService } from '../../core/services/reveal.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss',
})
export class Services implements AfterViewInit, OnDestroy {
  private reveal = inject(RevealService);

  services = [
    { icon: '⚡', title: 'WEB DEVELOPMENT', badge: 'MOST POPULAR', body: 'Full-stack web platforms from architecture to deployment. Angular 21, React 19, Vue.js, Next.js, Nest.js, Java with Spring Boot, .NET / C# Python, Django, FastAPI Node.js ecosystems with SQL, SQL lite MongoDB, VECTOR, Redis and PostgreSQL.', features: ['Custom SaaS platform development', 'E-commerce & marketplace builds', 'Real-time dashboards & analytics', 'API design & microservices architecture', 'DevOps, CI/CD & cloud deployment (AWS/GCP)'], },
    { icon: '📱', title: 'APP DEVELOPMENT', badge: '', body: 'Cross-platform mobile apps that perform like native — built in React Native and Flutter with full backend integration.', features: ['iOS & Android dual deployment', 'Offline-first architecture', 'Push notifications & real-time sync', 'App Store & Play Store submission', 'Ongoing maintenance & versioning'], },
    { icon: '🤖', title: 'AI INTEGRATION', badge: 'TRENDING', body: 'Production-grade AI systems — LLM chatbots to computer vision pipelines. We build what\'s actually useful, not demos.', features: ['RAG & knowledge-base chatbots', 'LLM fine-tuning & prompt engineering', 'Computer vision & image analysis', 'Predictive analytics & forecasting', 'AI workflow automation'], },
    { icon: '🎮', title: 'GAME DEVELOPMENT', badge: '', body: 'From mobile hyper-casual games to enterprise gamification. Immersive experiences that drive engagement.', features: ['Unity & Unreal Engine 5 games', 'WebGL & Three.js browser games', 'Multiplayer networking & backend', 'Gamified training & HR platforms', 'AR/VR prototyping'], },
    { icon: '🎓', title: 'COLLEGE PROJECTS', badge: '', body: 'Mentored, production-grade final-year projects and live internships. Build something you\'re actually proud of.', features: ['Full-stack project mentorship', 'AI/ML project specialisation', '3-month paid internships', 'Industry-standard code reviews', 'Placement referrals & certificates'], },
    { icon: '📈', title: 'DIGITAL MARKETING', badge: '', body: 'Growth that compounds. SEO, performance ads, and brand architecture into a unified acquisition machine.', features: ['Technical SEO & content strategy', 'Google Ads & Meta performance campaigns', 'Conversion rate optimisation', 'Brand identity & visual systems', 'Monthly analytics reporting'], },
  ];

  process = [
    { num: '01', title: 'DISCOVERY',     body: 'Deep-dive into requirements, tech landscape, and success metrics. We don\'t guess.' },
    { num: '02', title: 'ARCHITECTURE',  body: 'System design, tech stack selection, and sprint planning before a line of code.' },
    { num: '03', title: 'BUILD',         body: 'Agile 2-week sprints with real-time demos. You see progress every fortnight.' },
    { num: '04', title: 'LAUNCH',        body: 'Staged deployment, performance hardening, load testing, and go-live support.' },
  ];

  techStack = [
    { label: 'Frontend',   techs: ['Angular 18', 'React 19', 'Vue 3', 'Next.js', 'Three.js', 'WebGL'] },
    { label: 'Backend',    techs: ['Node.js', 'Express', 'NestJS', 'Python', 'FastAPI', 'GraphQL'] },
    { label: 'Mobile',     techs: ['React Native', 'Flutter', 'Expo', 'Capacitor'] },
    { label: 'Database',   techs: ['MongoDB', 'PostgreSQL', 'Redis', 'Supabase', 'Firebase'] },
    { label: 'AI / ML',    techs: ['LangChain', 'OpenAI', 'TensorFlow', 'PyTorch', 'HuggingFace'] },
    { label: 'Cloud',      techs: ['AWS', 'GCP', 'Azure', 'Docker', 'Kubernetes', 'Terraform'] },
  ];

  ngAfterViewInit() { this.reveal.init(); }
  ngOnDestroy()     { this.reveal.destroy(); }
}
