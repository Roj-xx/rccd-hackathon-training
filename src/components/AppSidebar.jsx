import {
  IconClipboard,
  IconFile,
  IconGear,
  IconHome,
  IconShield,
  LogoMark,
} from './Icons.jsx';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: IconHome, screen: 'home' },
  { id: 'inspections', label: 'Inspections', icon: IconClipboard, screen: 'camera' },
  { id: 'reports', label: 'Reports', icon: IconFile, screen: 'rescue' },
  { id: 'rescue', label: 'Rescue Team', icon: IconShield, screen: 'rescue' },
  { id: 'settings', label: 'Settings', icon: IconGear, screen: null },
];

const ACTIVE_ITEM = {
  home: 'home',
  camera: 'inspections',
  verification: 'inspections',
  rescue: 'rescue',
};

export default function AppSidebar({ current, onNavigate }) {
  const activeId = ACTIVE_ITEM[current];

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__mark">
          <LogoMark />
        </span>
        <span className="sidebar__brand-text">
          <span className="sidebar__brand-name">RCCD</span>
          <span className="sidebar__brand-sub">Remote Camera Casualty Detection</span>
        </span>
      </div>

      <nav className="sidebar__nav" aria-label="Main navigation">
        <ul className="sidebar__list">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = Boolean(item.screen) && item.id === activeId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`sidebar__link${active ? ' is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  disabled={!item.screen}
                  title={item.screen ? undefined : 'Not included in this prototype'}
                  onClick={() => item.screen && onNavigate(item.screen)}
                >
                  <Icon />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar__status">
        <span className="sidebar__status-dot" aria-hidden />
        <span className="sidebar__status-text">
          <strong>System Online</strong>
          <span>All systems operational</span>
        </span>
      </div>
    </aside>
  );
}
