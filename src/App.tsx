import { useState } from "react"
import { HomePage } from "./pages/HomePage"
import { ConstructorPage } from "./pages/ConstructorPage"
import { LibraryPage } from "./pages/LibraryPage"
import { Navigation } from "./components/Navigation"

export type Page = "home" | "constructor" | "library"
export type ToolType = "label" | "barcode" | "qr" | null

function App() {
  const [page, setPage] = useState<Page>("home")
  const [activeTool, setActiveTool] = useState<ToolType>(null)

  const navigateTo = (p: Page, tool?: ToolType) => {
    setPage(p)
    if (tool) setActiveTool(tool)
  }

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: "var(--violet-bg)" }}>
      <Navigation currentPage={page} onNavigate={(p) => navigateTo(p)} />
      <main className="pt-16">
        {page === "home" && <HomePage onNavigate={navigateTo} />}
        {page === "constructor" && <ConstructorPage activeTool={activeTool} />}
        {page === "library" && <LibraryPage onNavigate={navigateTo} />}
      </main>
    </div>
  )
}

export default App
