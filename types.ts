
export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  image: string;
  videoUrl?: string;
  summary: string;
  deliverables: string[];
  results: string[];
  gallery: string[];
}

export interface Tournament {
  id: string;
  title: string;
  status: 'Live' | 'Upcoming' | 'Completed';
  date: string;
  prizePool: string;
  game: string;
  image: string;
  summary: string;
  format: string;
  schedule: { time: string; activity: string }[];
  highlightVideo?: string;
}

export interface Service {
  id: string;
  title: string;
  benefit: string;
  deliverables: string[];
  icon: string;
}
