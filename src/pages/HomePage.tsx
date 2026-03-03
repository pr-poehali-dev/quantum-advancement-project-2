import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"
import type { Page, ToolType } from "@/App"

interface HomePageProps {
  onNavigate: (page: Page, tool?: ToolType) => void
}

const tools = [
  {
    id: "label" as ToolType,
    icon: "Tag",
    label: "Этикетка",
    description: "Создавайте этикетки любого размера",
    gradient: "from-violet-500 to-purple-600",
    bg: "rgba(139, 92, 246, 0.08)",
    border: "rgba(139, 92, 246, 0.2)",
    iconColor: "#8b5cf6",
  },
  {
    id: "barcode" as ToolType,
    icon: "BarChart2",
    label: "Штрих-код",
    description: "EAN-13, Code128, QR и другие",
    gradient: "from-purple-500 to-indigo-600",
    bg: "rgba(124, 58, 237, 0.08)",
    border: "rgba(124, 58, 237, 0.2)",
    iconColor: "#7c3aed",
  },
  {
    id: "qr" as ToolType,
    icon: "QrCode",
    label: "QR-код",
    description: "Ссылки, текст, контакты, Wi-Fi",
    gradient: "from-indigo-500 to-violet-600",
    bg: "rgba(99, 102, 241, 0.08)",
    border: "rgba(99, 102, 241, 0.2)",
    iconColor: "#6366f1",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 28 } },
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div
        className="fixed z-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "-15%",
          right: "-10%",
        }}
        animate={{ x: [0, -60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed z-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(167, 139, 250, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          bottom: "-10%",
          left: "-5%",
        }}
        animate={{ x: [0, 50, 0], y: [0, -40, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 w-full max-w-3xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6"
            style={{
              background: "rgba(139, 92, 246, 0.1)",
              color: "var(--violet-accent)",
              border: "1px solid rgba(139, 92, 246, 0.2)",
            }}
          >
            <Icon name="Zap" size={12} />
            Быстро. Просто. Профессионально.
          </div>
          <h1
            className="text-5xl font-bold tracking-tight mb-4"
            style={{ color: "#1e0a3c" }}
          >
            Конструктор этикеток
          </h1>
          <p className="text-lg" style={{ color: "#6b7280" }}>
            Выберите тип элемента для начала работы
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-5" variants={containerVariants}>
          {tools.map((tool) => (
            <motion.button
              key={tool.id}
              variants={itemVariants}
              onClick={() => onNavigate("constructor", tool.id)}
              className="group relative flex flex-col items-center gap-5 p-8 rounded-3xl text-center transition-all"
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${tool.border}`,
                boxShadow: "0 4px 24px rgba(139, 92, 246, 0.06), 0 1px 4px rgba(0,0,0,0.04)",
              }}
              whileHover={{
                scale: 1.04,
                y: -6,
                boxShadow: "0 12px 40px rgba(139, 92, 246, 0.18), 0 4px 12px rgba(0,0,0,0.06)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: tool.bg, border: `1px solid ${tool.border}` }}
              >
                <Icon name={tool.icon} size={28} style={{ color: tool.iconColor }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1" style={{ color: "#1e0a3c" }}>
                  {tool.label}
                </h3>
                <p className="text-sm" style={{ color: "#9ca3af" }}>
                  {tool.description}
                </p>
              </div>
              <div
                className="flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--violet-accent)" }}
              >
                Создать <Icon name="ArrowRight" size={12} />
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.div className="flex justify-center mt-10" variants={itemVariants}>
          <motion.button
            onClick={() => onNavigate("library")}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(139, 92, 246, 0.15)",
              color: "#6b7280",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
            whileHover={{ scale: 1.03, color: "#8b5cf6" }}
            whileTap={{ scale: 0.97 }}
          >
            <Icon name="Library" size={16} />
            Открыть библиотеку
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
