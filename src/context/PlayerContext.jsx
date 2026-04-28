import { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";
import { TRACKS } from "../data/mock";

const PlayerCtx = createContext(null);

export function PlayerProvider({ children }) {
  const [queue, setQueue]       = useState(TRACKS);
  const [idx, setIdx]           = useState(null);
  const [playing, setPlaying]   = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume]     = useState(0.75);
  const [shuffle, setShuffle]   = useState(false);
  const [repeat, setRepeat]     = useState(false);
  const [liked, setLiked]       = useState(new Set());
  const intervalRef = useRef(null);

  const current = idx !== null ? queue[idx] : null;

  const tick = useCallback(() => {
    setProgress(p => {
      const next = p + (100 / ((current?.duration || 200) * 2));
      if (next >= 100) {
        if (repeat) return 0;
        setIdx(i => {
          if (shuffle) return Math.floor(Math.random() * queue.length);
          return i < queue.length - 1 ? i + 1 : 0;
        });
        return 0;
      }
      return next;
    });
  }, [current, repeat, shuffle, queue.length]);

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (playing) intervalRef.current = setInterval(tick, 500);
    return () => clearInterval(intervalRef.current);
  }, [playing, tick]);

  const play = useCallback((track, trackList) => {
    const list = trackList ?? TRACKS;
    const i = list.findIndex(t => t.id === track.id);
    setQueue(list);
    setIdx(i >= 0 ? i : 0);
    setProgress(0);
    setPlaying(true);
  }, []);

  const toggle = useCallback(() => setPlaying(p => !p), []);

  const prev = useCallback(() => {
    setProgress(0);
    setIdx(i => (i === null ? 0 : i > 0 ? i - 1 : queue.length - 1));
    setPlaying(true);
  }, [queue.length]);

  const next = useCallback(() => {
    setProgress(0);
    setIdx(i => {
      if (i === null) return 0;
      if (shuffle) return Math.floor(Math.random() * queue.length);
      return i < queue.length - 1 ? i + 1 : 0;
    });
    setPlaying(true);
  }, [shuffle, queue.length]);

  const seek = useCallback(val => setProgress(val), []);

  const toggleLike = useCallback(id => {
    setLiked(s => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  return (
    <PlayerCtx.Provider value={{
      current, playing, progress, volume, shuffle, repeat, liked,
      play, toggle, prev, next, seek,
      setVolume, setShuffle: () => setShuffle(s => !s),
      setRepeat: () => setRepeat(r => !r),
      toggleLike,
    }}>
      {children}
    </PlayerCtx.Provider>
  );
}

export const usePlayer = () => useContext(PlayerCtx);