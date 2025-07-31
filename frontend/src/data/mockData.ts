export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
  url: string;
  isLiked?: boolean;
  genre?: string;
  mood?: string;
}

export interface Playlist {
  id: string;
  name: string;
  cover: string;
  description: string;
  tracks: Track[];
  isLiked?: boolean;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  cover: string;
  year: number;
  tracks: Track[];
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  followers: number;
  genres: string[];
}

export const mockTracks: Track[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    duration: 200,
    url: '#',
    isLiked: true,
    genre: 'Pop',
    mood: 'Energetic'
  },
  {
    id: '2',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    duration: 235,
    url: '#',
    isLiked: false,
    genre: 'Pop',
    mood: 'Happy'
  },
  {
    id: '3',
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    album: 'A Night at the Opera',
    cover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    duration: 355,
    url: '#',
    isLiked: true,
    genre: 'Rock',
    mood: 'Epic'
  },
  {
    id: '4',
    title: 'Watermelon Sugar',
    artist: 'Harry Styles',
    album: 'Fine Line',
    cover: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    duration: 174,
    url: '#',
    genre: 'Pop',
    mood: 'Chill'
  },
  {
    id: '5',
    title: 'Good 4 U',
    artist: 'Olivia Rodrigo',
    album: 'SOUR',
    cover: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    duration: 178,
    url: '#',
    genre: 'Pop',
    mood: 'Angry'
  },
  {
    id: '6',
    title: 'Levitating',
    artist: 'Dua Lipa',
    album: 'Future Nostalgia',
    cover: 'https://images.pexels.com/photos/1784578/pexels-photo-1784578.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    duration: 203,
    url: '#',
    genre: 'Pop',
    mood: 'Dance'
  }
];

export const mockPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Today\'s Top Hits',
    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    description: 'The biggest hits right now',
    tracks: mockTracks.slice(0, 4),
    isLiked: true
  },
  {
    id: '2',
    name: 'Chill Vibes',
    cover: 'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    description: 'Perfect for relaxing',
    tracks: mockTracks.slice(2, 6)
  },
  {
    id: '3',
    name: 'Rock Classics',
    cover: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    description: 'Timeless rock anthems',
    tracks: [mockTracks[2]]
  }
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    title: 'After Hours',
    artist: 'The Weeknd',
    cover: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    year: 2020,
    tracks: [mockTracks[0]]
  },
  {
    id: '2',
    title: '÷ (Divide)',
    artist: 'Ed Sheeran',
    cover: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    year: 2017,
    tracks: [mockTracks[1]]
  }
];

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'The Weeknd',
    image: 'https://images.pexels.com/photos/1687675/pexels-photo-1687675.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
    followers: 45000000,
    genres: ['Pop', 'R&B']
  },
  {
    id: '2',
    name: 'Ed Sheeran',
    image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
    followers: 52000000,
    genres: ['Pop', 'Folk']
  },
  {
    id: '3',
    name: 'Queen',
    image: 'https://images.pexels.com/photos/1687675/pexels-photo-1687675.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
    followers: 28000000,
    genres: ['Rock', 'Classic Rock']
  }
];