import { AppLayout } from "../components/layout/AppLayout"
import { AppProviders } from "./providers"
import { AppRoutes } from "./routes"

export function App() {
  return (
    <AppProviders>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </AppProviders>
  )
}
