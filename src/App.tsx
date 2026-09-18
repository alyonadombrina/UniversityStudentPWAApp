import { useState } from 'react'
import MapScreen from './screens/MapScreen'
import ScheduleScreen from './screens/ScheduleScreen'
import DirectoryScreen from './screens/DirectoryScreen'
import ProfileScreen from './screens/ProfileScreen'
import NavBar from './components/NavBar'

export type Tab = 'map' | 'schedule' | 'directory' | 'profile'

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('map')
  const [notifCount] = useState(2)

  return (
    <div
      className="flex flex-col h-full max-w-sm mx-auto relative overflow-hidden"
      style={{ background: 'var(--color-background)', fontFamily: 'var(--font-sans)' }}
    >
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'map'       && <MapScreen />}
        {activeTab === 'schedule'  && <ScheduleScreen />}
        {activeTab === 'directory' && <DirectoryScreen />}
        {activeTab === 'profile'   && <ProfileScreen />}
      </div>
      <NavBar active={activeTab} onChange={setActiveTab} notifCount={notifCount} />
    </div>
  )
}
