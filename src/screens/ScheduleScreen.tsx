import { useState } from 'react'

const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']

const schedule: Record<number, { time: string; end: string; title: string; room: string; prof: string; type: string; color: string }[]> = {
  0: [
    { time: '09:00', end: '10:30', title: 'Математический анализ', room: 'А-301', prof: 'Коваленко М.А.', type: 'Лекция', color: '#1A6EF2' },
    { time: '11:00', end: '12:30', title: 'Программирование Python', room: 'Лаб-1',  prof: 'Савченко Д.В.',  type: 'Лаб. работа', color: '#7C3AED' },
    { time: '14:00', end: '15:30', title: 'Английский язык',        room: 'Б-200',  prof: 'Романова Е.С.', type: 'Практика', color: '#22C55E' },
  ],
  1: [
    { time: '10:00', end: '11:30', title: 'Теория вероятностей',    room: 'А-202',  prof: 'Шевченко Р.И.', type: 'Лекция', color: '#1A6EF2' },
    { time: '13:00', end: '14:30', title: 'Базы данных',            room: 'Лаб-2',  prof: 'Петров А.К.',   type: 'Лаб. работа', color: '#7C3AED' },
  ],
  2: [
    { time: '09:00', end: '10:30', title: 'Алгоритмы и структуры',  room: 'А-301',  prof: 'Иванов С.М.',   type: 'Лекция', color: '#1A6EF2' },
    { time: '11:00', end: '12:30', title: 'Физкультура',            room: 'Зал 1',  prof: 'Морозов В.Г.',  type: 'Практика', color: '#22C55E' },
    { time: '15:00', end: '16:30', title: 'Математический анализ',  room: 'А-201',  prof: 'Коваленко М.А.', type: 'Семинар', color: '#F59E0B' },
  ],
  3: [
    { time: '10:00', end: '11:30', title: 'Программирование Python', room: 'Лаб-1', prof: 'Савченко Д.В.',  type: 'Лаб. работа', color: '#7C3AED' },
    { time: '13:00', end: '14:30', title: 'Философия',               room: 'А-102', prof: 'Белова Н.П.',    type: 'Лекция', color: '#1A6EF2' },
  ],
  4: [
    { time: '09:00', end: '10:30', title: 'Базы данных',            room: 'А-201',  prof: 'Петров А.К.',   type: 'Лекция', color: '#1A6EF2' },
    { time: '11:00', end: '12:30', title: 'Английский язык',        room: 'Б-210',  prof: 'Романова Е.С.', type: 'Практика', color: '#22C55E' },
  ],
  5: [],
}

const todayRaw = new Date().getDay()
const todayIdx = todayRaw === 0 ? 5 : todayRaw - 1

export default function ScheduleScreen() {
  const [activeDay, setActiveDay] = useState(todayIdx < 6 ? todayIdx : 0)

  const lessons = schedule[activeDay] ?? []
  const dateStr = (() => {
    const d = new Date()
    const offset = activeDay - todayIdx
    d.setDate(d.getDate() + offset)
    return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
  })()

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="pt-12 px-4 pb-3" style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <h1 className="text-[22px] font-bold tracking-tight mb-3">Расписание</h1>

        {/* Day row */}
        <div className="flex gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {days.map((d, i) => {
            const isToday = i === todayIdx
            const isActive = i === activeDay
            return (
              <button
                key={d}
                onClick={() => setActiveDay(i)}
                className="flex-none flex flex-col items-center py-2 px-3 rounded-2xl transition-all"
                style={{
                  background: isActive ? 'var(--color-primary)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  minWidth: 44,
                }}
              >
                <span className="text-[10px] font-medium mb-1" style={{ color: isActive ? 'rgba(255,255,255,0.7)' : 'var(--color-muted)' }}>
                  {d}
                </span>
                <span
                  className="text-base font-semibold"
                  style={{ color: isActive ? '#fff' : isToday ? 'var(--color-primary)' : 'var(--color-foreground)' }}
                >
                  {(() => { const dd = new Date(); dd.setDate(dd.getDate() + i - todayIdx); return dd.getDate() })()}
                </span>
                {isToday && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full mt-1" style={{ background: 'var(--color-primary)' }} />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Date label */}
      <div className="px-4 py-2.5 flex items-center justify-between" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
        <span className="text-sm font-semibold">{dateStr}</span>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>
          {lessons.length} {lessons.length === 1 ? 'пара' : lessons.length < 5 ? 'пары' : 'пар'}
        </span>
      </div>

      {/* Lessons */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {lessons.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'var(--color-primary-light)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <p className="font-semibold text-sm">Занятий нет</p>
            <p className="text-xs" style={{ color: 'var(--color-muted)' }}>Отдыхайте или занимайтесь самостоятельно</p>
          </div>
        ) : (
          lessons.map((lesson, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden animate-slide-up"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                animationDelay: `${i * 55}ms`,
              }}
            >
              {/* Color bar */}
              <div className="h-1" style={{ background: lesson.color }} />
              <div className="p-4 flex gap-4">
                {/* Time */}
                <div className="flex flex-col items-center gap-0.5 pt-0.5" style={{ minWidth: 42 }}>
                  <span className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>{lesson.time}</span>
                  <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{lesson.end}</span>
                </div>
                {/* Separator */}
                <div className="w-px self-stretch" style={{ background: 'var(--color-border)' }} />
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm leading-snug mb-1">{lesson.title}</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: lesson.color + '18', color: lesson.color }}
                    >
                      {lesson.type}
                    </span>
                    <span className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>
                      {lesson.room}
                    </span>
                  </div>
                  <p className="text-xs mt-1.5" style={{ color: 'var(--color-muted)' }}>{lesson.prof}</p>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="h-4" />
      </div>
    </div>
  )
}
