import { useState } from 'react'

type Category = 'departments' | 'staff' | 'services'

const categories: { id: Category; label: string }[] = [
  { id: 'departments', label: 'Кафедры' },
  { id: 'staff',       label: 'Сотрудники' },
  { id: 'services',    label: 'Сервисы' },
]

const departments = [
  { name: 'Кафедра информатики и ВТ', code: 'ИВТ', room: 'Б-300', head: 'Иванов С.М.',      phone: '+7 (495) 123-45-67', color: '#1A6EF2' },
  { name: 'Кафедра математики',       code: 'КМ',  room: 'А-301', head: 'Коваленко М.А.',   phone: '+7 (495) 123-45-68', color: '#7C3AED' },
  { name: 'Кафедра физики',           code: 'КФ',  room: 'Б-100', head: 'Шевченко Р.И.',    phone: '+7 (495) 123-45-69', color: '#0891B2' },
  { name: 'Кафедра иностранных языков','code': 'ИЯ', room: 'Б-200', head: 'Романова Е.С.', phone: '+7 (495) 123-45-70', color: '#22C55E' },
  { name: 'Кафедра философии',        code: 'ФЛ',  room: 'А-102', head: 'Белова Н.П.',      phone: '+7 (495) 123-45-71', color: '#F59E0B' },
]

const staff = [
  { name: 'Коваленко Михаил Алексеевич',      role: 'Доцент · Математика',        room: 'А-301', av: 'КМ', color: '#1A6EF2' },
  { name: 'Савченко Дмитрий Вячеславович',    role: 'Ст. преподаватель · CS',     room: 'Лаб-1', av: 'СД', color: '#7C3AED' },
  { name: 'Романова Елена Сергеевна',         role: 'Доцент · Иностранные языки', room: 'Б-200', av: 'РЕ', color: '#22C55E' },
  { name: 'Шевченко Роман Игоревич',          role: 'Профессор · Теорвер',        room: 'А-202', av: 'ШР', color: '#0891B2' },
  { name: 'Петров Андрей Константинович',     role: 'Доцент · Базы данных',       room: 'Б-300', av: 'ПА', color: '#F59E0B' },
  { name: 'Белова Наталья Петровна',          role: 'Ст. преподаватель · Философия',room:'А-102', av: 'БН', color: '#EF4444' },
]

const services = [
  { name: 'Деканат ФКН',       desc: 'Академические вопросы',  room: 'А-Акт', hours: 'Пн–Пт 10–17', icon: '🏛', color: '#1A6EF2' },
  { name: 'Библиотека',        desc: 'Книги, журналы, ресурсы',room: 'Корп. В',hours: 'Пн–Сб 9–21',  icon: '📚', color: '#7C3AED' },
  { name: 'Студенческий офис', desc: 'Справки, документы',      room: 'А-101', hours: 'Пн–Пт 9–18',  icon: '📋', color: '#0891B2' },
  { name: 'Столовая',          desc: 'Питание, кофе, буфет',   room: 'Столов.',hours: 'Пн–Пт 8–20',  icon: '🍽', color: '#F59E0B' },
  { name: 'IT-поддержка',      desc: 'Помощь с техникой и ПО', room: 'Лаб-2', hours: 'Пн–Пт 10–19', icon: '💻', color: '#22C55E' },
  { name: 'Медпункт',          desc: 'Первая помощь',           room: 'А-102', hours: 'Пн–Пт 9–17',  icon: '🩺', color: '#EF4444' },
]

export default function DirectoryScreen() {
  const [category, setCategory] = useState<Category>('departments')
  const [query, setQuery] = useState('')

  const filter = (name: string) => name.toLowerCase().includes(query.toLowerCase())

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="pt-12 px-4 pb-3" style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <h1 className="text-[22px] font-bold tracking-tight mb-3">Справочник</h1>
        <div
          className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5"
          style={{ background: 'var(--color-muted-bg)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="flex-1 bg-transparent text-sm outline-none"
            placeholder="Поиск…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex gap-0 px-4 py-2.5 overflow-x-auto"
        style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', scrollbarWidth: 'none' }}
      >
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className="px-4 py-1.5 rounded-xl text-sm font-medium transition-all mr-1"
            style={{
              background: category === c.id ? 'var(--color-primary-light)' : 'transparent',
              color: category === c.id ? 'var(--color-primary)' : 'var(--color-muted)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5">
        {category === 'departments' && departments.filter(d => filter(d.name) || filter(d.head)).map((d, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 animate-slide-up"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', animationDelay: `${i * 45}ms` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-none"
                style={{ background: d.color + '18', color: d.color }}
              >
                {d.code}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm leading-tight">{d.name}</h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
                  {d.head} · <span className="font-mono">{d.room}</span>
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 8.11 8.11l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 18v-.92z"/>
              </svg>
              <span className="font-mono text-xs" style={{ color: 'var(--color-muted)' }}>{d.phone}</span>
            </div>
          </div>
        ))}

        {category === 'staff' && staff.filter(s => filter(s.name) || filter(s.role)).map((s, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 flex items-center gap-3 animate-slide-up"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', animationDelay: `${i * 45}ms` }}
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold flex-none"
              style={{ background: s.color + '18', color: s.color }}
            >
              {s.av}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm leading-tight truncate">{s.name}</h3>
              <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-muted)' }}>{s.role}</p>
              <span
                className="inline-block font-mono text-[10px] px-2 py-0.5 rounded-md mt-1"
                style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
              >
                {s.room}
              </span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="2.2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        ))}

        {category === 'services' && services.filter(s => filter(s.name)).map((s, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 flex items-center gap-4 animate-slide-up"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', animationDelay: `${i * 45}ms` }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-none"
              style={{ background: s.color + '15' }}
            >
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm">{s.name}</h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{s.desc}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded-md"
                  style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}
                >
                  {s.room}
                </span>
                <span className="text-[10px]" style={{ color: 'var(--color-muted)' }}>{s.hours}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="h-4" />
      </div>
    </div>
  )
}
