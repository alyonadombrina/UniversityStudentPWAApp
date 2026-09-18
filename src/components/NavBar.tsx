import type { Tab } from '../App'

interface NavItem {
  id: Tab
  label: string
  icon: (active: boolean) => JSX.Element
}

const items: NavItem[] = [
  {
    id: 'map',
    label: 'Карта',
    icon: (a) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 3L3 6v15l6-3 6 3 6-3V3l-6 3-6-3z"
          stroke={a ? 'var(--color-primary)' : '#9CA3AF'}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={a ? 'var(--color-primary-light)' : 'none'}
        />
        <path d="M9 3v15M15 6v15" stroke={a ? 'var(--color-primary)' : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'schedule',
    label: 'Расписание',
    icon: (a) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="3" stroke={a ? 'var(--color-primary)' : '#9CA3AF'} strokeWidth="1.8" fill={a ? 'var(--color-primary-light)' : 'none'}/>
        <path d="M8 2v4M16 2v4M3 10h18" stroke={a ? 'var(--color-primary)' : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="8" cy="15" r="1.5" fill={a ? 'var(--color-primary)' : '#9CA3AF'}/>
        <circle cx="12" cy="15" r="1.5" fill={a ? 'var(--color-primary)' : '#9CA3AF'}/>
      </svg>
    ),
  },
  {
    id: 'directory',
    label: 'Справочник',
    icon: (a) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
          stroke={a ? 'var(--color-primary)' : '#9CA3AF'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
          stroke={a ? 'var(--color-primary)' : '#9CA3AF'}
          strokeWidth="1.8"
          fill={a ? 'var(--color-primary-light)' : 'none'}
        />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'Профиль',
    icon: (a) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={a ? 'var(--color-primary)' : '#9CA3AF'} strokeWidth="1.8" fill={a ? 'var(--color-primary-light)' : 'none'}/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={a ? 'var(--color-primary)' : '#9CA3AF'} strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
]

interface NavBarProps {
  active: Tab
  onChange: (tab: Tab) => void
  notifCount?: number
}

export default function NavBar({ active, onChange, notifCount }: NavBarProps) {
  return (
    <nav
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      }}
    >
      <div className="flex">
        {items.map((item) => {
          const isActive = item.id === active
          const showBadge = item.id === 'directory' && notifCount && notifCount > 0
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="flex-1 flex flex-col items-center gap-0.5 pt-3 pb-2 relative"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <span className="relative">
                {item.icon(isActive)}
                {showBadge && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                    style={{ background: 'var(--color-orange)' }}
                  >
                    {notifCount}
                  </span>
                )}
              </span>
              <span
                className="text-[10px] font-medium"
                style={{ color: isActive ? 'var(--color-primary)' : '#9CA3AF' }}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
