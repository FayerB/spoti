import { useState, useRef } from "react";
import { usePlayer } from "../context/PlayerContext";
import Icon from "./Icon";

const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function PlayerBar() {
  const {
    current, playing, progress, volume, shuffle, repeat, liked,
    toggle, prev, next, seek, setVolume, setShuffle, setRepeat, toggleLike,
  } = usePlayer();

  const [volHover, setVolHover] = useState(false);
  const progressRef = useRef(null);

  const handleProgressClick = e => {
    const rect = progressRef.current.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    seek(Math.max(0, Math.min(100, pct)));
  };

  const elapsed = current ? fmt(Math.floor((progress / 100) * current.duration)) : "0:00";
  const total   = current ? fmt(current.duration) : "0:00";
  const isLiked = current ? liked.has(current.id) : false;

  return (
    <div className={`player ${current ? "player--active" : ""}`}>
      {/* Ambient glow from track color */}
      {current && (
        <div className="player__ambient" style={{ background: current.color }} />
      )}

      {/* Track info */}
      <div className="player__track">
        {current ? (
          <>
            <div className="player__thumb-wrap">
              <img src={current.img} alt={current.title} className="player__thumb" />
              <div
                className="player__thumb-glow"
                style={{ background: current.color }}
              />
            </div>
            <div className="player__track-info">
              <span className="player__title">{current.title}</span>
              <span className="player__artist">{current.artist}</span>
            </div>
            <button
              className={`player__like ${isLiked ? "player__like--active" : ""}`}
              onClick={() => toggleLike(current.id)}
            >
              <Icon name={isLiked ? "heartFill" : "heart"} size={16} />
            </button>
          </>
        ) : (
          <div className="player__idle">
            <span>◈</span>
            <span>Nothing playing</span>
          </div>
        )}
      </div>

      {/* Controls + progress */}
      <div className="player__center">
        <div className="player__controls">
          <button
            className={`player__ctrl ${shuffle ? "player__ctrl--active" : ""}`}
            onClick={setShuffle}
            title="Shuffle"
          >
            <Icon name="shuffle" size={16} />
          </button>

          <button className="player__ctrl player__ctrl--nav" onClick={prev}>
            <Icon name="prev" size={20} />
          </button>

          <button
            className={`player__play-btn ${playing ? "player__play-btn--playing" : ""}`}
            onClick={toggle}
          >
            <div className="player__play-ring" />
            <Icon name={playing ? "pause" : "play"} size={18} />
          </button>

          <button className="player__ctrl player__ctrl--nav" onClick={next}>
            <Icon name="next" size={20} />
          </button>

          <button
            className={`player__ctrl ${repeat ? "player__ctrl--active" : ""}`}
            onClick={setRepeat}
            title="Repeat"
          >
            <Icon name="repeat" size={16} />
          </button>
        </div>

        <div className="player__progress-row">
          <span className="player__time">{elapsed}</span>
          <div
            className="player__progress-track"
            ref={progressRef}
            onClick={handleProgressClick}
          >
            <div className="player__progress-fill" style={{ width: `${progress}%` }}>
              <div className="player__progress-head" style={{ background: current?.color || "var(--accent)" }} />
            </div>
            {current && (
              <div
                className="player__progress-glow"
                style={{ width: `${progress}%`, background: current.color }}
              />
            )}
          </div>
          <span className="player__time">{total}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="player__right">
        <button
          className="player__ctrl"
          onMouseEnter={() => setVolHover(true)}
          onMouseLeave={() => setVolHover(false)}
        >
          <Icon name={volume === 0 ? "volMute" : "volume"} size={16} />
        </button>
        <div
          className="player__vol-track"
          onMouseEnter={() => setVolHover(true)}
          onMouseLeave={() => setVolHover(false)}
        >
          <div className="player__vol-fill" style={{ width: `${volume * 100}%` }} />
          <input
            type="range" min="0" max="1" step="0.01"
            value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            className="player__vol-input"
          />
        </div>
      </div>
    </div>
  );
}