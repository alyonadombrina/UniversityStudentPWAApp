import { useState } from 'react'

const profile = {
  name: 'Алина Карпова',
  faculty: 'Факультет КН и ИТ',
  group: 'Группа 222 · 2 курс',
  gpa: '4.7',
  av: 'АК',
}

const upcoming = [
  { icon: '📌', title: 'Лабораторная №3 по БД', due: 'Сегодня, 23:59', urgent: true },
  { icon: '📝', title: 'Зачёт по философии',   due: 'Ср, 11:00 · А-102', urgent: false },
  { icon: '🎓', title: 'Научная конференция',  due: 'Пт, 13:00 · Акт. зал', urgent: false },
]

const recommendations = [
  { tag: 'Курс',      title: 'ML с нуля на Python',            sub: 'Stepik · 6 модулей · Бесплатно',  color: '#1A6EF2' },
  { tag: 'Хакатон',   title: 'Цифровой университет',           sub: '14–15 декабря · Регистрация открыта', color: '#F59E0B' },
  { tag: 'Библиотека',title: 'Clean Code · Роберт Мартин',     sub: 'Корпус В · 3 экземпляра',         color: '#7C3AED' },
  { tag: 'Стипендия', title: 'Повышенная стипендия · Весна',   sub: 'Документы до 1 декабря',          color: '#22C55E' },
]

const stats = [
  { label: 'Пар сегодня', value: '3' },
  { label: 'Ср. балл',    value: '4.7' },
  { label: 'До сессии',   value: '18д' },
]

export default function ProfileScreen() {
  const [saved, setSaved] = useState(new Set<number>())

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Profile header */}
      <div
        className="pt-12 px-4 pb-5"
        style={{ background: 'var(--color-primary)' }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg flex-none"
            style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}
          >
            {profile.av}
          </div>
          <div className="flex-1">
            <h2 className="text-base font-bold text-white leading-tight">{profile.name}</h2>
            <p className="text-xs text-white/60 mt-0.5">{profile.faculty}</p>
            <p className="text-xs text-white/50">{profile.group}</p>
          </div>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl px-3 py-3 text-center"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            >
              <div className="text-lg font-bold text-white">{s.value}</div>
              <div className="text-[10px] text-white/50 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5">
        {/* Upcoming */}
        <section>
          <h3 className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: 'var(--color-muted)' }}>
            Ближайшее
          </h3>
          <div className="flex flex-col gap-2">
            {upcoming.map((u, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{
                  background: u.urgent ? '#FFF7ED' : 'var(--color-surface)',
                  border: `1px solid ${u.urgent ? '#FED7AA' : 'var(--color-border)'}`,
                }}
              >
                <span className="text-lg flex-none">{u.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{u.title}</p>
                  <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-muted)' }}>{u.due}</p>
                </div>
                {u.urgent && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-none"
                    style={{ background: '#FED7AA', color: '#C2410C' }}>
                    Срочно
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <h3 className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: 'var(--color-muted)' }}>
            Рекомендации для вас
          </h3>
          <div className="flex flex-col gap-3">
            {recommendations.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 animate-slide-up"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', animationDelay: `${i * 55}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: r.color + '18', color: r.color }}
                  >
                    {r.tag}
                  </span>
                  <button
                    onClick={() => setSaved(prev => {
                      const n = new Set(prev)
                      n.has(i) ? n.delete(i) : n.add(i)
                      return n
                    })}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24"
                      fill={saved.has(i) ? 'var(--color-primary)' : 'none'}
                      stroke={saved.has(i) ? 'var(--color-primary)' : '#D1D5DB'}
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
                </div>
                <h3 className="font-semibold text-sm">{r.title}</h3>
                <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>{r.sub}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="h-4" />
      </div>
    </div>
  )
}
