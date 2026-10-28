import { categories } from '../../data/modes'

export default function WordFilters({ settings, onChange }) {
  return (
    <>
      <label className="field-label" htmlFor="category">
        Category
      </label>
      <select
        id="category"
        className="field mb-5 capitalize"
        value={settings.category}
        onChange={(event) => onChange('category', event.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === 'common' ? 'Everyday English' : category}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="field-label" htmlFor="length">
            Word length <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="length"
            type="number"
            min="1"
            max="30"
            className="field"
            placeholder="Any length"
            value={settings.length}
            onChange={(event) => onChange('length', event.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="starts">
            Starts with <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="starts"
            className="field"
            maxLength="1"
            placeholder="Any letter"
            value={settings.starts}
            onChange={(event) =>
              onChange('starts', event.target.value.replace(/[^a-z]/gi, ''))
            }
          />
        </div>
      </div>
    </>
  )
}
