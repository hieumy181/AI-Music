import React, { useState } from 'react';
import { Search as SearchIcon, Filter, Play, Heart, MoreHorizontal } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { useMusic } from '../contexts/MusicContext';
import { mockTracks, mockPlaylists, mockAlbums, mockArtists } from '../data/mockData';
import { formatTime } from '../utils/formatTime';
import { cn } from '../utils/cn';

export const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'songs' | 'albums' | 'artists' | 'playlists'>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedMood, setSelectedMood] = useState<string>('');
  
  const { playTrack, addToQueue, currentTrack, isPlaying } = useMusic();

  const genres = ['Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 'R&B', 'Country'];
  const moods = ['Happy', 'Chill', 'Energetic', 'Sad', 'Angry', 'Romantic', 'Focus', 'Party'];

  const handlePlayTrack = (track: typeof mockTracks[0]) => {
    playTrack(track);
    addToQueue(track);
  };

  const filteredTracks = mockTracks.filter(track => {
    const matchesSearch = !searchQuery || 
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.album.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesGenre = !selectedGenre || track.genre === selectedGenre;
    const matchesMood = !selectedMood || track.mood === selectedMood;
    
    return matchesSearch && matchesGenre && matchesMood;
  });

  const filteredPlaylists = mockPlaylists.filter(playlist =>
    !searchQuery || playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlbums = mockAlbums.filter(album =>
    !searchQuery || 
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArtists = mockArtists.filter(artist =>
    !searchQuery || artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      {/* Search Header */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white">Search</h1>
        
        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="What do you want to listen to?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 text-lg py-3"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex space-x-2">
            {(['all', 'songs', 'albums', 'artists', 'playlists'] as const).map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="capitalize"
              >
                {filter}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>

            <select
              value={selectedMood}
              onChange={(e) => setSelectedMood(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value="">All Moods</option>
              {moods.map(mood => (
                <option key={mood} value={mood}>{mood}</option>
              ))}
            </select>

            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {!searchQuery ? (
        // Browse Categories
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Browse All</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {genres.map((genre, index) => (
                <div
                  key={genre}
                  className="relative overflow-hidden cursor-pointer hover:scale-105 transition-transform aspect-square"
                  onClick={() => setSelectedGenre(genre)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Select genre ${genre}`}
                  onKeyPress={e => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedGenre(genre);
                  }}
                >
                  <Card hover className="h-full w-full">
                    <div 
                      className="absolute inset-0 bg-gradient-to-br opacity-80"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${
                          ['#1DB954', '#FF006E', '#8338EC', '#3A86FF', '#FFBE0B', '#FB5607', '#FF9F1C', '#2EC4B6'][index % 8]
                        }, ${
                          ['#1DB954DD', '#FF006EDD', '#8338ECDD', '#3A86FFDD', '#FFBE0BDD', '#FB5607DD', '#FF9F1CDD', '#2EC4B6DD'][index % 8]
                        })`
                      }}
                    />
                    <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                      <h3 className="text-white font-bold text-lg">{genre}</h3>
                      <div className="self-end">
                        <div className="w-16 h-16 bg-black/20 rounded-lg flex items-center justify-center">
                          <div className="w-8 h-8 bg-white/30 rounded" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Popular Moods</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {moods.slice(0, 8).map((mood, index) => (
                <Button
                  key={mood}
                  variant="ghost"
                  className="h-20 text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600"
                  onClick={() => setSelectedMood(mood)}
                >
                  {mood}
                </Button>
              ))}
            </div>
          </section>
        </div>
      ) : (
        // Search Results
        <div className="space-y-8">
          {/* Top Result */}
          {filteredTracks.length > 0 && (activeFilter === 'all' || activeFilter === 'songs') && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Top Result</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 hover:bg-gray-750 transition-colors group cursor-pointer">
                  <img
                    src={filteredTracks[0].cover}
                    alt={filteredTracks[0].title}
                    className="w-24 h-24 rounded-lg object-cover mb-4"
                  />
                  <h3 className="text-3xl font-bold text-white mb-2">{filteredTracks[0].title}</h3>
                  <p className="text-gray-400 mb-4">Song • {filteredTracks[0].artist}</p>
                  <Button
                    onClick={() => handlePlayTrack(filteredTracks[0])}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </Button>
                </Card>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Songs</h3>
                  <div className="space-y-2">
                    {filteredTracks.slice(1, 5).map((track) => (
                      <div
                        key={track.id}
                        className="group flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                        onClick={() => handlePlayTrack(track)}
                      >
                        <img
                          src={track.cover}
                          alt={track.title}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className={cn(
                            'font-medium truncate',
                            currentTrack?.id === track.id ? 'text-green-500' : 'text-white'
                          )}>
                            {track.title}
                          </h4>
                          <p className="text-sm text-gray-400 truncate">{track.artist}</p>
                        </div>
                        <span className="text-sm text-gray-400">{formatTime(track.duration)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Songs */}
          {filteredTracks.length > 0 && (activeFilter === 'all' || activeFilter === 'songs') && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Songs</h2>
              <div className="space-y-2">
                {filteredTracks.slice(0, 10).map((track, index) => (
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

                    <span className="text-sm text-gray-400 hidden sm:block">{track.album}</span>

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
          )}

          {/* Artists */}
          {filteredArtists.length > 0 && (activeFilter === 'all' || activeFilter === 'artists') && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Artists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredArtists.map((artist) => (
                  <Card key={artist.id} className="text-center" hover>
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full aspect-square object-cover rounded-full mb-4"
                    />
                    <h3 className="font-semibold text-white">{artist.name}</h3>
                    <p className="text-sm text-gray-400">Artist</p>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Albums */}
          {filteredAlbums.length > 0 && (activeFilter === 'all' || activeFilter === 'albums') && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Albums</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredAlbums.map((album) => (
                  <Card key={album.id} hover>
                    <img
                      src={album.cover}
                      alt={album.title}
                      className="w-full aspect-square object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-white truncate">{album.title}</h3>
                    <p className="text-sm text-gray-400 truncate">{album.year} • {album.artist}</p>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Playlists */}
          {filteredPlaylists.length > 0 && (activeFilter === 'all' || activeFilter === 'playlists') && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Playlists</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredPlaylists.map((playlist) => (
                  <Card key={playlist.id} hover>
                    <img
                      src={playlist.cover}
                      alt={playlist.name}
                      className="w-full aspect-square object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-white truncate">{playlist.name}</h3>
                    <p className="text-sm text-gray-400 truncate">
                      {playlist.tracks.length} songs
                    </p>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* No Results */}
          {filteredTracks.length === 0 && filteredPlaylists.length === 0 && filteredAlbums.length === 0 && filteredArtists.length === 0 && (
            <div className="text-center py-12">
              <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};