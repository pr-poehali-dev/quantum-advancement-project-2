import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"
import type { Page } from "@/App"

interface LibraryPageProps {
  onNavigate: (page: Page) => void
}

const mockLabels = [
  {
    id: 1,
    name: "Этикетка товара",
    size: "58×40 мм",
    type: "label",
    date: "02.03.2026",
    preview: [
      { text: "Наименование товара", bold: true, y: 18 },
      { barcode: true, y: 44 },
      { text: "4607061250021", y: 74 },
    ],
  },
  {
    id: 2,
    name: "QR-код магазина",
    size: "50×50 мм",
    type: "qr",
    date: "01.03.2026",
    preview: [{ qr: true, y: 15 }],
  },
  {
    id: 3,
    name: "Штрих-код EAN-13",
    size: "100×50 мм",
    type: "barcode",
    date: "28.02.2026",
    preview: [
      { text: "Артикул: 00123456", bold: true, y: 12 },
      { barcode: true, y: 36 },
      { text: "5 901234 123457", y: 80 },
    ],
  },
  {
    id: 4,
    name: "Ценник акционный",
    size: "58×40 мм",
    type: "label",
    date: "27.02.2026",
    preview: [
      { text: "АКЦИЯ", bold: true, y: 12 },
      { text: "299 ₽", bold: true, y: 36 },
      { text: "Скидка 30%", y: 66 },
    ],
  },
  {
    id: 5,
    name: "Адресная этикетка",
    size: "148×210 мм",
    type: "label",
    date: "26.02.2026",
    preview: [
      { text: "Получатель:", bold: true, y: 16 },
      { text: "Иванов Иван", y: 36 },
      { text: "г. Москва, ул. Пушкина", y: 56 },
    ],
  },
  {
    id: 6,
    name: "QR меню кафе",
    size: "100×100 мм",
    type: "qr",
    date: "25.02.2026",
    preview: [
      { text: "Наше меню", bold: true, y: 12 },
      { qr: true, y: 32 },
    ],
  },
  {
    id: 7,
    name: "Data Matrix лекарство",
    size: "30×20 мм",
    type: "datamatrix",
    date: "24.02.2026",
    preview: [
      { text: "АРТ-007", bold: true, y: 12 },
      { qr: true, y: 32 },
    ],
  },
  {
    id: 8,
    name: "Серийная партия",
    size: "80×50 мм",
    type: "barcode",
    date: "23.02.2026",
    preview: [
      { text: "Партия №001", bold: true, y: 12 },
      { barcode: true, y: 36 },
    ],
  },
]

const typeColors: Record<string, { bg: string; color: string; label: string; icon: string }> = {
  label: { bg: "rgba(139,92,246,0.12)", color: "#8b5cf6", label: "Этикетка", icon: "Tag" },
  barcode: { bg: "rgba(124,58,237,0.12)", color: "#7c3aed", label: "Штрих-код", icon: "BarChart2" },
  qr: { bg: "rgba(99,102,241,0.12)", color: "#6366f1", label: "QR-код", icon: "QrCode" },
  datamatrix: { bg: "rgba(167,139,250,0.12)", color: "#a78bfa", label: "Data Matrix", icon: "Grid3x3" },
}

const filterTypes = ["Все", "Этикетка", "Штрих-код", "QR-код", "Data Matrix"]

function LabelPreview({ preview }: { preview: typeof mockLabels[0]["preview"] }) {
  return (
    <div
      className="relative w-full rounded-xl overflow-hidden"
      style={{
        height: 110,
        background: "var(--canvas-bg)",
        border: "1px dashed rgba(139,92,246,0.2)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.04) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
        }}
      />
      {preview.map((el, i) => {
        if ("barcode" in el && el.barcode) {
          return (
            <div key={i} className="absolute" style={{ left: 12, top: el.y }}>
              <span className="font-mono" style={{ fontSize: 18, letterSpacing: "-2px", color: "var(--text-primary)" }}>
                ▌▌█▌▌▌█▌█▌▌▌█
              </span>
            </div>
          )
        }
        if ("qr" in el && el.qr) {
          return (
            <div
              key={i}
              className="absolute flex items-center justify-center"
              style={{ left: "50%", top: el.y, transform: "translateX(-50%)" }}
            >
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(139,92,246,0.08)", border: "1px solid var(--surface-border)" }}
              >
                <Icon name="QrCode" size={36} style={{ color: "var(--violet-accent)" }} />
              </div>
            </div>
          )
        }
        if ("text" in el) {
          return (
            <div key={i} className="absolute" style={{ left: 12, top: el.y }}>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: el.bold ? 700 : 400,
                  color: "var(--text-primary)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {el.text}
              </span>
            </div>
          )
        }
        return null
      })}
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 28 } },
}

