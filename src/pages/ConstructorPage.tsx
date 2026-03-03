import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"
import type { ToolType } from "@/App"

interface ConstructorPageProps {
  activeTool: ToolType
}

const SIZES = ["58×40 мм", "100×50 мм", "100×100 мм", "148×210 мм", "Произвольный"]

const sideTools = [
  { id: "text", icon: "Type", label: "Текст" },
  { id: "barcode", icon: "BarChart2", label: "Штрих-код" },
  { id: "qr", icon: "QrCode", label: "QR-код" },
  { id: "line", icon: "Minus", label: "Линия" },
]

const glassCard = {
  background: "rgba(255, 255, 255, 0.75)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(139, 92, 246, 0.12)",
  boxShadow: "0 4px 20px rgba(139, 92, 246, 0.07), 0 1px 4px rgba(0,0,0,0.04)",
}

const canvasElements = [
  { id: 1, type: "text", x: 30, y: 18, label: "Наименование товара", fontSize: 14, bold: true },
  { id: 2, type: "barcode", x: 30, y: 50, label: "▌▌█▌▌▌█▌█▌▌▌█▌▌" },
  { id: 3, type: "text", x: 30, y: 82, label: "4607061250021", fontSize: 11 },
]

export function ConstructorPage({ activeTool }: ConstructorPageProps) {
  const [selectedSize, setSelectedSize] = useState(SIZES[0])
  const [activeToolId, setActiveToolId] = useState<string | null>(
    activeTool === "barcode" ? "barcode" : activeTool === "qr" ? "qr" : "text"
  )
  const [selectedElement, setSelectedElement] = useState<number | null>(1)
  const [fontFamily, setFontFamily] = useState("Inter")
  const [fontSize, setFontSize] = useState("14")
  const [fontColor, setFontColor] = useState("#1e0a3c")

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div
        className="flex items-center gap-3 px-6 py-3 border-b"
        style={{ ...glassCard, borderRadius: 0, border: "none", borderBottom: "1px solid rgba(139,92,246,0.1)" }}
      >
        <span className="text-sm font-medium" style={{ color: "#6b7280" }}>Размер этикетки:</span>
        <div className="flex gap-2">
          {SIZES.map((size) => (
            <motion.button
              key={size}
              onClick={() => setSelectedSize(size)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
              style={{
                background: selectedSize === size ? "var(--violet-accent)" : "rgba(139, 92, 246, 0.08)",
                color: selectedSize === size ? "#fff" : "#8b5cf6",
                border: `1px solid ${selectedSize === size ? "var(--violet-accent)" : "rgba(139,92,246,0.2)"}`,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {size}
            </motion.button>
          ))}
        </div>
        <motion.button
          className="ml-auto px-5 py-1.5 rounded-xl text-sm font-medium text-white"
          style={{ background: "var(--violet-accent)" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Применить
        </motion.button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div
          className="flex flex-col gap-2 p-3 w-[72px]"
          style={{ ...glassCard, borderRadius: 0, borderTop: "none", borderBottom: "none", borderLeft: "none" }}
        >
          {sideTools.map((tool) => (
            <motion.button
              key={tool.id}
              onClick={() => setActiveToolId(tool.id)}
              className="flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all"
              style={{
                background: activeToolId === tool.id ? "rgba(139, 92, 246, 0.12)" : "transparent",
                border: `1px solid ${activeToolId === tool.id ? "rgba(139,92,246,0.3)" : "transparent"}`,
                color: activeToolId === tool.id ? "var(--violet-accent)" : "#9ca3af",
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              <Icon name={tool.icon} size={20} />
              <span className="text-[9px] font-medium">{tool.label}</span>
            </motion.button>
          ))}
        </div>

        <div
          className="flex-1 flex items-center justify-center p-8"
          style={{ background: "rgba(248, 244, 255, 0.6)" }}
        >
          <motion.div
            className="relative bg-white rounded-2xl overflow-hidden"
            style={{
              width: 420,
              height: 240,
              border: "2px dashed rgba(139, 92, 246, 0.3)",
              boxShadow: "0 8px 40px rgba(139, 92, 246, 0.12), 0 2px 8px rgba(0,0,0,0.06)",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.06) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {canvasElements.map((el) => (
              <motion.div
                key={el.id}
                className="absolute cursor-pointer"
                style={{ left: `${el.x}px`, top: `${el.y}px` }}
                onClick={() => setSelectedElement(el.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div
                  className="px-2 py-1 rounded"
                  style={{
                    border: selectedElement === el.id
                      ? "1.5px solid var(--violet-accent)"
                      : "1px solid transparent",
                    background: selectedElement === el.id ? "rgba(139,92,246,0.06)" : "transparent",
                  }}
                >
                  {el.type === "text" && (
                    <span
                      className="select-none"
                      style={{
                        fontSize: el.fontSize,
                        fontWeight: el.bold ? 700 : 400,
                        color: "#1e0a3c",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {el.label}
                    </span>
                  )}
                  {el.type === "barcode" && (
                    <div className="flex flex-col items-start">
                      <span className="text-2xl font-mono tracking-[-2px] text-gray-800">{el.label}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            <div
              className="absolute bottom-2 right-3 text-[9px] font-medium"
              style={{ color: "rgba(139,92,246,0.4)" }}
            >
              {selectedSize}
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {selectedElement && (
            <motion.div
              className="w-64 p-4 flex flex-col gap-4"
              style={{ ...glassCard, borderRadius: 0, borderTop: "none", borderBottom: "none", borderRight: "none" }}
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold" style={{ color: "#1e0a3c" }}>Свойства</span>
                <button onClick={() => setSelectedElement(null)} className="text-gray-400 hover:text-gray-600">
                  <Icon name="X" size={14} />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#6b7280" }}>Шрифт</label>
                  <select
                    className="w-full px-3 py-2 rounded-xl text-sm border outline-none"
                    style={{
                      background: "rgba(248,244,255,0.8)",
                      border: "1px solid rgba(139,92,246,0.2)",
                      color: "#1e0a3c",
                    }}
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                  >
                    <option>Inter</option>
                    <option>Arial</option>
                    <option>Roboto</option>
                    <option>Courier New</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#6b7280" }}>Размер</label>
                  <div className="flex gap-2">
                    {["10", "12", "14", "16", "20", "24"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setFontSize(s)}
                        className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{
                          background: fontSize === s ? "var(--violet-accent)" : "rgba(139,92,246,0.08)",
                          color: fontSize === s ? "#fff" : "#8b5cf6",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#6b7280" }}>Цвет</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="color"
                      value={fontColor}
                      onChange={(e) => setFontColor(e.target.value)}
                      className="w-9 h-9 rounded-lg cursor-pointer border-0"
                      style={{ border: "1px solid rgba(139,92,246,0.2)" }}
                    />
                    <span className="text-xs font-mono" style={{ color: "#6b7280" }}>{fontColor}</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "#6b7280" }}>Начертание</label>
                  <div className="flex gap-2">
                    {[
                      { icon: "Bold", label: "Bold" },
                      { icon: "Italic", label: "Italic" },
                      { icon: "Underline", label: "Underline" },
                    ].map((style) => (
                      <button
                        key={style.label}
                        className="flex-1 py-2 rounded-xl flex items-center justify-center transition-all"
                        style={{
                          background: "rgba(139,92,246,0.08)",
                          border: "1px solid rgba(139,92,246,0.15)",
                          color: "#8b5cf6",
                        }}
                      >
                        <Icon name={style.icon} size={14} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="flex items-center gap-3 px-6 py-3"
        style={{ ...glassCard, borderRadius: 0, border: "none", borderTop: "1px solid rgba(139,92,246,0.1)" }}
      >
        <motion.button
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white"
          style={{ background: "var(--violet-accent)" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Icon name="Save" size={15} />
          Сохранить
        </motion.button>

        <div className="flex gap-2">
          {["PNG", "PDF", "ZPL"].map((fmt) => (
            <motion.button
              key={fmt}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium"
              style={{
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.2)",
                color: "var(--violet-accent)",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Icon name="Download" size={14} />
              {fmt}
            </motion.button>
          ))}
        </div>

        <motion.button
          className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#ef4444",
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Icon name="Trash2" size={14} />
          Очистить
        </motion.button>
      </div>
    </div>
  )
}
