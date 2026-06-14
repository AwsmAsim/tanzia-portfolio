import { useState, useEffect } from 'react'
import './admin.css'

const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN as string
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID as string
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string

const TABLE_IDS: Record<string, string> = {
  Profile:      'tblW1LKngW54aqjLq',
  Stats:        'tblBuD0xSsDDcQCR7',
  CaseStudies:  'tbltl0brftgkG7zDV',
  Experience:   'tblLJPukK9BNG1Eic',
  Brands:       'tblffBGrb1W3doCgG',
  Services:     'tblZTebZMRr9LQ4Er',
  Process:      'tbliux6LE187Eq1L9',
  Packages:     'tblkAvlgwMbQL5QbG',
  Testimonials: 'tbllJxt9H3Kl7baC5',
  AboutChips:   'tblhnPej33X0tvVyB',
}

type AirtableRecord = { id: string; fields: Record<string, unknown> }

async function fetchRecords(tableId: string, sortField = 'Order'): Promise<AirtableRecord[]> {
  const url = sortField
    ? `https://api.airtable.com/v0/${BASE_ID}/${tableId}?sort[0][field]=${encodeURIComponent(sortField)}&sort[0][direction]=asc`
    : `https://api.airtable.com/v0/${BASE_ID}/${tableId}`
  const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` } })
  if (!res.ok) return []
  const json = await res.json()
  return json.records ?? []
}

async function patchRecord(tableId: string, recordId: string, fields: Record<string, unknown>) {
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${tableId}/${recordId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields }),
  })
  if (!res.ok) throw new Error(`Patch failed: ${res.status}`)
}

async function deleteRecord(tableId: string, recordId: string) {
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${tableId}/${recordId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`)
}

async function createRecord(tableId: string, fields: Record<string, unknown>) {
  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${tableId}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ records: [{ fields }] }),
  })
  if (!res.ok) throw new Error(`Create failed: ${res.status}`)
  const json = await res.json()
  return json.records[0] as AirtableRecord
}

// ── Password Gate ─────────────────────────────────────────────────────────────

function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', '1')
      onUnlock()
    } else {
      setError('Wrong password')
    }
  }

  return (
    <div className="admin-gate">
      <div className="admin-gate__card">
        <div className="admin-gate__logo">⚙</div>
        <h1>The Socials Glow</h1>
        <p>Admin Panel</p>
        <form onSubmit={submit}>
          <input type="password" placeholder="Password" value={pw}
            onChange={e => setPw(e.target.value)} autoFocus />
          {error && <p className="admin-gate__error">{error}</p>}
          <button type="submit">Enter</button>
        </form>
      </div>
    </div>
  )
}

// ── Field types ───────────────────────────────────────────────────────────────

type FieldConfig = {
  key: string
  label: string
  multiline?: boolean
  number?: boolean
}

// ── Profile Section (key-value pairs) ────────────────────────────────────────

