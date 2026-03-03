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
      { text: "Иванов Иван Иванович", y: 36 },
      { text: "г. Москва, ул. Пушкина, 1", y: 56 },
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
]

const typeColors: Record<string, { bg: string; color: string; label: string }> = {
  label: { bg: "rgba(139,92,246,0.1)", color: "#8b5cf6", label: "Этикетка" },
  barcode: { bg: "rgba(124,58,237,0.1)", color: "#7c3aed", label: "Штрих-код" },
  qr: { bg: "rgba(99,102,241,0.1)", color: "#6366f1", label: "QR-код" },
}

function LabelPreview({ preview }: { preview: typeof mockLabels[0]["preview"] }) {
  return (
    <div
      className="relative w-full rounded-xl overflow-hidden bg-white"
      style={{
        height: 110,
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
              <span className="text-lg font-mono tracking-[-2px] text-gray-700" style={{ fontSize: 18 }}>
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
                style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)" }}
              >
                <Icon name="QrCode" size={36} style={{ color: "#8b5cf6" }} />
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
                  color: "#1e0a3c",
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
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 28 } },
}

export function LibraryPage({ onNavigate }: LibraryPageProps) {
  const [labels, setLabels] = useState(mockLabels)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleDelete = (id: number) => {
    setDeletingId(id)
    setTimeout(() => {
      setLabels((prev) => prev.filter((l) => l.id !== id))
      setDeletingId(null)
    }, 300)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#1e0a3c" }}>
            Библиотека
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#9ca3af" }}>
            {labels.length} сохранённых шаблонов
          </p>
        </div>
        <motion.button
          onClick={() => onNavigate("constructor")}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{ background: "var(--violet-accent)" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Icon name="Plus" size={15} />
          Создать новый
        </motion.button>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {labels.map((label) => {
            const typeInfo = typeColors[label.type]
            return (
              <motion.div
                key={label.id}
                variants={itemVariants}
                exit={{ opacity: 0, scale: 0.9 }}
                animate={deletingId === label.id ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
                className="flex flex-col rounded-2xl overflow-hidden group"
                style={{
                  background: "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(139, 92, 246, 0.1)",
                  boxShadow: "0 4px 20px rgba(139, 92, 246, 0.06), 0 1px 4px rgba(0,0,0,0.04)",
                }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 36px rgba(139, 92, 246, 0.15), 0 4px 12px rgba(0,0,0,0.06)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                <div className="p-4">
                  <LabelPreview preview={label.preview} />
                </div>

                <div className="px-4 pb-4 flex flex-col gap-3">
                  <div>
                    <h3 className="text-sm font-semibold leading-tight" style={{ color: "#1e0a3c" }}>
                      {label.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: typeInfo.bg, color: typeInfo.color }}
                      >
                        {typeInfo.label}
                      </span>
                      <span className="text-[10px]" style={{ color: "#9ca3af" }}>
                        {label.size}
                      </span>
                    </div>
                    <p className="text-[10px] mt-1" style={{ color: "#c4b5fd" }}>
                      {label.date}
                    </p>
                  </div>

                  <div className="flex gap-1.5">
                    <motion.button
                      className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded-xl text-[11px] font-medium transition-all"
                      style={{
                        background: "rgba(139,92,246,0.1)",
                        color: "var(--violet-accent)",
                        border: "1px solid rgba(139,92,246,0.15)",
                      }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onNavigate("constructor")}
                    >
                      <Icon name="Pencil" size={11} />
                      Изменить
                    </motion.button>
                    <motion.button
                      className="flex items-center justify-center w-8 h-8 rounded-xl transition-all"
                      style={{
                        background: "rgba(139,92,246,0.08)",
                        color: "#8b5cf6",
                        border: "1px solid rgba(139,92,246,0.12)",
                      }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <Icon name="Download" size={12} />
                    </motion.button>
                    <motion.button
                      className="flex items-center justify-center w-8 h-8 rounded-xl transition-all"
                      style={{
                        background: "rgba(239,68,68,0.07)",
                        color: "#ef4444",
                        border: "1px solid rgba(239,68,68,0.12)",
                      }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleDelete(label.id)}
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

      {labels.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-24 gap-4"
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.15)" }}
          >
            <Icon name="Library" size={36} style={{ color: "#c4b5fd" }} />
          </div>
          <p className="text-sm" style={{ color: "#9ca3af" }}>Библиотека пустая — создайте первый шаблон</p>
          <motion.button
            onClick={() => onNavigate("constructor")}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-white"
            style={{ background: "var(--violet-accent)" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            Создать шаблон
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}
