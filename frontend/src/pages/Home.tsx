import React from 'react';
import { Play, Heart, MoreHorizontal } from 'lucide-react';
import { useMusic } from '../contexts/MusicContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { mockTracks, mockPlaylists } from '../data/mockData';
import { formatTime } from '../utils/formatTime';
import { cn } from '../utils/cn';

export const Home: React.FC = () => {
  const { playTrack, addToQueue, currentTrack, isPlaying } = useMusic();

  const handlePlayTrack = (track: typeof mockTracks[0]) => {
    playTrack(track);
    addToQueue(track);
  };

  const recentlyPlayed = mockTracks.slice(0, 4);
  const trendingSongs = mockTracks.slice(2, 6);
  const recommendedPlaylists = mockPlaylists;

  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <section className="relative">
        <div className="bg-gradient-to-br from-green-900/20 via-gray-900 to-gray-900 rounded-2xl p-8 border border-gray-700">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Good evening
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Discover new music powered by AI recommendations
            </p>
            <Button size="lg" className="px-8">
              Explore Now
            </Button>
          </div>
          <div className="absolute top-4 right-4 w-32 h-32 bg-green-500/10 rounded-full blur-xl" />
          <div className="absolute bottom-4 right-8 w-24 h-24 bg-blue-500/10 rounded-full blur-lg" />
        </div>
      </section>

      {/* Recently Played */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Recently Played</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentlyPlayed.map((track) => (
            <Card
              key={track.id}
              className="group relative overflow-hidden hover:bg-gray-750 transition-all duration-300"
              hover
            >
              <div className="relative">
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-full aspect-square object-cover rounded-lg mb-4"
                />
                <button
                  onClick={() => handlePlayTrack(track)}
                  className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105"
                >
                  <Play className="w-5 h-5 text-black ml-1" />
                </button>
              </div>
              <h3 className="font-semibold text-white truncate">{track.title}</h3>
              <p className="text-sm text-gray-400 truncate">{track.artist}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Trending Songs */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Trending Now</h2>
          <Button variant="ghost" size="sm">
            Show all
          </Button>
        </div>
        <div className="space-y-2">
          {trendingSongs.map((track, index) => (
            <div
              key={track.id}
              className="group flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center justify-center w-6 text-gray-400 group-hover:text-white">
                {currentTrack?.id === track.id && isPlaying ? (
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-green-500 animate-pulse" />
                    <div className="w-1 h-4 bg-green-500 animate-pulse delay-75" />
                    <div className="w-1 h-4 bg-green-500 animate-pulse delay-150" />
                  </div>
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>

              <button
                onClick={() => handlePlayTrack(track)}
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-700 rounded-full transition-all"
              >
                <Play className="w-4 h-4 text-white" />
              </button>

              <img
                src={track.cover}
                alt={track.title}
                className="w-12 h-12 rounded object-cover"
              />

              <div className="flex-1 min-w-0">
                <h3 className={cn(
                  'font-medium truncate',
                  currentTrack?.id === track.id ? 'text-green-500' : 'text-white'
                )}>
                  {track.title}
                </h3>
                <p className="text-sm text-gray-400 truncate">{track.artist}</p>
              </div>

              <button className="p-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all">
                <Heart className="w-4 h-4" />
              </button>

              <span className="text-sm text-gray-400 w-12 text-right">
                {formatTime(track.duration)}
              </span>

              <button className="p-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white transition-all">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* AI Recommended Playlists */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Made for You</h2>
            <p className="text-gray-400">AI-curated playlists based on your taste</p>
          </div>
          <Button variant="ghost" size="sm">
            Show all
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedPlaylists.map((playlist) => (
            <Card
              key={playlist.id}
              className="group relative overflow-hidden hover:bg-gray-750 transition-all duration-300"
              hover
            >
              <div className="relative">
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="w-full aspect-square object-cover rounded-lg mb-4"
                />
                <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:scale-105">
                  <Play className="w-5 h-5 text-black ml-1" />
                </button>
              </div>
              <h3 className="font-semibold text-white mb-2">{playlist.name}</h3>
              <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                {playlist.description}
              </p>
              <p className="text-xs text-gray-500">
                {playlist.tracks.length} songs
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* Continue Listening */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-6">Continue Listening</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockTracks.slice(0, 6).map((track) => (
            <div
              key={track.id}
              className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors group cursor-pointer"
              onClick={() => handlePlayTrack(track)}
            >
              <img
                src={track.cover}
                alt={track.title}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white truncate">{track.title}</h3>
                <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                <div className="w-32 h-1 bg-gray-600 rounded-full mt-2">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: `${Math.random() * 70 + 10}%` }}
                  />
                </div>
              </div>
              <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-5 h-5 text-white" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};