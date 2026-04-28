import "./App.css";
import { PlayerProvider } from "./context/PlayerContext";
import { useRoute } from "./hooks/useRoute";
import Sidebar from "./components/Sidebar";
import PlayerBar from "./components/PlayerBar";
import Icon from "./components/Icon";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import { AlbumPage, PlaylistPage, ArtistPage } from "./pages/Detail";

function Router({ path }) {
  if (path === "#/" || path === "#" || path === "") return <Home />;
  if (path === "#/search")  return <Search />;
  if (path === "#/library") return <Library />;

  const albumMatch = path.match(/^#\/album\/(.+)$/);
  if (albumMatch) return <AlbumPage id={albumMatch[1]} />;

  const playlistMatch = path.match(/^#\/playlist\/(.+)$/);
  if (playlistMatch) return <PlaylistPage id={playlistMatch[1]} />;

  const artistMatch = path.match(/^#\/artist\/(.+)$/);
  if (artistMatch) return <ArtistPage id={artistMatch[1]} />;

  return (
    <div className="page page--in" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", color: "var(--text2)" }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>◌</div>
        <h2>Page not found</h2>
      </div>
    </div>
  );
}

function BottomNav({ path }) {
  const items = [
    { to: "#/",        icon: "home",    label: "Home" },
    { to: "#/search",  icon: "search",  label: "Search" },
    { to: "#/library", icon: "library", label: "Library" },
  ];
  return (
    <nav className="bottom-nav">
      {items.map(item => {
        const active = path === item.to || (item.to !== "#/" && path.startsWith(item.to));
        return (
           <a
            key={item.to}
            href={item.to}
            className={`bottom-nav__item ${active ? "bottom-nav__item--active" : ""}`}
            onClick={e => { e.preventDefault(); window.location.hash = item.to; }}
          >
            <Icon name={item.icon} size={22} />
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

export default function App() {
  const path = useRoute();

  return (
    <PlayerProvider>
      <div className="app">
        <Sidebar path={path} />
        <main className="main" key={path}>
          <Router path={path} />
        </main>
        <PlayerBar />
        <BottomNav path={path} />
      </div>
    </PlayerProvider>
  );
}