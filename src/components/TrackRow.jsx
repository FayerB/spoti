import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import Icon from "./Icon";

const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function TrackRow({ track, trackList, index, showAlbum = true }) {
  const { play, toggle, current, playing, liked, toggleLike } = usePlayer();
  const [hovered, setHovered] = useState(false);
  const isActive = current?.id === track.id;
  const isLiked = liked.has(track.id);

  const handlePlay = () => {
    if (isActive) toggle();
    else play(track, trackList);
  };

  return (
    <div
      className={`track-row ${isActive ? "track-row--active" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDoubleClick={handlePlay}
    >
      <div className="track-row__num" onClick={handlePlay}>
        {hovered || isActive ? (
          <span className="track-row__play-icon">
            <Icon name={isActive && playing ? "pause" : "play"} size={14} />
          </span>
        ) : (
          <span style={{ color: isActive ? "var(--accent)" : "var(--muted)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>

      <div className="track-row__info">
        <img src={track.img} alt={track.title} className="track-row__thumb" />
        <div className="track-row__text">
          <span className="track-row__title">{track.title}</span>
          <span className="track-row__artist">{track.artist}</span>
        </div>
      </div>

      {showAlbum && (
        <span className="track-row__album">{track.album}</span>
      )}

      <button
        className={`track-row__like ${isLiked ? "track-row__like--active" : ""}`}
        onClick={e => { e.stopPropagation(); toggleLike(track.id); }}
      >
        <Icon name={isLiked ? "heartFill" : "heart"} size={15} />
      </button>

      <span className="track-row__duration">{fmt(track.duration)}</span>
    </div>
  );
}