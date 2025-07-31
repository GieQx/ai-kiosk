
import type { Ad } from './types';

// This simulates a knowledge base ingested from a CSV file.
// In a real application, this would be uploaded and processed by a backend.
export const SAMPLE_CSV_KNOWLEDGE_BASE = `
ProductID,ProductName,Category,Price,Stock,Description
101,QuantumLeap X1,Laptops,1299.99,50,"High-performance laptop with 16-inch display, 32GB RAM, and 1TB SSD. Ideal for professionals and creators."
102,StellarSound Pro,Headphones,199.99,250,"Noise-cancelling over-ear headphones with 40-hour battery life and studio-quality audio."
103,EcoGreen Smart Bottle,Accessories,39.99,500,"24oz stainless steel water bottle that tracks intake and glows to remind you to hydrate."
104,FlexiDesk 5000,Office Furniture,499.00,120,"Adjustable standing desk with programmable height settings and a durable bamboo top."
201,Galaxy Rover Drone,Gadgets,899.50,80,"4K camera drone with 30-minute flight time, obstacle avoidance, and a 5-mile range."
202,ChronoWatch Series 7,Wearables,349.00,300,"Smartwatch with ECG, blood oxygen monitoring, and a vibrant always-on display."
`;

// This simulates a rotating list of advertisements.
export const ADS: Ad[] = [
  {
    id: 1,
    type: 'image',
    headline: 'Experience QuantumLeap X1',
    content: 'https://picsum.photos/seed/laptop/800/1200',
    cta: 'Learn More',
  },
  {
    id: 2,
    type: 'text',
    headline: 'StellarSound Pro',
    content: 'Immerse yourself in pure audio. Unmatched clarity, unparalleled comfort. 40 hours of non-stop music.',
    cta: 'Shop Now',
  },
  {
    id: 3,
    type: 'image',
    headline: 'The Future is Wearable',
    content: 'https://picsum.photos/seed/watch/800/1200',
    cta: 'Discover ChronoWatch 7',
  },
    {
    id: 4,
    type: 'text',
    headline: 'Stay Hydrated, Stay Healthy',
    content: 'The EcoGreen Smart Bottle is not just a bottle, it\'s your personal hydration coach.',
    cta: 'Get Yours Today',
  },
];
