import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import Icon from "./Icon";

function Link({ to, children, className, style, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    else window.location.hash = to;
  };
  return <a href={to} className={className} style={style} onClick={handleClick}>{children}</a>;
}

export function AlbumCard({ album, delay = 0 }) {
  const { play } = usePlayer();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card"
      style={{ "--delay": `${delay}ms`, "--card-color": album.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`#/album/${album.id}`} className="card__link">
        <div className="card__img-wrap">
          <img src={album.img} alt={album.title} className="card__img" />
          <div className={`card__overlay ${hovered ? "card__overlay--visible" : ""}`}>
            <button
              className="card__play"
              onClick={e => { e.preventDefault(); e.stopPropagation(); /* play from album */ }}
            >
              <Icon name="play" size={20} />
            </button>
          </div>
          <div className="card__glow" style={{ background: album.color }} />
        </div>
        <div className="card__body">
          <span className="card__title">{album.title}</span>
          <span className="card__sub">{album.artist} · {album.year}</span>
        </div>
      </Link>
    </div>
  );
}

export function PlaylistCard({ playlist, delay = 0 }) {
  const { play } = usePlayer();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card"
      style={{ "--delay": `${delay}ms`, "--card-color": playlist.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`#/playlist/${playlist.id}`} className="card__link">
        <div className="card__img-wrap">
          <img src={playlist.img} alt={playlist.title} className="card__img" />
          <div className={`card__overlay ${hovered ? "card__overlay--visible" : ""}`}>
            <button
              className="card__play"
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                play(playlist.tracks[0], playlist.tracks);
              }}
            >
              <Icon name="play" size={20} />
            </button>
          </div>
          <div className="card__glow" style={{ background: playlist.color }} />
        </div>
        <div className="card__body">
          <span className="card__title">{playlist.title}</span>
          <span className="card__sub">{playlist.description}</span>
        </div>
      </Link>
    </div>
  );
}

export function ArtistCard({ artist, delay = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card card--artist"
      style={{ "--delay": `${delay}ms`, "--card-color": artist.color }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`#/artist/${artist.id}`} className="card__link">
        <div className="card__img-wrap card__img-wrap--circle">
          <img src={artist.img} alt={artist.name} className="card__img card__img--circle" />
          <div className={`card__overlay card__overlay--circle ${hovered ? "card__overlay--visible" : ""}`}>
            <Icon name="play" size={20} />
          </div>
          <div className="card__glow card__glow--circle" style={{ background: artist.color }} />
        </div>
        <div className="card__body card__body--center">
          <span className="card__title">{artist.name}</span>
          <span className="card__sub">{artist.genre}</span>
        </div>
      </Link>
    </div>
  );
}

export function FeaturedCard({ item, delay = 0 }) {
  const { play } = usePlayer();

  return (
    <div className="featured-card" style={{ "--delay": `${delay}ms`, "--feat-color": item.color }}>
      <img src={item.img} alt={item.title} className="featured-card__img" />
      <div className="featured-card__overlay" />
      <div className="featured-card__content">
        <span className="featured-card__label">Featured</span>
        <h2 className="featured-card__title">{item.title}</h2>
        <p className="featured-card__sub">{item.subtitle}</p>
        <button
          className="featured-card__btn"
          onClick={() => play(item.tracks[0], item.tracks)}
        >
          <Icon name="play" size={16} /> Play Now
        </button>
      </div>
    </div>
  );
}

export { Link };