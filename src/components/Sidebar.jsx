import { Link } from "./Cards";
import Icon from "./Icon";
import { PLAYLISTS } from "../data/mock";

const NAV = [
  { to: "#/",        icon: "home",    label: "Home" },
  { to: "#/search",  icon: "search",  label: "Search" },
  { to: "#/library", icon: "library", label: "Library" },
];

export default function Sidebar({ path }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <span className="sidebar__logo-icon">◈</span>
        <span className="sidebar__logo-text">Wavify</span>
      </div>

      <nav className="sidebar__nav">
        {NAV.map(item => {
          const active = path === item.to || (item.to !== "#/" && path.startsWith(item.to));
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar__nav-item ${active ? "sidebar__nav-item--active" : ""}`}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.label}</span>
              {active && <div className="sidebar__active-pill" />}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar__section">
        <div className="sidebar__section-title">
          <span>Playlists</span>
          <button className="sidebar__add-btn"><Icon name="plus" size={14} /></button>
        </div>
        <div className="sidebar__playlists">
          {PLAYLISTS.map(pl => (
            <Link
              key={pl.id}
              to={`#/playlist/${pl.id}`}
              className={`sidebar__playlist-item ${path === `#/playlist/${pl.id}` ? "sidebar__playlist-item--active" : ""}`}
            >
              <div className="sidebar__pl-dot" style={{ background: pl.color }} />
              <span className="sidebar__pl-name">{pl.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}