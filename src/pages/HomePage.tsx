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
    description: "Создавайте этикетки любого размера с текстом, логотипом и кодами",
    iconColor: "#8b5cf6",
  },
  {
    id: "barcode" as ToolType,
    icon: "BarChart2",
    label: "Штрих-код",
    description: "EAN-13, Code128, Data Matrix — все форматы с проверкой суммы",
    iconColor: "#a78bfa",
  },
  {
    id: "qr" as ToolType,
    icon: "QrCode",
    label: "QR-код",
    description: "Ссылки, контакты, Wi-Fi, произвольный текст с настройкой коррекции",
    iconColor: "#7c3aed",
  },
]

const extras = [
  { icon: "Grid3x3", label: "Data Matrix", desc: "2D-матрица для малых площадей" },
  { icon: "LayoutTemplate", label: "Шаблоны", desc: "Готовые макеты этикеток" },
  { icon: "Layers", label: "Серийная печать", desc: "Печать из CSV-файла" },
  { icon: "Printer", label: "ZPL / ESC/POS", desc: "Экспорт для промышленных принтеров" },
  { icon: "CloudUpload", label: "Синхронизация", desc: "Облачное хранение шаблонов" },
  { icon: "ShoppingBag", label: "База товаров", desc: "Автозаполнение из каталога" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 28 } },
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-6 py-12 overflow-hidden">
      <motion.div
        className="fixed z-0 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--glow-color) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "-20%",
          right: "-15%",
        }}
        animate={{ x: [0, -60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed z-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, var(--glow-color) 0%, transparent 70%)",
          filter: "blur(60px)",
          bottom: "-10%",
          left: "-5%",
        }}
        animate={{ x: [0, 50, 0], y: [0, -40, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 w-full max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6"
            style={{
              background: "rgba(139, 92, 246, 0.1)",
              color: "var(--violet-accent)",
              border: "1px solid var(--surface-border)",
            }}
          >
            <Icon name="Zap" size={12} />
            Быстро. Просто. Профессионально.
          </div>
          <h1
            className="text-5xl font-bold tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Конструктор этикеток
          </h1>
          <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
            Выберите тип элемента для начала работы
          </p>
        </motion.div>

        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10" variants={containerVariants}>
          {tools.map((tool) => (
            <motion.button
              key={tool.id}
              variants={itemVariants}
              onClick={() => onNavigate("constructor", tool.id)}
              className="group relative flex flex-col items-center gap-5 p-8 rounded-3xl text-center transition-all"
              style={{
                background: "var(--surface)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid var(--surface-border)",
                boxShadow: "0 4px 24px var(--glow-color), 0 1px 4px rgba(0,0,0,0.06)",
              }}
              whileHover={{
                scale: 1.04,
                y: -6,
                boxShadow: "0 16px 48px var(--glow-color), 0 4px 12px rgba(0,0,0,0.08)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid var(--surface-border)",
                }}
              >
                <Icon name={tool.icon} size={28} style={{ color: "var(--violet-accent)" }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
                  {tool.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
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

        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px" style={{ background: "var(--surface-border)" }} />
            <span className="text-xs font-medium px-3" style={{ color: "var(--text-muted)" }}>
              Дополнительные возможности
            </span>
            <div className="flex-1 h-px" style={{ background: "var(--surface-border)" }} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {extras.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => onNavigate("constructor")}
                className="flex flex-col items-center gap-2.5 p-4 rounded-2xl text-center transition-all group"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--surface-border)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
                whileHover={{
                  scale: 1.05,
                  background: "var(--surface-hover)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(139, 92, 246, 0.1)" }}
                >
                  <Icon
                    name={item.icon}
                    size={18}
                    style={{ color: "var(--violet-accent)" }}
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>
                    {item.label}
                  </div>
                  <div className="text-[10px] leading-tight" style={{ color: "var(--text-muted)" }}>
                    {item.desc}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div className="flex justify-center mt-8" variants={itemVariants}>
          <motion.button
            onClick={() => onNavigate("library")}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all"
            style={{
              background: "var(--surface)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid var(--surface-border)",
              color: "var(--text-secondary)",
            }}
            whileHover={{ scale: 1.03, color: "var(--violet-accent)" }}
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
