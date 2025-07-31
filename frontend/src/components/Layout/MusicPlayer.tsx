import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Heart,
  List,
  Repeat,
  Shuffle
} from 'lucide-react';
import { useMusic } from '../../contexts/MusicContext';
import { formatTime } from '../../utils/formatTime';
import { cn } from '../../utils/cn';

export const MusicPlayer: React.FC = () => {
  const [showQueue, setShowQueue] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(0.7);

  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    queue,
    isLoading,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    seekTo,
    toggleLike
  } = useMusic();

  if (!currentTrack) return null;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seekTo(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-4 py-3 z-40">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        {/* Track Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-14 h-14 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-white font-medium truncate">{currentTrack.title}</h3>
            <p className="text-gray-400 text-sm truncate">{currentTrack.artist}</p>
          </div>
          <button
            onClick={() => toggleLike(currentTrack.id)}
            className={cn(
              'p-2 rounded-full transition-colors',
              currentTrack.isLiked 
                ? 'text-green-500 hover:text-green-400' 
                : 'text-gray-400 hover:text-white'
            )}
          >
            <Heart className={cn('w-5 h-5', currentTrack.isLiked && 'fill-current')} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md mx-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsShuffled(!isShuffled)}
              className={cn(
                'p-2 rounded-full transition-colors',
                isShuffled ? 'text-green-500' : 'text-gray-400 hover:text-white'
              )}
            >
              <Shuffle className="w-4 h-4" />
            </button>
            
            <button
              onClick={previousTrack}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              disabled={isLoading}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-5 h-5 text-black ml-0" />
              ) : (
                <Play className="w-5 h-5 text-black ml-1" />
              )}
            </button>

            <button
              onClick={nextTrack}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={() => setRepeatMode(repeatMode === 'off' ? 'all' : repeatMode === 'all' ? 'one' : 'off')}
              className={cn(
                'p-2 rounded-full transition-colors relative',
                repeatMode !== 'off' ? 'text-green-500' : 'text-gray-400 hover:text-white'
              )}
            >
              <Repeat className="w-4 h-4" />
              {repeatMode === 'one' && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-black">1</span>
                </span>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-gray-400 w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${progress}%, #4B5563 ${progress}%, #4B5563 100%)`
                }}
              />
            </div>
            <span className="text-xs text-gray-400 w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Volume & Queue */}
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <button
            onClick={() => setShowQueue(!showQueue)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <List className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #1DB954 0%, #1DB954 ${volume * 100}%, #4B5563 ${volume * 100}%, #4B5563 100%)`
              }}
            />
          </div>
        </div>
      </div>

      {/* Queue Panel */}
      {showQueue && (
        <div className="absolute bottom-full right-4 w-80 max-h-96 bg-gray-800 rounded-lg border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-medium">Queue</h3>
          </div>
          <div className="overflow-y-auto max-h-80">
            {queue.map((track, index) => (
              <div
                key={track.id}
                className={cn(
                  'flex items-center space-x-3 p-3 hover:bg-gray-700 transition-colors',
                  track.id === currentTrack.id && 'bg-gray-700 border-r-2 border-green-500'
                )}
              >
                <img
                  src={track.cover}
                  alt={track.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{track.title}</p>
                  <p className="text-gray-400 text-xs truncate">{track.artist}</p>
                </div>
                <span className="text-gray-400 text-xs">{formatTime(track.duration)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};