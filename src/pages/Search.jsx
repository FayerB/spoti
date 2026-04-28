import { useState, useEffect, useRef } from "react";
import { TRACKS, ALBUMS, ARTISTS, PLAYLISTS } from "../data/mock";
import TrackRow from "../components/TrackRow";
import { AlbumCard, PlaylistCard, ArtistCard } from "../components/Cards";
import Icon from "../components/Icon";

const GENRES = [
  { name: "Synthwave",  color: "#00ff87" },
  { name: "Ambient",    color: "#3d9fff" },
  { name: "Indie Pop",  color: "#ff3cac" },
  { name: "Post-Metal", color: "#ffb347" },
  { name: "Electronic", color: "#a855f7" },
  { name: "Lo-Fi",      color: "#14b8a6" },
  { name: "Jazz",       color: "#f59e0b" },
  { name: "Classical",  color: "#6366f1" },
];

export default function Search() {
  const [q, setQ] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    setTimeout(() => inputRef.current?.focus(), 300);
  }, []);

  const lower = q.toLowerCase();
  const hasQuery = q.trim().length > 1;

  const matchTracks  = hasQuery ? TRACKS.filter(t  => t.title.toLowerCase().includes(lower) || t.artist.toLowerCase().includes(lower)) : [];
  const matchAlbums  = hasQuery ? ALBUMS.filter(a  => a.title.toLowerCase().includes(lower) || a.artist.toLowerCase().includes(lower)) : [];
  const matchArtists = hasQuery ? ARTISTS.filter(a => a.name.toLowerCase().includes(lower) || a.genre.toLowerCase().includes(lower)) : [];

  const total = matchTracks.length + matchAlbums.length + matchArtists.length;

  return (
    <div className={`page ${mounted ? "page--in" : ""}`}>
      <div className="search-hero">
        <h1 className="search-hero__title">Search</h1>
        <div className="search-box">
          <Icon name="search" size={18} />
          <input
            ref={inputRef}
            type="text"
            className="search-box__input"
            placeholder="Artists, songs, albums, playlists…"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          {q && (
            <button className="search-box__clear" onClick={() => setQ("")}>
              <Icon name="x" size={16} />
            </button>
          )}
        </div>
      </div>

      {!hasQuery ? (
        <>
          <h2 className="page-section-title">Browse Genres</h2>
          <div className="genre-grid">
            {GENRES.map(g => (
              <button
                key={g.name}
                className="genre-tile"
                style={{ "--g-color": g.color }}
                onClick={() => setQ(g.name)}
              >
                <span className="genre-tile__name">{g.name}</span>
                <div className="genre-tile__blob" />
              </button>
            ))}
          </div>

          <h2 className="page-section-title" style={{ marginTop: "3rem" }}>Popular Artists</h2>
          <div className="cards-row">
            {ARTISTS.map((ar, i) => <ArtistCard key={ar.id} artist={ar} delay={i * 60} />)}
          </div>
        </>
      ) : (
        <div className="search-results">
          {total === 0 ? (
            <div className="search-empty">
              <span className="search-empty__icon">◌</span>
              <p>No results for <strong>"{q}"</strong></p>
              <span>Try a different search term</span>
            </div>
          ) : (
            <>
              {matchTracks.length > 0 && (
                <section>
                  <h2 className="page-section-title">Songs</h2>
                  <div className="track-list">
                    <div className="track-list__header">
                      <span>#</span><span>Track</span>
                      <span className="track-list__album-col">Album</span>
                      <span /><span>Time</span>
                    </div>
                    {matchTracks.map((t, i) => (
                      <TrackRow key={t.id} track={t} trackList={matchTracks} index={i} />
                    ))}
                  </div>
                </section>
              )}

              {matchArtists.length > 0 && (
                <section>
                  <h2 className="page-section-title">Artists</h2>
                  <div className="cards-row">
                    {matchArtists.map((ar, i) => <ArtistCard key={ar.id} artist={ar} delay={i * 60} />)}
                  </div>
                </section>
              )}

              {matchAlbums.length > 0 && (
                <section>
                  <h2 className="page-section-title">Albums</h2>
                  <div className="cards-row">
                    {matchAlbums.map((al, i) => <AlbumCard key={al.id} album={al} delay={i * 60} />)}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}