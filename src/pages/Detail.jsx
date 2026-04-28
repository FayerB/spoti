import { useState, useEffect } from "react";
import { ALBUMS, PLAYLISTS, ARTISTS, TRACKS } from "../data/mock";
import TrackRow from "../components/TrackRow";
import { AlbumCard } from "../components/Cards";
import { usePlayer } from "../context/PlayerContext";
import Icon from "../components/Icon";

function CollectionHeader({ img, type, title, meta, color, onPlay, isCircle }) {
  return (
    <div className="collection-header">
      <div className="collection-header__bg" style={{ background: color }} />
      <div className="collection-header__inner">
        <div className={`collection-header__cover-wrap ${isCircle ? "collection-header__cover-wrap--circle" : ""}`}>
          <img
            src={img}
            alt={title}
            className={`collection-header__cover ${isCircle ? "collection-header__cover--circle" : ""}`}
          />
          <div className="collection-header__cover-shadow" style={{ background: color }} />
        </div>
        <div className="collection-header__info">
          <span className="collection-header__type">{type}</span>
          <h1 className="collection-header__title">{title}</h1>
          <p className="collection-header__meta">{meta}</p>
          {onPlay && (
            <div className="collection-header__actions">
              <button
                className="collection-play-btn"
                style={{ "--btn-color": color }}
                onClick={onPlay}
              >
                <Icon name="play" size={18} /> Play
              </button>
              <button className="collection-icon-btn">
                <Icon name="heart" size={20} />
              </button>
              <button className="collection-icon-btn">
                <Icon name="dots" size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function AlbumPage({ id }) {
  const album = ALBUMS.find(a => a.id === id);
  const { play } = usePlayer();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!album) return <div className="page"><h2>Album not found</h2></div>;

  return (
    <div className={`page page--no-pad ${mounted ? "page--in" : ""}`}>
      <CollectionHeader
        img={album.img}
        type="Album"
        title={album.title}
        meta={`${album.artist} · ${album.year} · ${album.tracks?.length ?? 4} songs`}
        color={album.color}
        onPlay={() => {
          const albumTracks = TRACKS.filter(t => t.albumId === album.id);
          if (albumTracks.length) play(albumTracks[0], albumTracks);
        }}
      />
      <div className="collection-body">
        <div className="track-list">
          <div className="track-list__header">
            <span>#</span><span>Track</span>
            <span className="track-list__album-col">Album</span>
            <span /><span>Time</span>
          </div>
          {TRACKS.filter(t => t.albumId === album.id).map((t, i) => (
            <TrackRow
              key={t.id}
              track={t}
              trackList={TRACKS.filter(tr => tr.albumId === album.id)}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function PlaylistPage({ id }) {
  const playlist = PLAYLISTS.find(p => p.id === id);
  const { play } = usePlayer();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!playlist) return <div className="page"><h2>Playlist not found</h2></div>;

  return (
    <div className={`page page--no-pad ${mounted ? "page--in" : ""}`}>
      <CollectionHeader
        img={playlist.img}
        type="Playlist"
        title={playlist.title}
        meta={`${playlist.tracks.length} songs · ${playlist.description}`}
        color={playlist.color}
        onPlay={() => play(playlist.tracks[0], playlist.tracks)}
      />
      <div className="collection-body">
        <div className="track-list">
          <div className="track-list__header">
            <span>#</span><span>Track</span>
            <span className="track-list__album-col">Album</span>
            <span /><span>Time</span>
          </div>
          {playlist.tracks.map((t, i) => (
            <TrackRow key={t.id} track={t} trackList={playlist.tracks} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ArtistPage({ id }) {
  const artist = ARTISTS.find(a => a.id === id);
  const { play } = usePlayer();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!artist) return <div className="page"><h2>Artist not found</h2></div>;

  const artistTracks = TRACKS.filter(t => t.artist === artist.name);
  const artistAlbums = ALBUMS.filter(a => a.artistId === id);

  return (
    <div className={`page page--no-pad ${mounted ? "page--in" : ""}`}>
      <CollectionHeader
        img={artist.img}
        type="Artist"
        title={artist.name}
        meta={`${artist.genre} · ${artistTracks.length} songs`}
        color={artist.color}
        isCircle
        onPlay={() => artistTracks.length && play(artistTracks[0], artistTracks)}
      />
      <div className="collection-body">
        <h2 className="page-section-title">Popular Tracks</h2>
        <div className="track-list">
          <div className="track-list__header">
            <span>#</span><span>Track</span>
            <span className="track-list__album-col">Album</span>
            <span /><span>Time</span>
          </div>
          {artistTracks.map((t, i) => (
            <TrackRow key={t.id} track={t} trackList={artistTracks} index={i} />
          ))}
        </div>

        {artistAlbums.length > 0 && (
          <>
            <h2 className="page-section-title" style={{ marginTop: "2.5rem" }}>Albums</h2>
            <div className="cards-row">
              {artistAlbums.map((al, i) => <AlbumCard key={al.id} album={al} delay={i * 60} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}