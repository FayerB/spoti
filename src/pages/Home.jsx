import { useState, useEffect } from "react";
import { ALBUMS, PLAYLISTS, ARTISTS, FEATURED, TRACKS } from "../data/mock";
import { AlbumCard, PlaylistCard, ArtistCard, FeaturedCard } from "../components/Cards";
import TrackRow from "../components/TrackRow";

function Section({ title, children, subtitle }) {
  return (
    <section className="home-section">
      <div className="home-section__header">
        <div>
          <h2 className="home-section__title">{title}</h2>
          {subtitle && <p className="home-section__sub">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  const [featIdx, setFeatIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setFeatIdx(i => (i + 1) % FEATURED.length), 6000);
    return () => clearInterval(t);
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className={`page ${mounted ? "page--in" : ""}`}>
      {/* Hero */}
      <div className="hero">
        <div className="hero__slides">
          {FEATURED.map((f, i) => (
            <div
              key={f.id}
              className={`hero__slide ${i === featIdx ? "hero__slide--active" : ""}`}
              style={{ "--feat-color": f.color }}
            >
              <img src={f.img} alt={f.title} className="hero__img" />
              <div className="hero__gradient" />
            </div>
          ))}
        </div>
        <div className="hero__content">
          <p className="hero__greeting">{greeting}</p>
          <h1 className="hero__title">{FEATURED[featIdx].title}</h1>
          <p className="hero__subtitle">{FEATURED[featIdx].subtitle}</p>
          <div className="hero__dots">
            {FEATURED.map((_, i) => (
              <button
                key={i}
                className={`hero__dot ${i === featIdx ? "hero__dot--active" : ""}`}
                onClick={() => setFeatIdx(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick picks */}
      <Section title="Quick Picks" subtitle="Jump right in">
        <div className="quick-picks">
          {PLAYLISTS.slice(0, 6).map(pl => (
            <a
              key={pl.id}
              href={`#/playlist/${pl.id}`}
              className="quick-pick"
              style={{ "--qp-color": pl.color }}
              onClick={e => { e.preventDefault(); window.location.hash = `#/playlist/${pl.id}`; }}
            >
              <img src={pl.img} alt={pl.title} className="quick-pick__img" />
              <span className="quick-pick__title">{pl.title}</span>
              <div className="quick-pick__shine" />
            </a>
          ))}
        </div>
      </Section>

      {/* Playlists */}
      <Section title="Featured Playlists" subtitle="Curated for you">
        <div className="cards-row">
          {PLAYLISTS.map((pl, i) => <PlaylistCard key={pl.id} playlist={pl} delay={i * 60} />)}
        </div>
      </Section>

      {/* Albums */}
      <Section title="New Albums">
        <div className="cards-row">
          {ALBUMS.map((al, i) => <AlbumCard key={al.id} album={al} delay={i * 60} />)}
        </div>
      </Section>

      {/* Trending tracks */}
      <Section title="Trending" subtitle="What everyone's listening to">
        <div className="track-list">
          <div className="track-list__header">
            <span>#</span>
            <span>Track</span>
            <span className="track-list__album-col">Album</span>
            <span />
            <span>Time</span>
          </div>
          {TRACKS.slice(0, 8).map((t, i) => (
            <TrackRow key={t.id} track={t} trackList={TRACKS.slice(0, 8)} index={i} />
          ))}
        </div>
      </Section>

      {/* Artists */}
      <Section title="Artists">
        <div className="cards-row">
          {ARTISTS.map((ar, i) => <ArtistCard key={ar.id} artist={ar} delay={i * 60} />)}
        </div>
      </Section>
    </div>
  );
}