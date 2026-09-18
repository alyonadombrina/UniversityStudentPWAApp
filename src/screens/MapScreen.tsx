import { useState } from 'react'

type Building = 'k1' | 'k2' | 'k3' | 'cafe'
type Floor = -1 | 1 | 2 | 3

interface Room {
  id: string
  label: string
  x: number
  y: number
  w: number
  h: number
  type: 'classroom' | 'lab' | 'wc' | 'stair' | 'hall'
  floor: Floor
  desc: string
}

const rooms: Room[] = [
  // Floor 2
  { id: '201', label: '201', x: 10, y: 20, w: 18, h: 14, type: 'classroom', floor: 2, desc: 'Учебная аудитория' },
  { id: '202', label: '202', x: 10, y: 36, w: 18, h: 14, type: 'classroom', floor: 2, desc: 'Учебная аудитория' },
  { id: '203', label: '203', x: 10, y: 52, w: 18, h: 14, type: 'classroom', floor: 2, desc: 'Лекционный зал' },
  { id: '204', label: '204', x: 10, y: 68, w: 18, h: 14, type: 'classroom', floor: 2, desc: 'Семинарская' },
  { id: '205', label: '205', x: 35, y: 14, w: 20, h: 14, type: 'classroom', floor: 2, desc: 'Учебная аудитория' },
  { id: '206', label: '206', x: 57, y: 14, w: 20, h: 14, type: 'classroom', floor: 2, desc: 'Учебная аудитория' },
  { id: '207', label: '207', x: 79, y: 14, w: 18, h: 14, type: 'classroom', floor: 2, desc: 'Учебная аудитория' },
  { id: '208', label: '208', x: 66, y: 38, w: 18, h: 20, type: 'classroom', floor: 2, desc: 'Лаборатория' },
  { id: '209', label: '209', x: 66, y: 60, w: 18, h: 20, type: 'lab',       floor: 2, desc: 'Учебная аудитория' },
  { id: 'wc2', label: 'WC',  x: 82, y: 38, w: 14, h: 10, type: 'wc',       floor: 2, desc: 'Санузел' },
  { id: 'st2', label: '↑↓',  x: 82, y: 54, w: 14, h: 12, type: 'stair',    floor: 2, desc: 'Лестница с лифтом' },
  // Floor 1
  { id: '101', label: '101', x: 10, y: 20, w: 18, h: 14, type: 'classroom', floor: 1, desc: 'Деканат' },
  { id: '102', label: '102', x: 10, y: 36, w: 18, h: 14, type: 'classroom', floor: 1, desc: 'Учебная аудитория' },
  { id: '103', label: '103', x: 10, y: 52, w: 18, h: 14, type: 'classroom', floor: 1, desc: 'Учебная аудитория' },
  { id: '104', label: '104', x: 10, y: 68, w: 18, h: 14, type: 'classroom', floor: 1, desc: 'Лаборатория' },
  { id: '105', label: '105', x: 35, y: 14, w: 20, h: 14, type: 'classroom', floor: 1, desc: 'Конференц-зал' },
  { id: '106', label: '106', x: 57, y: 14, w: 20, h: 14, type: 'classroom', floor: 1, desc: 'Учебная аудитория' },
  { id: '107', label: '107', x: 79, y: 14, w: 18, h: 14, type: 'classroom', floor: 1, desc: 'Учебная аудитория' },
  { id: '108', label: '108', x: 66, y: 38, w: 18, h: 20, type: 'classroom', floor: 1, desc: 'Лекционный зал' },
  { id: '109', label: '109', x: 66, y: 60, w: 18, h: 20, type: 'lab',       floor: 1, desc: 'Серверная' },
  { id: 'wc1', label: 'WC',  x: 82, y: 38, w: 14, h: 10, type: 'wc',       floor: 1, desc: 'Санузел' },
  { id: 'st1', label: '↑↓',  x: 82, y: 54, w: 14, h: 12, type: 'stair',    floor: 1, desc: 'Главный вход' },
  // Floor 3
  { id: '301', label: '301', x: 10, y: 20, w: 18, h: 14, type: 'classroom', floor: 3, desc: 'Кафедра ИВТ' },
  { id: '302', label: '302', x: 10, y: 36, w: 18, h: 14, type: 'classroom', floor: 3, desc: 'Учебная аудитория' },
  { id: '303', label: '303', x: 10, y: 52, w: 18, h: 14, type: 'classroom', floor: 3, desc: 'Учебная аудитория' },
  { id: '304', label: '304', x: 10, y: 68, w: 18, h: 14, type: 'classroom', floor: 3, desc: 'Учебная аудитория' },
  { id: '305', label: '305', x: 35, y: 14, w: 20, h: 14, type: 'classroom', floor: 3, desc: 'Лекционный зал' },
  { id: '306', label: '306', x: 57, y: 14, w: 20, h: 14, type: 'classroom', floor: 3, desc: 'Учебная аудитория' },
  { id: '307', label: '307', x: 79, y: 14, w: 18, h: 14, type: 'classroom', floor: 3, desc: 'Учебная аудитория' },
  { id: '308', label: '308', x: 66, y: 38, w: 18, h: 20, type: 'lab',       floor: 3, desc: 'Компьютерный класс' },
  { id: '309', label: '309', x: 66, y: 60, w: 18, h: 20, type: 'classroom', floor: 3, desc: 'Учебная аудитория' },
]