function ProfileSection() {
  const [records, setRecords] = useState<AirtableRecord[]>([])
  const [values, setValues] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Record<string, 'idle' | 'saving' | 'saved' | 'error'>>({})

  useEffect(() => {
    fetchRecords(TABLE_IDS.Profile, '').then(recs => {
      const filtered = recs.filter(r => r.fields.Key)
      setRecords(filtered)
      const v: Record<string, string> = {}
      filtered.forEach(r => { v[r.id] = String(r.fields.Value ?? '') })
      setValues(v)
    })
  }, [])

  const save = async (rec: AirtableRecord) => {
    setStatus(s => ({ ...s, [rec.id]: 'saving' }))
    try {
      await patchRecord(TABLE_IDS.Profile, rec.id, { Value: values[rec.id] })
      setStatus(s => ({ ...s, [rec.id]: 'saved' }))
      setTimeout(() => setStatus(s => ({ ...s, [rec.id]: 'idle' })), 2000)
    } catch {
      setStatus(s => ({ ...s, [rec.id]: 'error' }))
    }
  }

  const multilineKeys = ['heroSub', 'aboutLead', 'aboutBody1', 'aboutBody2', 'aboutBody3']

  return (
    <section className="admin-section">
      <h2>Profile & About Text</h2>
      {records.map(rec => {
        const key = String(rec.fields.Key)
        const st = status[rec.id] ?? 'idle'
        return (
          <div key={rec.id} className="admin-field-card">
            <label>{key.toUpperCase()}</label>
            {multilineKeys.includes(key) ? (
              <textarea value={values[rec.id] ?? ''} rows={3}
                onChange={e => setValues(s => ({ ...s, [rec.id]: e.target.value }))} />
            ) : (
              <input type="text" value={values[rec.id] ?? ''}
                onChange={e => setValues(s => ({ ...s, [rec.id]: e.target.value }))} />
            )}
            <button className={`btn-save ${st === 'saved' ? 'saved' : st === 'error' ? 'error' : ''}`}
              onClick={() => save(rec)} disabled={st === 'saving'}>
              {st === 'saving' ? 'Saving…' : st === 'saved' ? '✓ Saved' : st === 'error' ? '✗ Error' : 'Save'}
            </button>
          </div>
        )
      })}
    </section>
  )
}

// ── Generic List Section with reorder / delete / add ─────────────────────────