export function LibraryPage({ onNavigate }: LibraryPageProps) {
  const [labels, setLabels] = useState(mockLabels)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("Все")
  const [syncing, setSyncing] = useState(false)

  const handleDelete = (id: number) => {
    setDeletingId(id)
    setTimeout(() => {
      setLabels((prev) => prev.filter((l) => l.id !== id))
      setDeletingId(null)
    }, 300)
  }

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => setSyncing(false), 2000)
  }

  const filterMap: Record<string, string> = {
    "Этикетка": "label",
    "Штрих-код": "barcode",
    "QR-код": "qr",
    "Data Matrix": "datamatrix",
  }

  const filteredLabels = labels.filter((l) => {
    const matchType = activeFilter === "Все" || l.type === filterMap[activeFilter]
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.size.toLowerCase().includes(search.toLowerCase())
    return matchType && matchSearch
  })

  return (
    <div className="min-h-[calc(100vh-64px)] flex">
      <div
        className="w-52 flex flex-col p-4 gap-4"
        style={{
          background: "var(--panel-bg)",
          borderRight: "1px solid var(--surface-border)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
            Тип
          </p>
          <div className="flex flex-col gap-1">
            {filterTypes.map((type) => (
              <motion.button
                key={type}
                onClick={() => setActiveFilter(type)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-all"
                style={{
                  background: activeFilter === type ? "rgba(139,92,246,0.15)" : "transparent",
                  color: activeFilter === type ? "var(--violet-accent)" : "var(--text-secondary)",
                  border: `1px solid ${activeFilter === type ? "rgba(139,92,246,0.3)" : "transparent"}`,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {type !== "Все" && (
                  <Icon
                    name={Object.values(typeColors).find((t) => t.label === type)?.icon || "Tag"}
                    size={13}
                  />
                )}
                {type === "Все" && <Icon name="LayoutGrid" size={13} />}
                {type}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="h-px" style={{ background: "var(--surface-border)" }} />

        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
            Статистика
          </p>
          <div className="space-y-2">
            {[
              { label: "Всего шаблонов", value: labels.length },
              { label: "Этикеток", value: labels.filter((l) => l.type === "label").length },
              { label: "Штрих-кодов", value: labels.filter((l) => l.type === "barcode").length },
              { label: "QR-кодов", value: labels.filter((l) => l.type === "qr").length },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>{stat.label}</span>
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-lg"
                  style={{ background: "rgba(139,92,246,0.1)", color: "var(--violet-accent)" }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-6 flex-wrap"
        >
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Библиотека
            </h1>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>
              {filteredLabels.length} из {labels.length} шаблонов
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                className="pl-8 pr-4 py-2 rounded-xl text-xs outline-none w-52"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--surface-border)",
                  color: "var(--text-primary)",
                  backdropFilter: "blur(12px)",
                }}
                placeholder="Поиск шаблонов..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <motion.button
              onClick={handleSync}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium"
              style={{
                background: syncing ? "rgba(139,92,246,0.2)" : "var(--surface)",
                border: "1px solid var(--surface-border)",
                color: syncing ? "var(--violet-accent)" : "var(--text-secondary)",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              animate={syncing ? { rotate: 360 } : { rotate: 0 }}
              transition={syncing ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
            >
              <Icon name="CloudUpload" size={14} />
              {syncing ? "Синхронизация..." : "Синхронизировать"}
            </motion.button>

            <motion.button
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium"
              style={{
                background: "rgba(139,92,246,0.1)",
                border: "1px solid var(--surface-border)",
                color: "var(--violet-accent)",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Icon name="FileSpreadsheet" size={14} />
              Загрузить CSV
            </motion.button>

            <motion.button
              onClick={() => onNavigate("constructor")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white"
              style={{ background: "var(--violet-accent)" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Icon name="Plus" size={14} />
              Создать
            </motion.button>
          </div>
        </motion.div>

        {filteredLabels.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-4"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(139,92,246,0.1)" }}
            >
              <Icon name="SearchX" size={28} style={{ color: "var(--violet-accent)" }} />
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Ничего не найдено</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredLabels.map((label) => {
                const typeInfo = typeColors[label.type] || typeColors.label
                return (
                  <motion.div
                    key={label.id}
                    variants={itemVariants}
                    exit={{ opacity: 0, scale: 0.9 }}
                    animate={deletingId === label.id ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
                    className="flex flex-col rounded-2xl overflow-hidden group"
                    style={{
                      background: "var(--surface)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid var(--surface-border)",
                      boxShadow: "0 4px 20px var(--glow-color), 0 1px 4px rgba(0,0,0,0.04)",
                    }}
                    whileHover={{
                      y: -4,
                      boxShadow: "0 12px 36px var(--glow-color), 0 4px 12px rgba(0,0,0,0.06)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  >
                    <div className="p-3.5">
                      <LabelPreview preview={label.preview} />
                    </div>

                    <div className="px-3.5 pb-3.5 flex flex-col gap-2.5">
                      <div>
                        <h3 className="text-xs font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>
                          {label.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                          <span
                            className="flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                            style={{ background: typeInfo.bg, color: typeInfo.color }}
                          >
                            <Icon name={typeInfo.icon} size={9} />
                            {typeInfo.label}
                          </span>
                          <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                            {label.size}
                          </span>
                        </div>
                        <p className="text-[10px] mt-1" style={{ color: "var(--text-muted)" }}>
                          {label.date}
                        </p>
                      </div>

                      <div className="flex gap-1.5">
                        <motion.button
                          onClick={() => onNavigate("constructor")}
                          className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-[10px] font-medium"
                          style={{
                            background: "rgba(139,92,246,0.1)",
                            border: "1px solid var(--surface-border)",
                            color: "var(--violet-accent)",
                          }}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                        >
                          <Icon name="Pencil" size={10} />
                          Изменить
                        </motion.button>
                        <motion.button
                          className="w-8 flex items-center justify-center rounded-xl"
                          style={{
                            background: "rgba(139,92,246,0.1)",
                            border: "1px solid var(--surface-border)",
                            color: "var(--violet-accent)",
                          }}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          title="Скачать"
                        >
                          <Icon name="Download" size={12} />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(label.id)}
                          className="w-8 flex items-center justify-center rounded-xl"
                          style={{
                            background: "rgba(239,68,68,0.08)",
                            border: "1px solid rgba(239,68,68,0.15)",
                            color: "#ef4444",
                          }}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          title="Удалить"
                        >
                          <Icon name="Trash2" size={12} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}
