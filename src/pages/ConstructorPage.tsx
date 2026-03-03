import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Icon from "@/components/ui/icon"
import type { ToolType } from "@/App"

interface ConstructorPageProps {
  activeTool: ToolType
}

const PRESET_SIZES = [
  { label: "60×40", w: 60, h: 40 },
  { label: "80×50", w: 80, h: 50 },
  { label: "100×70", w: 100, h: 70 },
  { label: "148×210", w: 148, h: 210 },
]

const sideTools = [
  { id: "text", icon: "Type", label: "Текст" },
  { id: "barcode", icon: "BarChart2", label: "Штрих-код" },
  { id: "qr", icon: "QrCode", label: "QR-код" },
  { id: "datamatrix", icon: "Grid3x3", label: "Data Matrix" },
  { id: "line", icon: "Minus", label: "Линия/фигура" },
  { id: "csv", icon: "FileSpreadsheet", label: "CSV" },
  { id: "templates", icon: "Wand2", label: "Шаблоны" },
]

const versions = [
  { id: 1, label: "Версия от 03.03 14:22" },
  { id: 2, label: "Версия от 02.03 10:15" },
  { id: 3, label: "Версия от 01.03 18:40" },
]

const mockProducts = [
  { id: 1, sku: "ART-001", name: "Молоко 3.2% 1л", price: "89.90 ₽", barcode: "4607061250021" },
  { id: 2, sku: "ART-002", name: "Кефир 2.5% 500мл", price: "54.50 ₽", barcode: "4607061250038" },
  { id: 3, sku: "ART-003", name: "Йогурт клубника 125г", price: "39.90 ₽", barcode: "4607061250045" },
  { id: 4, sku: "ART-004", name: "Сметана 20% 400г", price: "67.00 ₽", barcode: "4607061250052" },
  { id: 5, sku: "ART-005", name: "Творог 5% 200г", price: "42.90 ₽", barcode: "4607061250069" },
]

const canvasElements = [
  { id: 1, type: "text", x: 24, y: 20, label: "Наименование товара", fontSize: 13, bold: true },
  { id: 2, type: "barcode", x: 24, y: 56, label: "▌▌█▌▌▌█▌█▌▌▌█▌▌▌█" },
  { id: 3, type: "text", x: 24, y: 110, label: "4607061250021", fontSize: 10 },
  { id: 4, type: "qr", x: 300, y: 30, label: "QR" },
]

function validateEAN13(code: string): boolean {
  if (!/^\d{13}$/.test(code)) return false
  const digits = code.split("").map(Number)
  const sum = digits.slice(0, 12).reduce((acc, d, i) => acc + d * (i % 2 === 0 ? 1 : 3), 0)
  return (10 - (sum % 10)) % 10 === digits[12]
}

const surface = {
  background: "var(--surface)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid var(--surface-border)",
}