function ListSection({
  title,
  tableKey,
  fields,
  defaultNewRecord,
}: {
  title: string
  tableKey: string
  fields: FieldConfig[]
  defaultNewRecord: Record<string, unknown>
}) {
  const tableId = TABLE_IDS[tableKey]
  const [records, setRecords] = useState<AirtableRecord[]>([])
  const [values, setValues] = useState<Record<string, Record<string, string>>>({})
  const [status, setStatus] = useState<Record<string, 'idle' | 'saving' | 'saved' | 'error'>>({})
  const [deleting, setDeleting] = useState<Record<string, boolean>>({})
  const [adding, setAdding] = useState(false)

  const load = () =>
    fetchRecords(tableId).then(recs => {
      setRecords(recs)
      const v: Record<string, Record<string, string>> = {}
      recs.forEach(r => {
        v[r.id] = {}
        fields.forEach(f => { v[r.id][f.key] = String(r.fields[f.key] ?? '') })
      })
      setValues(v)
    })

  useEffect(() => { load() }, [tableKey])

  const save = async (recId: string) => {
    setStatus(s => ({ ...s, [recId]: 'saving' }))
    try {
      const patch: Record<string, unknown> = {}
      fields.forEach(f => {
        patch[f.key] = f.number ? Number(values[recId][f.key]) : values[recId][f.key]
      })
      await patchRecord(tableId, recId, patch)
      setStatus(s => ({ ...s, [recId]: 'saved' }))
      setTimeout(() => setStatus(s => ({ ...s, [recId]: 'idle' })), 2000)
    } catch {
      setStatus(s => ({ ...s, [recId]: 'error' }))
    }
  }

  const remove = async (recId: string) => {
    if (!confirm('Delete this record?')) return
    setDeleting(d => ({ ...d, [recId]: true }))
    try {
      await deleteRecord(tableId, recId)
      setRecords(r => r.filter(x => x.id !== recId))
    } catch {
      setDeleting(d => ({ ...d, [recId]: false }))
    }
  }

  const move = async (idx: number, dir: -1 | 1) => {
    const newRecs = [...records]
    const swapIdx = idx + dir
    if (swapIdx < 0 || swapIdx >= newRecs.length) return
    ;[newRecs[idx], newRecs[swapIdx]] = [newRecs[swapIdx], newRecs[idx]]
    setRecords(newRecs)
    // Update Order fields in Airtable
    await Promise.all([
      patchRecord(tableId, newRecs[idx].id, { Order: idx + 1 }),
      patchRecord(tableId, newRecs[swapIdx].id, { Order: swapIdx + 1 }),
    ])
  }

  const addNew = async () => {
    setAdding(true)
    try {
      const newOrder = records.length + 1
      const rec = await createRecord(tableId, { ...defaultNewRecord, Order: newOrder })
      setRecords(r => [...r, rec])
      setValues(v => ({
        ...v,
        [rec.id]: Object.fromEntries(fields.map(f => [f.key, String(rec.fields[f.key] ?? '')])),
      }))
    } finally {
      setAdding(false)
    }
  }

  return (
    <section className="admin-section">
      <h2>{title}</h2>
      {records.map((rec, i) => {
        const st = status[rec.id] ?? 'idle'
        return (
          <div key={rec.id} className="admin-record">
            <div className="admin-record__header">
              <span className="admin-record__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="admin-record__title">
                {String(rec.fields[fields[0].key] ?? '—')}
              </span>
              <div className="admin-record__actions">
                <button className="btn-icon" title="Move up" onClick={() => move(i, -1)} disabled={i === 0}>↑</button>
                <button className="btn-icon" title="Move down" onClick={() => move(i, 1)} disabled={i === records.length - 1}>↓</button>
                <button className="btn-icon btn-icon--danger" title="Delete"
                  onClick={() => remove(rec.id)} disabled={deleting[rec.id]}>
                  {deleting[rec.id] ? '…' : '✕'}
                </button>
              </div>
            </div>

            <div className="admin-record__fields">
              {fields.map(f => (
                <div key={f.key} className="admin-field-row">
                  <label>{f.label}</label>
                  {f.multiline ? (
                    <textarea value={values[rec.id]?.[f.key] ?? ''} rows={3}
                      onChange={e => setValues(v => ({ ...v, [rec.id]: { ...v[rec.id], [f.key]: e.target.value } }))} />
                  ) : (
                    <input type={f.number ? 'number' : 'text'} value={values[rec.id]?.[f.key] ?? ''}
                      onChange={e => setValues(v => ({ ...v, [rec.id]: { ...v[rec.id], [f.key]: e.target.value } }))} />
                  )}
                </div>
              ))}
            </div>

            <div className="admin-record__footer">
              <button className={`btn-save ${st === 'saved' ? 'saved' : st === 'error' ? 'error' : ''}`}
                onClick={() => save(rec.id)} disabled={st === 'saving'}>
                {st === 'saving' ? 'Saving…' : st === 'saved' ? '✓ Saved' : st === 'error' ? '✗ Error' : 'Save changes'}
              </button>
            </div>
          </div>
        )
      })}

      <button className="btn-add" onClick={addNew} disabled={adding}>
        {adding ? 'Adding…' : '+ Add new'}
      </button>
    </section>
  )
}

// ── Main Admin ────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  'Profile', 'Stats', 'Case Studies', 'Experience',
  'Brands', 'Services', 'Process', 'Packages', 'Testimonials',
]