const navSteps: Record<string, { icon: string; text: string; dist: string }[]> = {
  '209': [
    { icon: '📍', text: 'Вы находитесь здесь', dist: '0 м' },
    { icon: '🚶', text: 'Главный вход, корпус 1, этаж 1', dist: '' },
    { icon: '🪜', text: 'Поднимитесь на 2 этаж', dist: '50 м' },
    { icon: '↰', text: 'Поверните направо', dist: '120 м' },
    { icon: '↳', text: 'Аудитория 209 будет слева', dist: '80 м' },
    { icon: '🏁', text: 'Вы на месте! Аудитория 209', dist: '250 м' },
  ],
  '309': [
    { icon: '📍', text: 'Вы находитесь здесь', dist: '0 м' },
    { icon: '🪜', text: 'Поднимитесь на 3 этаж', dist: '60 м' },
    { icon: '↰', text: 'Поверните направо', dist: '150 м' },
    { icon: '🏁', text: 'Вы на месте! Аудитория 309', dist: '300 м' },
  ],
}

const buildings: { id: Building; label: string; icon?: string }[] = [
  { id: 'k1', label: 'Корпус 1', icon: '🏛' },
  { id: 'k2', label: 'Корпус 2' },
  { id: 'k3', label: 'Корпус 3' },
  { id: 'cafe', label: 'Столовая', icon: '🍽' },
]

const floors: Floor[] = [3, 2, 1, -1]

function roomColor(r: Room, selected: boolean) {
  if (selected) return 'var(--color-primary)'
  if (r.type === 'wc') return '#D1FAE5'
  if (r.type === 'stair') return '#FEF3C7'
  if (r.type === 'lab') return '#EDE9FE'
  return '#FFFFFF'
}
function roomTextColor(r: Room, selected: boolean) {
  if (selected) return '#fff'
  if (r.type === 'stair') return '#92400E'
  if (r.type === 'lab') return '#5B21B6'
  return '#374151'
}

