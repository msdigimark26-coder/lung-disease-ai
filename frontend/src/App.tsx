import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from './pages/Dashboard'
import PatientPortal from './pages/PatientPortal'
import LiveVitalsPage from './pages/LiveVitalsPage'
import AIAnalysisPage from './pages/AIAnalysisPage'
import AlertsPage from './pages/AlertsPage'
import PatientsPage from './pages/PatientsPage'
import SettingsPage from './pages/SettingsPage'
import UpgradePage from './pages/UpgradePage'
import NotificationsPage from './pages/NotificationsPage'
import DownloadAppPage from './pages/DownloadAppPage'
import { DashboardLayout } from './components/layout/DashboardLayout'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/doctor" replace />} />
          <Route element={<DashboardLayout />}>
            <Route path="/doctor" element={<DashboardPage />} />
            <Route path="/vitals" element={<LiveVitalsPage />} />
            <Route path="/analysis" element={<AIAnalysisPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/upgrade" element={<UpgradePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/download" element={<DownloadAppPage />} />
          </Route>
          <Route path="/patient/:id" element={<PatientPortal />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
