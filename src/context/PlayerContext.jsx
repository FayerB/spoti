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
  const audioRef = useRef(new Audio());

  const current = idx !== null ? queue[idx] : null;

  // Cambia la fuente cuando cambia el track
  useEffect(() => {
    const audio = audioRef.current;
    if (!current?.src) return;
    audio.src = current.src;
    audio.volume = volume;
    if (playing) audio.play().catch(() => {});
  }, [idx]);

  // Play / pause
  useEffect(() => {
    const audio = audioRef.current;
    if (playing) audio.play().catch(() => {});
    else audio.pause();
  }, [playing]);

  // Volumen
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  // Repeat
  useEffect(() => {
    audioRef.current.loop = repeat;
  }, [repeat]);

  // Progreso real del audio
  useEffect(() => {
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      if (!audio.duration) return;
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    const onEnded = () => {
      if (repeat) return;
      setIdx(i => {
        if (i === null) return 0;
        if (shuffle) return Math.floor(Math.random() * queue.length);
        return i < queue.length - 1 ? i + 1 : 0;
      });
      setProgress(0);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, [repeat, shuffle, queue.length]);

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

  // Seek real
  const seek = useCallback(val => {
    const audio = audioRef.current;
    if (!audio.duration) return;
    audio.currentTime = (val / 100) * audio.duration;
    setProgress(val);
  }, []);

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
      play, toggle, prev, next, seek, setVolume,
      setShuffle: () => setShuffle(s => !s),
      setRepeat:  () => setRepeat(r => !r),
      toggleLike,
    }}>
      {children}
    </PlayerCtx.Provider>
  );
}

export const usePlayer = () => useContext(PlayerCtx);