export default function MapScreen() {
  const [building, setBuilding] = useState<Building>('k1')
  const [floor, setFloor] = useState<Floor>(2)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [navigating, setNavigating] = useState(false)
  const [query, setQuery] = useState('')

  const visibleRooms = rooms.filter((r) => r.floor === floor)

  const filteredRooms = query.length > 0
    ? rooms.filter((r) => r.label.toLowerCase().includes(query.toLowerCase()) || r.desc.toLowerCase().includes(query.toLowerCase()))
    : []

  const steps = selectedRoom ? (navSteps[selectedRoom.id] ?? [
    { icon: '📍', text: 'Вы находитесь здесь', dist: '0 м' },
    { icon: '🚶', text: `Следуйте по коридору до аудитории ${selectedRoom.label}`, dist: '80 м' },
    { icon: '🏁', text: `Вы на месте! Аудитория ${selectedRoom.label}`, dist: '150 м' },
  ]) : []

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="pt-12 px-4 pb-3" style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-[22px] font-bold tracking-tight">ICTIS Helper</h1>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ background: 'var(--color-muted-bg)', border: 'none', cursor: 'pointer' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
            </svg>
          </button>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 relative"
          style={{ background: 'var(--color-muted-bg)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="flex-1 bg-transparent text-sm outline-none"
            placeholder="Найти аудиторию, корпус или объект"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedRoom(null) }}
            style={{ color: 'var(--color-foreground)' }}
          />
          {query.length > 0 && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}>
              ×
            </button>
          )}
        </div>

        {/* Search results dropdown */}
        {filteredRooms.length > 0 && (
          <div
            className="absolute left-4 right-4 mt-1 rounded-xl overflow-hidden z-50 shadow-lg animate-slide-up"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', top: 'calc(100%)' }}
          >
            {filteredRooms.slice(0, 6).map((r) => (
              <button
                key={r.id}
                onClick={() => { setSelectedRoom(r); setFloor(r.floor); setQuery('') }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid var(--color-border)' }}
              >
                <span className="font-medium text-sm" style={{ color: 'var(--color-primary)', minWidth: 36 }}>
                  {r.label}
                </span>
                <span className="text-sm" style={{ color: 'var(--color-muted)' }}>{r.desc} · этаж {r.floor}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Building chips */}
      <div
        className="flex gap-2 px-4 py-2.5 overflow-x-auto"
        style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', scrollbarWidth: 'none' }}
      >
        {buildings.map((b) => (
          <button
            key={b.id}
            onClick={() => setBuilding(b.id)}
            className={`chip ${building === b.id ? 'chip-active' : 'chip-inactive'}`}
          >
            {b.icon && <span className="text-xs">{b.icon}</span>}
            {b.label}
          </button>
        ))}
      </div>

      {/* Map + controls */}
      <div className="flex-1 relative overflow-hidden">
        {/* SVG floor plan */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full"
          style={{ background: 'var(--color-map-bg)' }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Outdoor green areas */}
          <rect x="0" y="0" width="100" height="12" fill="var(--color-map-outdoor)" opacity="0.7"/>
          <rect x="0" y="88" width="100" height="12" fill="var(--color-map-outdoor)" opacity="0.7"/>
          <rect x="0" y="0" width="8" height="100" fill="var(--color-map-outdoor)" opacity="0.7"/>
          <rect x="92" y="0" width="8" height="100" fill="var(--color-map-outdoor)" opacity="0.7"/>

          {/* Building shell */}
          <rect x="8" y="10" width="84" height="80" rx="1" fill="#F9FAFB" stroke="#D1D5DB" strokeWidth="0.5"/>

          {/* Corridor / hall horizontal */}
          <rect x="8" y="30" width="84" height="10" fill="var(--color-map-corridor)" stroke="#E5E7EB" strokeWidth="0.3"/>
          {/* Corridor / hall vertical */}
          <rect x="28" y="10" width="6" height="80" fill="var(--color-map-corridor)" stroke="#E5E7EB" strokeWidth="0.3"/>

          {/* Rooms */}
          {visibleRooms.map((r) => {
            const isSel = selectedRoom?.id === r.id
            return (
              <g key={r.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedRoom(isSel ? null : r)}>
                <rect
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  rx="0.8"
                  fill={roomColor(r, isSel)}
                  stroke={isSel ? 'var(--color-primary)' : '#D1D5DB'}
                  strokeWidth={isSel ? 1 : 0.4}
                />
                <text
                  x={r.x + r.w / 2}
                  y={r.y + r.h / 2 + 1.5}
                  textAnchor="middle"
                  fontSize="3.5"
                  fontWeight={isSel ? '700' : '500'}
                  fill={roomTextColor(r, isSel)}
                  fontFamily="Inter, sans-serif"
                >
                  {r.label}
                </text>
              </g>
            )
          })}

          {/* Route: dotted line from stair to selected room */}
          {selectedRoom && navigating && (
            <line
              x1={floor === 1 ? 89 : 89}
              y1={floor === 1 ? 60 : 60}
              x2={selectedRoom.x + selectedRoom.w / 2}
              y2={selectedRoom.y + selectedRoom.h / 2}
              stroke="var(--color-primary)"
              strokeWidth="1.5"
              strokeDasharray="2.5 1.8"
              strokeLinecap="round"
            />
          )}

          {/* You are here dot */}
          {!navigating && (
            <circle cx="89" cy="60" r="2.5" fill="var(--color-primary)" stroke="white" strokeWidth="1"/>
          )}
          {navigating && (
            <>
              <circle cx="89" cy="60" r="4" fill="var(--color-primary)" opacity="0.15"/>
              <circle cx="89" cy="60" r="2.5" fill="var(--color-primary)" stroke="white" strokeWidth="1"/>
            </>
          )}
        </svg>

        {/* Floor selector */}
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 rounded-2xl overflow-hidden shadow-sm"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          {floors.map((f) => (
            <button
              key={f}
              onClick={() => { setFloor(f); setSelectedRoom(null) }}
              className="w-9 h-9 flex items-center justify-center text-sm font-semibold transition-colors"
              style={{
                background: floor === f ? 'var(--color-primary)' : 'transparent',
                color: floor === f ? '#fff' : 'var(--color-muted)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {f === -1 ? '-1' : f}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div
          className="absolute right-3 top-4 flex flex-col gap-1 rounded-2xl overflow-hidden shadow-sm"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          {[
            <svg key="compass" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="#6B7280"/></svg>,
            <svg key="3d" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
            <svg key="layers" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2"><polygon points="12 2 22 8.5 12 15 2 8.5 12 2"/><polyline points="2 15.5 12 22 22 15.5"/></svg>,
          ].map((icon, i) => (
            <button
              key={i}
              className="w-9 h-9 flex items-center justify-center"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Show all */}
        <button
          className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm"
          style={{ background: 'var(--color-surface)', color: 'var(--color-primary)', border: '1px solid var(--color-border)', cursor: 'pointer' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
          </svg>
          Показать все объекты
        </button>

        {/* Floor label */}
        <div
          className="absolute left-3 bottom-3 flex items-center gap-1 text-xs font-medium"
          style={{ color: 'var(--color-muted)' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          Корпус 1 · Этаж {floor}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
      </div>

      {/* Bottom sheet: room detail */}
      {selectedRoom && (
        <div
          className="flex flex-col animate-slide-up"
          style={{
            background: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
            maxHeight: '52%',
          }}
        >
          {/* Handle */}
          <div className="flex justify-center pt-2 pb-1">
            <div className="w-10 h-1 rounded-full" style={{ background: 'var(--color-border)' }} />
          </div>

          {/* Room header */}
          <div className="px-4 pb-3 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h2 className="text-[18px] font-bold">Аудитория {selectedRoom.label}</h2>
              </div>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                Корпус 1, этаж {selectedRoom.floor} · {selectedRoom.desc}
              </p>
            </div>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium"
              style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)', border: 'none', cursor: 'pointer' }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              В избранное
            </button>
          </div>

          {/* Route meta */}
          {navigating && (
            <div className="px-4 pb-3 flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--color-muted)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                3–5 мин
              </div>
              <span style={{ color: 'var(--color-border)' }}>·</span>
              <div className="text-sm" style={{ color: 'var(--color-muted)' }}>~ 150–250 м</div>
              <div className="ml-auto">
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: 'var(--color-green-bg)', color: 'var(--color-green)' }}
                >
                  Маршрут активен
                </span>
              </div>
            </div>
          )}

          {/* Steps */}
          {navigating ? (
            <div className="overflow-y-auto px-4 pb-4 flex flex-col gap-0">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-3 py-2.5 relative">
                  {i < steps.length - 1 && (
                    <div
                      className="absolute left-[11px] top-8 bottom-0 w-0.5"
                      style={{ background: i === 0 ? 'var(--color-primary)' : 'var(--color-border)' }}
                    />
                  )}
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-none mt-0.5"
                    style={{
                      background: i === 0 ? 'var(--color-primary)' : i === steps.length - 1 ? 'var(--color-primary)' : 'var(--color-border)',
                      border: i > 0 && i < steps.length - 1 ? '2px solid var(--color-border-strong)' : 'none',
                    }}
                  >
                    {(i === 0 || i === steps.length - 1) && (
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-snug">{step.text}</p>
                    {step.dist && <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{step.dist}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 pb-4">
              <button
                onClick={() => setNavigating(true)}
                className="w-full py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2"
                style={{ background: 'var(--color-primary)', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"/>
                </svg>
                Начать навигацию
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