export function ConstructorPage({ activeTool }: ConstructorPageProps) {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_SIZES[0])
  const [customW, setCustomW] = useState("")
  const [customH, setCustomH] = useState("")
  const [activeToolId, setActiveToolId] = useState<string>(
    activeTool === "barcode" ? "barcode" : activeTool === "qr" ? "qr" : "text"
  )
  const [selectedElement, setSelectedElement] = useState<number | null>(1)
  const [fontFamily, setFontFamily] = useState("Inter")
  const [fontSize, setFontSize] = useState("13")
  const [fontColor, setFontColor] = useState("#1e0a3c")
  const [barcodeType, setBarcodeType] = useState("EAN-13")
  const [barcodeData, setBarcodeData] = useState("4607061250021")
  const [qrData, setQrData] = useState("https://example.com")
  const [qrCorrection, setQrCorrection] = useState("M")
  const [printerLang, setPrinterLang] = useState("ZPL")
  const [showVersions, setShowVersions] = useState(false)
  const [showDownload, setShowDownload] = useState(false)
  const [showProductBase, setShowProductBase] = useState(false)
  const [productSearch, setProductSearch] = useState("")
  const [saved, setSaved] = useState(false)

  const ean13Valid = barcodeType === "EAN-13" ? validateEAN13(barcodeData) : null

  const filteredProducts = mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase())
  )

  const handleSelectProduct = (product: typeof mockProducts[0]) => {
    setBarcodeData(product.barcode)
    setShowProductBase(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const selectedEl = canvasElements.find((e) => e.id === selectedElement)

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <div
        className="flex items-center gap-3 px-5 py-2.5 flex-wrap"
        style={{
          ...surface,
          background: "var(--panel-bg)",
          borderRadius: 0,
          border: "none",
          borderBottom: "1px solid var(--surface-border)",
        }}
      >
        <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>Размер этикетки:</span>
        <div className="flex gap-1.5 flex-wrap">
          {PRESET_SIZES.map((size) => (
            <motion.button
              key={size.label}
              onClick={() => setSelectedPreset(size)}
              className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
              style={{
                background: selectedPreset.label === size.label ? "var(--violet-accent)" : "rgba(139, 92, 246, 0.1)",
                color: selectedPreset.label === size.label ? "#fff" : "var(--violet-accent)",
                border: `1px solid ${selectedPreset.label === size.label ? "var(--violet-accent)" : "var(--surface-border)"}`,
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {size.label} мм
            </motion.button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <input
            className="w-14 px-2 py-1.5 rounded-xl text-xs text-center border outline-none"
            style={{ background: "var(--input-bg)", border: "1px solid var(--surface-border)", color: "var(--text-primary)" }}
            placeholder="Ш мм"
            value={customW}
            onChange={(e) => setCustomW(e.target.value)}
          />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>×</span>
          <input
            className="w-14 px-2 py-1.5 rounded-xl text-xs text-center border outline-none"
            style={{ background: "var(--input-bg)", border: "1px solid var(--surface-border)", color: "var(--text-primary)" }}
            placeholder="В мм"
            value={customH}
            onChange={(e) => setCustomH(e.target.value)}
          />
        </div>
        <motion.button
          className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white"
          style={{ background: "var(--violet-accent)" }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Применить
        </motion.button>
        <motion.button
          onClick={() => setShowProductBase(!showProductBase)}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium"
          style={{
            background: showProductBase ? "rgba(139,92,246,0.15)" : "var(--input-bg)",
            border: `1px solid ${showProductBase ? "var(--violet-accent)" : "var(--surface-border)"}`,
            color: showProductBase ? "var(--violet-accent)" : "var(--text-secondary)",
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Icon name="ShoppingBag" size={13} />
          База товаров
        </motion.button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <div
          className="flex flex-col gap-1.5 py-3 px-2 w-[68px]"
          style={{
            ...surface,
            background: "var(--panel-bg)",
            borderRadius: 0,
            borderTop: "none",
            borderBottom: "none",
            borderLeft: "none",
          }}
        >
          {sideTools.map((tool) => (
            <motion.button
              key={tool.id}
              onClick={() => setActiveToolId(tool.id)}
              className="flex flex-col items-center gap-1 p-2 rounded-xl transition-all"
              style={{
                background: activeToolId === tool.id ? "rgba(139, 92, 246, 0.15)" : "transparent",
                border: `1px solid ${activeToolId === tool.id ? "rgba(139,92,246,0.4)" : "transparent"}`,
                color: activeToolId === tool.id ? "var(--violet-accent)" : "var(--text-muted)",
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              title={tool.label}
            >
              <Icon name={tool.icon} size={19} />
              <span className="text-[8.5px] font-medium text-center leading-tight">{tool.label}</span>
            </motion.button>
          ))}
        </div>

        <div
          className="flex-1 flex items-center justify-center p-6 relative overflow-auto"
          style={{ background: "var(--violet-bg)" }}
        >
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            style={{
              width: 440,
              height: 260,
              background: "var(--canvas-bg)",
              border: "2px dashed rgba(139, 92, 246, 0.3)",
              boxShadow: "0 8px 48px var(--glow-color), 0 2px 8px rgba(0,0,0,0.08)",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(139,92,246,0.05) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {canvasElements.map((el) => (
              <motion.div
                key={el.id}
                className="absolute cursor-pointer"
                style={{ left: el.x, top: el.y }}
                onClick={() => setSelectedElement(el.id)}
                whileHover={{ scale: 1.01 }}
              >
                <div
                  className="px-2 py-1 rounded"
                  style={{
                    border: selectedElement === el.id
                      ? "1.5px solid var(--violet-accent)"
                      : "1px dashed transparent",
                    background: selectedElement === el.id ? "rgba(139,92,246,0.06)" : "transparent",
                  }}
                >
                  {el.type === "text" && (
                    <span
                      className="select-none"
                      style={{
                        fontSize: el.fontSize,
                        fontWeight: el.bold ? 700 : 400,
                        color: "var(--text-primary)",
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {el.label}
                    </span>
                  )}
                  {el.type === "barcode" && (
                    <span className="text-2xl font-mono leading-none" style={{ letterSpacing: "-2px", color: "var(--text-primary)" }}>
                      {el.label}
                    </span>
                  )}
                  {el.type === "qr" && (
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center"
                      style={{ background: "rgba(139,92,246,0.08)", border: "1px solid var(--surface-border)" }}
                    >
                      <Icon name="QrCode" size={36} style={{ color: "var(--violet-accent)" }} />
                    </div>
                  )}

                  {selectedElement === el.id && (
                    <>
                      {[[-4,-4],["50%",-4],["calc(100%+4px)",-4],[-4,"50%"],["calc(100%+4px)","50%"],[-4,"calc(100%+4px)"],["50%","calc(100%+4px)"],["calc(100%+4px)","calc(100%+4px)"]].map(([l,t], i) => (
                        <div
                          key={i}
                          className="absolute w-2 h-2 rounded-sm"
                          style={{
                            left: l as string | number,
                            top: t as string | number,
                            transform: "translate(-50%, -50%)",
                            background: "var(--violet-accent)",
                            border: "1.5px solid white",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            ))}

            <div
              className="absolute bottom-2 right-3 text-[9px] font-medium"
              style={{ color: "rgba(139,92,246,0.4)" }}
            >
              {customW && customH ? `${customW}×${customH} мм` : `${selectedPreset.w}×${selectedPreset.h} мм`}
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {selectedElement && (
            <motion.div
              className="w-72 flex flex-col overflow-y-auto"
              style={{
                ...surface,
                background: "var(--panel-bg)",
                borderRadius: 0,
                borderTop: "none",
                borderBottom: "none",
                borderRight: "none",
              }}
              initial={{ x: 60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            >
              <div className="p-4 flex flex-col gap-4 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Свойства</span>
                  <button onClick={() => setSelectedElement(null)} style={{ color: "var(--text-muted)" }}>
                    <Icon name="X" size={14} />
                  </button>
                </div>

                {selectedEl?.type === "text" && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Текст</p>
                    <div>
                      <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Шрифт</label>
                      <select
                        className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                        style={{ background: "var(--input-bg)", border: "1px solid var(--surface-border)", color: "var(--text-primary)" }}
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                      >
                        <option>Inter</option>
                        <option>Arial</option>
                        <option>Roboto</option>
                        <option>Courier New</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Размер</label>
                        <input
                          type="number"
                          className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                          style={{ background: "var(--input-bg)", border: "1px solid var(--surface-border)", color: "var(--text-primary)" }}
                          value={fontSize}
                          onChange={(e) => setFontSize(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Цвет</label>
                        <div className="relative">
                          <input
                            type="color"
                            className="w-full h-9 rounded-xl cursor-pointer outline-none"
                            style={{ background: "var(--input-bg)", border: "1px solid var(--surface-border)", padding: "2px 4px" }}
                            value={fontColor}
                            onChange={(e) => setFontColor(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {["B","I","U"].map((f) => (
                        <button key={f} className="w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center"
                          style={{ background: "rgba(139,92,246,0.1)", border: "1px solid var(--surface-border)", color: "var(--violet-accent)" }}>
                          {f}
                        </button>
                      ))}
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(139,92,246,0.1)", border: "1px solid var(--surface-border)", color: "var(--violet-accent)" }}>
                        <Icon name="AlignLeft" size={13} />
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(139,92,246,0.1)", border: "1px solid var(--surface-border)", color: "var(--violet-accent)" }}>
                        <Icon name="AlignCenter" size={13} />
                      </button>
                    </div>
                  </div>
                )}

                {selectedEl?.type === "barcode" && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Штрих-код</p>
                    <div>
                      <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Тип</label>
                      <select
                        className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                        style={{ background: "var(--input-bg)", border: "1px solid var(--surface-border)", color: "var(--text-primary)" }}
                        value={barcodeType}
                        onChange={(e) => setBarcodeType(e.target.value)}
                      >
                        <option>EAN-13</option>
                        <option>Code128</option>
                        <option>Data Matrix</option>
                        <option>QR</option>
                        <option>UPC-A</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Данные</label>
                      <div className="relative">
                        <input
                          className="w-full px-3 py-2 rounded-xl text-xs outline-none pr-8"
                          style={{ background: "var(--input-bg)", border: `1px solid ${barcodeType === "EAN-13" ? (ean13Valid ? "#22c55e" : "#f87171") : "var(--surface-border)"}`, color: "var(--text-primary)" }}
                          value={barcodeData}
                          onChange={(e) => setBarcodeData(e.target.value)}
                          placeholder="Введите код..."
                        />
                        {barcodeType === "EAN-13" && (
                          <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                            {ean13Valid
                              ? <Icon name="CheckCircle" size={14} style={{ color: "#22c55e" }} />
                              : <Icon name="XCircle" size={14} style={{ color: "#f87171" }} />}
                          </div>
                        )}
                      </div>
                      {barcodeType === "EAN-13" && (
                        <p className="text-[10px] mt-1" style={{ color: ean13Valid ? "#22c55e" : "#f87171" }}>
                          {ean13Valid ? "Контрольная сумма верна" : "Неверная контрольная сумма"}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Высота</label>
                        <input className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                          style={{ background: "var(--input-bg)", border: "1px solid var(--surface-border)", color: "var(--text-primary)" }}
                          defaultValue="50" />
                      </div>
                      <div>
                        <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Ширина</label>
                        <input className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                          style={{ background: "var(--input-bg)", border: "1px solid var(--surface-border)", color: "var(--text-primary)" }}
                          defaultValue="2" />
                      </div>
                    </div>
                  </div>
                )}

                {selectedEl?.type === "qr" && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>QR-код</p>
                    <div>
                      <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Данные</label>
                      <textarea
                        className="w-full px-3 py-2 rounded-xl text-xs outline-none resize-none"
                        style={{ background: "var(--input-bg)", border: "1px solid var(--surface-border)", color: "var(--text-primary)" }}
                        rows={3}
                        value={qrData}
                        onChange={(e) => setQrData(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Коррекция ошибок</label>
                      <div className="flex gap-1.5">
                        {["L","M","Q","H"].map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setQrCorrection(lvl)}
                            className="flex-1 py-1.5 rounded-xl text-xs font-medium"
                            style={{
                              background: qrCorrection === lvl ? "var(--violet-accent)" : "var(--input-bg)",
                              color: qrCorrection === lvl ? "#fff" : "var(--text-secondary)",
                              border: "1px solid var(--surface-border)",
                            }}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-auto space-y-3">
                  <div className="h-px" style={{ background: "var(--surface-border)" }} />
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Печать</p>
                  <div>
                    <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-secondary)" }}>Язык принтера</label>
                    <select
                      className="w-full px-3 py-2 rounded-xl text-xs outline-none"
                      style={{ background: "var(--input-bg)", border: "1px solid var(--surface-border)", color: "var(--text-primary)" }}
                      value={printerLang}
                      onChange={(e) => setPrinterLang(e.target.value)}
                    >
                      <option>ZPL</option>
                      <option>ESC/POS</option>
                      <option>DPL</option>
                    </select>
                  </div>
                  <motion.button
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium"
                    style={{
                      background: "rgba(139,92,246,0.1)",
                      border: "1px solid var(--surface-border)",
                      color: "var(--violet-accent)",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon name="FileCode2" size={13} />
                    Экспорт в SVG
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showProductBase && (
            <motion.div
              className="absolute right-0 top-0 bottom-0 w-72 flex flex-col z-20"
              style={{
                background: "var(--panel-bg)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderLeft: "1px solid var(--surface-border)",
                boxShadow: "-4px 0 24px var(--glow-color)",
              }}
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: 280 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            >
              <div className="flex items-center justify-between p-4 pb-3" style={{ borderBottom: "1px solid var(--surface-border)" }}>
                <div className="flex items-center gap-2">
                  <Icon name="ShoppingBag" size={15} style={{ color: "var(--violet-accent)" }} />
                  <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>База товаров</span>
                </div>
                <button onClick={() => setShowProductBase(false)} style={{ color: "var(--text-muted)" }}>
                  <Icon name="X" size={14} />
                </button>
              </div>

              <div className="p-3">
                <div className="relative">
                  <Icon name="Search" size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
                  <input
                    className="w-full pl-8 pr-3 py-2 rounded-xl text-xs outline-none"
                    style={{ background: "var(--input-bg)", border: "1px solid var(--surface-border)", color: "var(--text-primary)" }}
                    placeholder="Поиск по артикулу или названию..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1.5">
                {filteredProducts.map((product) => (
                  <motion.button
                    key={product.id}
                    onClick={() => handleSelectProduct(product)}
                    className="w-full text-left p-3 rounded-xl"
                    style={{
                      background: "var(--input-bg)",
                      border: "1px solid var(--surface-border)",
                    }}
                    whileHover={{ scale: 1.02, background: "rgba(139,92,246,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md"
                        style={{ background: "rgba(139,92,246,0.15)", color: "var(--violet-accent)" }}>
                        {product.sku}
                      </span>
                      <span className="text-[10px] font-semibold" style={{ color: "var(--violet-accent)" }}>
                        {product.price}
                      </span>
                    </div>
                    <div className="text-xs font-medium mb-1" style={{ color: "var(--text-primary)" }}>
                      {product.name}
                    </div>
                    <div className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                      {product.barcode}
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="p-3" style={{ borderTop: "1px solid var(--surface-border)" }}>
                <motion.button
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium"
                  style={{ background: "var(--violet-accent)", color: "#fff" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon name="Plus" size={13} />
                  Добавить товар
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="flex items-center gap-2 px-5 py-2.5 flex-wrap"
        style={{
          background: "var(--panel-bg)",
          borderTop: "1px solid var(--surface-border)",
        }}
      >
        <motion.button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold"
          style={{
            background: saved ? "#22c55e" : "var(--violet-accent)",
            color: "#fff",
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Icon name={saved ? "Check" : "BookmarkPlus"} size={13} />
          {saved ? "Сохранено!" : "Сохранить в библиотеку"}
        </motion.button>

        <div className="relative">
          <motion.button
            onClick={() => setShowDownload(!showDownload)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium"
            style={{
              background: "rgba(139,92,246,0.1)",
              border: "1px solid var(--surface-border)",
              color: "var(--violet-accent)",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Icon name="Download" size={13} />
            Скачать
            <Icon name="ChevronDown" size={11} />
          </motion.button>
          <AnimatePresence>
            {showDownload && (
              <motion.div
                className="absolute bottom-full mb-2 left-0 rounded-2xl overflow-hidden py-1.5 z-50 min-w-[120px]"
                style={{
                  background: "var(--panel-bg)",
                  border: "1px solid var(--surface-border)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px var(--glow-color)",
                }}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
              >
                {["PNG", "PDF", "ZPL", "ESC/POS", "DPL", "SVG"].map((fmt) => (
                  <button
                    key={fmt}
                    className="w-full text-left px-4 py-2 text-xs font-medium transition-colors hover:bg-violet-500/10"
                    style={{ color: "var(--text-primary)" }}
                    onClick={() => setShowDownload(false)}
                  >
                    {fmt}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium"
          style={{
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#ef4444",
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <Icon name="Trash2" size={13} />
          Очистить
        </motion.button>

        <div className="relative ml-auto">
          <motion.button
            onClick={() => setShowVersions(!showVersions)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium"
            style={{
              background: "rgba(139,92,246,0.08)",
              border: "1px solid var(--surface-border)",
              color: "var(--text-secondary)",
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Icon name="Clock" size={13} />
            Версии
            <Icon name="ChevronDown" size={11} />
          </motion.button>
          <AnimatePresence>
            {showVersions && (
              <motion.div
                className="absolute bottom-full mb-2 right-0 rounded-2xl overflow-hidden py-1.5 z-50 min-w-[200px]"
                style={{
                  background: "var(--panel-bg)",
                  border: "1px solid var(--surface-border)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  boxShadow: "0 8px 32px var(--glow-color)",
                }}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
              >
                {versions.map((v) => (
                  <button
                    key={v.id}
                    className="w-full text-left px-4 py-2.5 text-xs font-medium transition-colors hover:bg-violet-500/10 flex items-center gap-2"
                    style={{ color: "var(--text-primary)" }}
                    onClick={() => setShowVersions(false)}
                  >
                    <Icon name="Clock" size={11} style={{ color: "var(--violet-accent)" }} />
                    {v.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
