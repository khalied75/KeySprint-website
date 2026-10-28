export function getHistory() {
  try {
    const data = JSON.parse(localStorage.getItem('keysprint-history') || '[]')
    return Array.isArray(data) ? data.filter(item => item && Number.isFinite(item.wpm) && Number.isFinite(item.accuracy) && typeof item.date === 'string') : []
  } catch { return [] }
}
export function saveResult(result) {
  try { localStorage.setItem('keysprint-history', JSON.stringify([{ ...result, date: new Date().toISOString(), id: Date.now() }, ...getHistory()].slice(0, 100))) } catch { /* Training works when storage is disabled. */ }
}
