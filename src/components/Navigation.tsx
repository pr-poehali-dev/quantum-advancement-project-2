import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"
import type { Page } from "@/App"

interface NavigationProps {
  currentPage: Page
  onNavigate: (page: Page) => void
  darkMode: boolean
  onToggleDark: () => void
}

const navItems: { label: string; page: Page; icon: string }[] = [
  { label: "Главная", page: "home", icon: "Home" },
  { label: "Конструктор", page: "constructor", icon: "PenTool" },
  { label: "Библиотека", page: "library", icon: "Library" },
]

export function Navigation({ currentPage, onNavigate, darkMode, onToggleDark }: NavigationProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16"
      style={{
        background: "var(--panel-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--surface-border)",
        boxShadow: "0 1px 20px var(--glow-color)",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "var(--violet-accent)" }}
        >
          <Icon name="Tag" size={16} className="text-white" />
        </div>
        <span className="text-sm font-semibold" style={{ color: "var(--violet-accent)" }}>
          LabelGen
        </span>
      </div>

      <div className="flex items-center gap-1">
        {navItems.map((item) => (
          <motion.button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className="relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            style={{
              color: currentPage === item.page ? "var(--violet-accent)" : "var(--text-secondary)",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {currentPage === item.page && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 rounded-xl"
                style={{ background: "rgba(139, 92, 246, 0.12)" }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <Icon name={item.icon} size={15} />
            <span className="relative">{item.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          onClick={onToggleDark}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid var(--surface-border)",
            color: "var(--violet-accent)",
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          title={darkMode ? "Светлая тема" : "Тёмная тема"}
        >
          <Icon name={darkMode ? "Sun" : "Moon"} size={16} />
        </motion.button>

        <motion.button
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
          style={{
            background: "rgba(139, 92, 246, 0.1)",
            border: "1px solid var(--surface-border)",
            color: "var(--violet-accent)",
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
        >
          <Icon name="User" size={16} />
        </motion.button>
      </div>
    </nav>
  )
}
