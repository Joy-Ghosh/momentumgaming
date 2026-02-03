
import { Project, Tournament, Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'white-label',
    title: 'White Label Solutions',
    benefit: 'End-to-end tournament infrastructure branded as your own.',
    deliverables: ['Custom platform integration', 'Full league management', 'Sponsor management tools'],
    icon: 'Shield'
  },
  {
    id: 'production',
    title: 'Esports Production',
    benefit: 'Broadcast-quality streams that rival traditional television.',
    deliverables: ['Remote & on-site production', 'AR/VR stage sets', 'Multilingual commentary'],
    icon: 'Tv'
  },
  {
    id: 'brand-integration',
    title: 'Brand Integration',
    benefit: 'Organic placements that resonate with the gaming audience.',
    deliverables: ['In-game asset creation', 'Commercial segment production', 'Influencer matching'],
    icon: 'Users'
  },
  {
    id: 'graphics-motion',
    title: 'Graphics & Motion',
    benefit: 'Visual identity that defines your tournament energy.',
    deliverables: ['Dynamic HUD design', 'Opening cinematics', 'Live overlay systems'],
    icon: 'Layers'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'cyber-clash-2024',
    title: 'Cyber Clash Pro Series',
    category: 'Full Production',
    client: 'Apex Tech',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200',
    summary: 'A 12-week professional league featuring the top 20 global teams in high-stakes competition.',
    deliverables: ['Live Broadcast', 'Motion Graphics', 'Event Management'],
    results: ['2.5M+ Peak Viewers', '150M+ Social Impressions', '100% Brand Recall for Lead Sponsor'],
    gallery: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800'
    ]
  },
  {
    id: 'neo-pulse-invitational',
    title: 'Neo Pulse Invitational',
    category: 'Brand Integration',
    client: 'Hyper Energy',
    image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&q=80&w=1200',
    summary: 'Leveraging high-energy branding for a fast-paced mobile gaming tournament.',
    deliverables: ['Custom AR Overlays', 'Branded Segments', 'Social Content'],
    results: ['+45% Brand Sentiment', '500k New App Signups', 'Sold Out Physical Arena'],
    gallery: [
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=800'
    ]
  }
];

export const TOURNAMENTS: Tournament[] = [
  {
    id: 'summer-showdown',
    title: 'Summer Showdown 2024',
    status: 'Upcoming',
    date: 'Aug 15 - Aug 20',
    prizePool: '$100,000',
    game: 'Valorant',
    image: 'https://images.unsplash.com/photo-1560253023-3ee71f219fa0?auto=format&fit=crop&q=80&w=1200',
    summary: 'The biggest regional qualifier for the world stage.',
    format: 'GSL Groups to Single Elimination',
    schedule: [
      { time: '10:00 AM', activity: 'Opening Ceremony' },
      { time: '11:30 AM', activity: 'Quarter Finals' },
      { time: '04:00 PM', activity: 'Semi Finals' }
    ]
  },
  {
    id: 'winter-majors',
    title: 'Winter Majors',
    status: 'Completed',
    date: 'Dec 12 - Dec 18',
    prizePool: '$250,000',
    game: 'CS2',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
    summary: 'A record-breaking winter event held in the heart of Berlin.',
    format: 'Swiss System',
    schedule: [],
    highlightVideo: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];