export default function AdminApp() {
  const [authed, setAuthed] = useState(sessionStorage.getItem('admin_auth') === '1')
  const [activeSection, setActiveSection] = useState('Profile')

  if (!authed) return <PasswordGate onUnlock={() => setAuthed(true)} />

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__icon">⚙</span>
          <div>
            <strong>Admin Panel</strong>
            <small>The Socials Glow</small>
          </div>
        </div>
        <nav>
          {NAV_SECTIONS.map(s => (
            <button key={s} className={activeSection === s ? 'active' : ''} onClick={() => setActiveSection(s)}>
              {s}
            </button>
          ))}
        </nav>
        <button className="admin-sidebar__logout" onClick={() => {
          sessionStorage.removeItem('admin_auth'); setAuthed(false)
        }}>Log out</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeSection}</h1>
          <a href="/" target="_blank" className="admin-header__preview">View site ↗</a>
        </header>
        <div className="admin-content">
          {activeSection === 'Profile' && <ProfileSection />}

          {activeSection === 'Stats' && (
            <ListSection title="Stats" tableKey="Stats" fields={[
              { key: 'Value', label: 'Number', number: true },
              { key: 'Suffix', label: 'Suffix (X / K / M / +)' },
              { key: 'Label', label: 'Label' },
              { key: 'Note', label: 'Note' },
            ]} defaultNewRecord={{ Value: 0, Suffix: '', Label: 'New stat', Note: '' }} />
          )}

          {activeSection === 'Case Studies' && (
            <ListSection title="Case Studies" tableKey="CaseStudies" fields={[
              { key: 'Client', label: 'Client Name' },
              { key: 'Niche', label: 'Niche' },
              { key: 'Headline', label: 'Headline' },
              { key: 'Blurb', label: 'Blurb', multiline: true },
              { key: 'Metric1Label', label: 'Metric 1 Label' },
              { key: 'Metric1From', label: 'Metric 1 From' },
              { key: 'Metric1To', label: 'Metric 1 To' },
              { key: 'Metric2Label', label: 'Metric 2 Label' },
              { key: 'Metric2From', label: 'Metric 2 From' },
              { key: 'Metric2To', label: 'Metric 2 To' },
              { key: 'Metric3Label', label: 'Metric 3 Label' },
              { key: 'Metric3From', label: 'Metric 3 From' },
              { key: 'Metric3To', label: 'Metric 3 To' },
            ]} defaultNewRecord={{ Client: 'New Client', Niche: '', Headline: '', Blurb: '' }} />
          )}

          {activeSection === 'Experience' && (
            <ListSection title="Experience" tableKey="Experience" fields={[
              { key: 'Role', label: 'Role' },
              { key: 'Org', label: 'Organisation' },
              { key: 'Period', label: 'Period' },
              { key: 'Detail', label: 'Description', multiline: true },
            ]} defaultNewRecord={{ Role: 'New Role', Org: '', Period: '', Detail: '' }} />
          )}

          {activeSection === 'Brands' && (
            <ListSection title="Brands (Marquee)" tableKey="Brands" fields={[
              { key: 'Name', label: 'Brand Name' },
            ]} defaultNewRecord={{ Name: 'New Brand' }} />
          )}

          {activeSection === 'Services' && (
            <ListSection title="Services" tableKey="Services" fields={[
              { key: 'Title', label: 'Service Title' },
              { key: 'Desc', label: 'Description', multiline: true },
            ]} defaultNewRecord={{ Title: 'New Service', Desc: '' }} />
          )}

          {activeSection === 'Process' && (
            <ListSection title="Process Steps" tableKey="Process" fields={[
              { key: 'StepNum', label: 'Step Number (e.g. 07)' },
              { key: 'Title', label: 'Step Title' },
              { key: 'Desc', label: 'Description', multiline: true },
            ]} defaultNewRecord={{ StepNum: '07', Title: 'New Step', Desc: '' }} />
          )}

          {activeSection === 'Packages' && (
            <ListSection title="Packages" tableKey="Packages" fields={[
              { key: 'Tier', label: 'Tier (e.g. Tier 1)' },
              { key: 'PackageName', label: 'Package Name' },
              { key: 'Features', label: 'Features (one per line)', multiline: true },
            ]} defaultNewRecord={{ Tier: 'Tier 4', PackageName: 'New Package', Features: '' }} />
          )}

          {activeSection === 'Testimonials' && (
            <ListSection title="Testimonials" tableKey="Testimonials" fields={[
              { key: 'Name', label: 'Name' },
              { key: 'Role', label: 'Role / Company' },
              { key: 'Quote', label: 'Quote', multiline: true },
            ]} defaultNewRecord={{ Name: 'New Person', Role: '', Quote: '' }} />
          )}
        </div>
      </main>
    </div>
  )
}
