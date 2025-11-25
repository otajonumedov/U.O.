import { useMemo, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'markdownNote'

const convertMarkdown = (value) => {
  if (!value) {
    return ''
  }

  return value
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*?)\*/gim, '<i>$1</i>')
    .replace(/\n/g, '<br />')
}

function App() {
  const [text, setText] = useState(() => localStorage.getItem(STORAGE_KEY) ?? '')

  const previewMarkup = useMemo(() => convertMarkdown(text), [text])

  const handleInput = (event) => {
    setText(event.target.value)
  }

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, text)
    window.alert('Saqlandi!')
  }

  const handleLoad = () => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setText(saved)
    } else {
      window.alert("Saqlangan yozuv yo'q.")
    }
  }

  const handleClear = () => {
    localStorage.removeItem(STORAGE_KEY)
    setText('')
  }

  return (
    <div className="page">
      <header className="header">
        <div>
          <p className="eyebrow">Markdown ilovasi</p>
          <h1>Chap tomonda yozing, o&apos;ng tomonda natijani ko&apos;ring</h1>
          <p className="subtitle">
            Oddiy va tezkor shablon: yozing, saqlang, istalgan payt yuklab
            oling.
          </p>
        </div>
      </header>

      <section className="workspace">
        <label className="editor-block">
          <span className="block-title">Yozish maydoni</span>
          <textarea
            placeholder="Markdown yozing..."
            value={text}
            onChange={handleInput}
            spellCheck="false"
          />
        </label>

        <div className="preview-block">
          <span className="block-title">Jonli ko&apos;rish</span>
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: previewMarkup || '...' }}
          />
        </div>
      </section>

      <div className="buttons">
        <button type="button" onClick={handleSave}>
          Saqlash
        </button>
        <button type="button" onClick={handleLoad}>
          Yuklash
        </button>
        <button type="button" onClick={handleClear}>
          Tozalash
        </button>
      </div>
    </div>
  )
}

export default App
