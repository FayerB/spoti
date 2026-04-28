import { useState, useEffect } from "react";
import { PLAYLISTS, ALBUMS, TRACKS } from "../data/mock";
import { PlaylistCard, AlbumCard } from "../components/Cards";
import TrackRow from "../components/TrackRow";
import { usePlayer } from "../context/PlayerContext";

const TABS = ["Playlists", "Albums", "Liked Songs"];

export default function Library() {
  const [tab, setTab] = useState("Playlists");
  const [mounted, setMounted] = useState(false);
  const { liked } = usePlayer();

  useEffect(() => { setMounted(true); }, []);

  const likedTracks = TRACKS.filter(t => liked.has(t.id));

  return (
    <div className={`page ${mounted ? "page--in" : ""}`}>
      <div className="library-header">
        <h1 className="library-header__title">Your Library</h1>
        <p className="library-header__sub">Everything you love, in one place</p>
      </div>

      <div className="tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`tab ${tab === t ? "tab--active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
            {t === "Liked Songs" && liked.size > 0 && (
              <span className="tab__badge">{liked.size}</span>
            )}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {tab === "Playlists" && (
          <div className="cards-row cards-row--wrap">
            {PLAYLISTS.map((pl, i) => <PlaylistCard key={pl.id} playlist={pl} delay={i * 60} />)}
          </div>
        )}

        {tab === "Albums" && (
          <div className="cards-row cards-row--wrap">
            {ALBUMS.map((al, i) => <AlbumCard key={al.id} album={al} delay={i * 60} />)}
          </div>
        )}

        {tab === "Liked Songs" && (
          likedTracks.length === 0 ? (
            <div className="library-empty">
              <span className="library-empty__icon">♡</span>
              <p>Songs you like will appear here</p>
              <span>Hit the heart icon on any track</span>
            </div>
          ) : (
            <div className="track-list">
              <div className="track-list__header">
                <span>#</span><span>Track</span>
                <span className="track-list__album-col">Album</span>
                <span /><span>Time</span>
              </div>
              {likedTracks.map((t, i) => (
                <TrackRow key={t.id} track={t} trackList={likedTracks} index={i} />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}