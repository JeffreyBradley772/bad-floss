import { Brand } from '../types';

export const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'FlossMaster 3000',
    company: 'DentalCorp Inc.',
    averageRating: 2.1,
    totalReviews: 42,
    description: 'Premium waxed dental floss with mint flavor',
    price: '$4.99',
    type: 'Traditional',
    imageUrl: null,
    reviews: [
      {
        id: '1',
        userId: 'user1',
        rating: 1,
        title: 'The Great Unraveling Disaster',
        content: 'I was excited to try this "premium" floss, but it started shredding between my teeth like a cotton candy machine gone wrong. Had to spend 20 minutes picking out tiny floss fragments. Not the dental care experience I was hoping for.',
        pros: ['Nice mint flavor', 'Attractive packaging'],
        cons: ['Shreds easily', 'Leaves fragments between teeth', 'Expensive for what it is'],
        userName: 'Disappointed Dentist',
        createdAt: new Date('2025-01-15T08:30:00Z')
      }
    ]
  },
  {
    id: '2',
    name: 'DentalPro Glide',
    company: 'OralCare Solutions',
    averageRating: 4.7,
    totalReviews: 128,
    description: 'Advanced non-shredding dental floss with comfort grip',
    price: '$5.99',
    type: 'Traditional',
    imageUrl: null,
    reviews: [
      {
        id: '2',
        userId: 'user3',
        rating: 5,
        title: 'Finally, A Floss That Works!',
        content: 'After years of struggling with inferior floss, this one actually glides between teeth without breaking. The grip is comfortable, and it doesn\'t make that squeaky noise that makes my skin crawl.',
        pros: ['Doesn\'t break', 'Comfortable grip', 'No squeaky noise', 'Actually glides'],
        cons: ['A bit pricey', 'Could be mintier'],
        userName: 'FlossEnthusiast',
        createdAt: new Date('2025-01-20T15:45:00Z')
      }
    ]
  },
  {
    id: '3',
    name: 'QuickFloss Sticks',
    company: 'ConvenientCare Products',
    averageRating: 1.8,
    totalReviews: 89,
    description: 'Disposable floss picks for on-the-go dental care',
    price: '$3.99',
    type: 'Floss Picks',
    imageUrl: null,
    reviews: [
      {
        id: '3',
        userId: 'user4',
        rating: 2,
        title: 'The Case of the Disappearing Floss Stick',
        content: 'These floss sticks seem to have a death wish. They snap at the slightest pressure, usually right when you\'re trying to reach those back molars. I\'ve gone through half a pack just to properly floss once. At least they make a satisfying snap sound when they break?',
        pros: ['Convenient size', 'Good for travel'],
        cons: ['Breaks easily', 'Wasteful', 'Poor quality plastic', 'Expensive per use'],
        userName: 'BrokenFlossCollector',
        createdAt: new Date('2025-01-25T12:20:00Z')
      }
    ]
  },
  {
    id: '4',
    name: 'Arctic Blast Floss',
    company: 'Fresh Breath Labs',
    averageRating: 3.5,
    totalReviews: 67,
    description: 'Extra strong mint flavored dental floss',
    price: '$4.49',
    type: 'Traditional',
    imageUrl: null,
    reviews: [
      {
        id: '4',
        userId: 'user5',
        rating: 3,
        title: 'The Mint Explosion',
        content: 'This floss thinks it\'s a breath mint factory. The mint flavor is so strong it made my eyes water. On the plus side, I can\'t taste anything else for hours, so I guess that solves bad breath? My entire bathroom now smells like a candy cane factory exploded.',
        pros: ['Very strong mint flavor', 'Good thickness', 'Durable'],
        cons: ['Overwhelming mint', 'Can\'t taste food after', 'Expensive'],
        userName: 'MintOverload',
        createdAt: new Date('2025-01-28T09:15:00Z')
      }
    ]
  },
  {
    id: '5',
    name: 'GreenFloss Bamboo',
    company: 'EcoSmile',
    averageRating: 2.3,
    totalReviews: 45,
    description: 'Eco-friendly biodegradable bamboo floss',
    price: '$6.99',
    type: 'Eco-Friendly',
    imageUrl: null,
    reviews: [
      {
        id: '5',
        userId: 'user6',
        rating: 2,
        title: 'The Eco-Warrior\'s Dilemma',
        content: 'I wanted to love this eco-friendly bamboo floss. The packaging is compostable, the floss is biodegradable, but it feels like I\'m flossing with actual bamboo. My gums have never felt so... exfoliated? At least I\'m saving the planet while traumatizing my teeth.',
        pros: ['Eco-friendly', 'Sustainable packaging', 'Good intentions'],
        cons: ['Too rough', 'Hurts gums', 'Feels like twine'],
        userName: 'EcoWarrior',
        createdAt: new Date('2025-02-01T14:30:00Z')
      }
    ]
  }
];
