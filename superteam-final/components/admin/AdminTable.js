// components/admin/AdminTable.js
'use client';

import { useState, useEffect } from 'react';

/**
 * Reusable CRUD table component for admin dashboard.
 * 
 * Props:
 *   table     - Supabase table name ('members', 'events', etc.)
 *   columns   - Array of { key, label, type, options, width }
 *   defaults  - Default values for new records
 *   title     - Page title
 *   subtitle  - Page subtitle
 */
export default function AdminTable({ table, columns, defaults = {}, title, subtitle }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);     // item being edited
  const [creating, setCreating] = useState(false);    // show create form
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => { loadItems(); }, []);

  async function loadItems() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${table}`);
      if (res.ok) {
        const json = await res.json();
        setItems(json.data || []);
      }
    } catch (e) {
      console.error('Failed to load:', e);
    }
    setLoading(false);
  }

  function startCreate() {
    setFormData({ ...defaults });
    setCreating(true);
    setEditing(null);
    setMessage('');
  }

  function startEdit(item) {
    setFormData({ ...item });
    setEditing(item.id);
    setCreating(false);
    setMessage('');
  }

  function cancelForm() {
    setEditing(null);
    setCreating(false);
    setFormData({});
    setMessage('');
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');
    try {
      const isNew = creating;
      const url = isNew
        ? `/api/admin/${table}`
        : `/api/admin/${table}/${editing}`;

      const body = { ...formData };
      // Clean up fields
      delete body.id;
      delete body.created_at;
      delete body.updated_at;

      // Handle array fields (skills, badges, tags)
      for (const col of columns) {
        if (col.type === 'tags' && typeof body[col.key] === 'string') {
          body[col.key] = body[col.key].split(',').map(s => s.trim()).filter(Boolean);
        }
      }

      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setMessage(isNew ? '✅ Created successfully!' : '✅ Updated successfully!');
        cancelForm();
        loadItems();
      } else {
        const err = await res.json();
        setMessage(`❌ Error: ${err.error}`);
      }
    } catch (e) {
      setMessage(`❌ Error: ${e.message}`);
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const res = await fetch(`/api/admin/${table}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('🗑️ Deleted.');
        loadItems();
      }
    } catch (e) {
      setMessage(`❌ Delete failed: ${e.message}`);
    }
  }

  // Simple text search across all string fields
  const filtered = items.filter(item => {
    if (!search) return true;
    const q = search.toLowerCase();
    return columns.some(col => {
      const val = item[col.key];
      if (typeof val === 'string') return val.toLowerCase().includes(q);
      if (Array.isArray(val)) return val.some(v => v.toLowerCase().includes(q));
      return false;
    });
  });

  const showForm = creating || editing;

  return (
    <div>
      <div style={styles.header}>
        <div>
          <h1 style={styles.pageTitle}>{title}</h1>
          {subtitle && <p style={styles.pageSubtitle}>{subtitle}</p>}
        </div>
        <button onClick={startCreate} style={styles.createBtn}>
          + Add New
        </button>
      </div>

      {message && <div style={styles.message}>{message}</div>}

      {/* CREATE / EDIT FORM */}
      {showForm && (
        <div style={styles.formWrap}>
          <h3 style={styles.formTitle}>
            {creating ? `Create New ${title.replace(/s$/, '')}` : 'Edit Record'}
          </h3>
          <div style={styles.formGrid}>
            {columns.filter(c => !c.readOnly).map((col) => (
              <div key={col.key} style={{ ...styles.formField, gridColumn: col.wide ? '1 / -1' : undefined }}>
                <label style={styles.label}>{col.label}</label>
                {col.type === 'textarea' ? (
                  <textarea
                    value={formData[col.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                    style={{ ...styles.input, minHeight: 100, resize: 'vertical' }}
                    placeholder={col.placeholder || ''}
                  />
                ) : col.type === 'select' ? (
                  <select
                    value={formData[col.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                    style={styles.input}
                  >
                    {col.options.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : col.type === 'boolean' ? (
                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={formData[col.key] || false}
                      onChange={(e) => setFormData({ ...formData, [col.key]: e.target.checked })}
                      style={styles.checkbox}
                    />
                    {col.label}
                  </label>
                ) : col.type === 'number' ? (
                  <input
                    type="number"
                    value={formData[col.key] ?? 0}
                    onChange={(e) => setFormData({ ...formData, [col.key]: parseInt(e.target.value) || 0 })}
                    style={styles.input}
                  />
                ) : col.type === 'tags' ? (
                  <input
                    value={Array.isArray(formData[col.key]) ? formData[col.key].join(', ') : formData[col.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                    style={styles.input}
                    placeholder="Comma-separated values (e.g. Rust, Frontend, Design)"
                  />
                ) : col.type === 'date' ? (
                  <input
                    type="datetime-local"
                    value={formData[col.key] ? formData[col.key].slice(0, 16) : ''}
                    onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                    style={styles.input}
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[col.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                    style={styles.input}
                    placeholder={col.placeholder || ''}
                  />
                )}
              </div>
            ))}
          </div>
          <div style={styles.formActions}>
            <button onClick={cancelForm} style={styles.cancelBtn}>Cancel</button>
            <button onClick={handleSave} disabled={saving} style={styles.saveBtn}>
              {saving ? 'Saving...' : creating ? 'Create' : 'Save Changes'}
            </button>
          </div>
        </div>
      )}

      {/* SEARCH */}
      <div style={styles.searchWrap}>
        <input
          type="text"
          placeholder={`Search ${title.toLowerCase()}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <span style={styles.countBadge}>{filtered.length} items</span>
      </div>

      {/* TABLE */}
      {loading ? (
        <p style={styles.loadingText}>Loading...</p>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {columns.filter(c => !c.hideInTable).map((col) => (
                  <th key={col.key} style={{ ...styles.th, width: col.width }}>
                    {col.label}
                  </th>
                ))}
                <th style={{ ...styles.th, width: 120 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} style={styles.tr}>
                  {columns.filter(c => !c.hideInTable).map((col) => (
                    <td key={col.key} style={styles.td}>
                      {col.type === 'boolean' ? (
                        <span style={{
                          ...styles.badge,
                          background: item[col.key] ? '#14F19520' : '#f43f5e20',
                          color: item[col.key] ? '#14F195' : '#f43f5e',
                        }}>
                          {item[col.key] ? 'Yes' : 'No'}
                        </span>
                      ) : col.type === 'tags' ? (
                        <div style={styles.tagList}>
                          {(item[col.key] || []).slice(0, 3).map((tag, i) => (
                            <span key={i} style={styles.tag}>{tag}</span>
                          ))}
                          {(item[col.key] || []).length > 3 && (
                            <span style={styles.tagMore}>+{item[col.key].length - 3}</span>
                          )}
                        </div>
                      ) : col.type === 'date' ? (
                        item[col.key] ? new Date(item[col.key]).toLocaleDateString() : '—'
                      ) : (
                        <span style={styles.cellText}>
                          {String(item[col.key] || '—').slice(0, 60)}
                          {String(item[col.key] || '').length > 60 ? '...' : ''}
                        </span>
                      )}
                    </td>
                  ))}
                  <td style={styles.td}>
                    <div style={styles.actionBtns}>
                      <button onClick={() => startEdit(item)} style={styles.editBtn}>Edit</button>
                      <button onClick={() => handleDelete(item.id)} style={styles.deleteBtn}>×</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={columns.filter(c => !c.hideInTable).length + 1} style={styles.emptyTd}>
                    {search ? 'No results found.' : 'No items yet. Click "Add New" to create one.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const styles = {
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  pageTitle: { fontSize: 28, fontWeight: 700, color: '#fff', margin: 0 },
  pageSubtitle: { fontSize: 14, color: '#71717a', marginTop: 4 },
  createBtn: {
    padding: '10px 20px',
    background: '#14F195',
    color: '#000',
    border: 'none',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    flexShrink: 0,
  },
  message: {
    padding: '12px 16px',
    background: '#111118',
    border: '1px solid #1e1e2a',
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
  },
  // Form
  formWrap: {
    background: '#111118',
    border: '1px solid #1e1e2a',
    borderRadius: 12,
    padding: '24px',
    marginBottom: 24,
  },
  formTitle: { fontSize: 18, fontWeight: 600, color: '#fff', marginTop: 0, marginBottom: 20 },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 16,
  },
  formField: {},
  label: { display: 'block', fontSize: 12, fontWeight: 600, color: '#a1a1aa', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: {
    width: '100%',
    padding: '10px 14px',
    background: '#0a0a0f',
    border: '1px solid #27272a',
    borderRadius: 8,
    color: '#fff',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  checkboxLabel: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#e4e4e7', cursor: 'pointer' },
  checkbox: { width: 18, height: 18, accentColor: '#14F195' },
  formActions: { display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 20 },
  cancelBtn: { padding: '10px 20px', background: '#1e1e2a', border: 'none', borderRadius: 8, color: '#a1a1aa', cursor: 'pointer', fontSize: 14 },
  saveBtn: { padding: '10px 24px', background: '#14F195', color: '#000', border: 'none', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: 14 },
  // Search
  searchWrap: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 },
  searchInput: {
    flex: 1,
    padding: '10px 14px',
    background: '#111118',
    border: '1px solid #1e1e2a',
    borderRadius: 8,
    color: '#fff',
    fontSize: 14,
    outline: 'none',
  },
  countBadge: { fontSize: 13, color: '#71717a', flexShrink: 0 },
  // Table
  tableWrap: { overflowX: 'auto', borderRadius: 12, border: '1px solid #1e1e2a' },
  table: { width: '100%', borderCollapse: 'collapse', background: '#111118' },
  th: { textAlign: 'left', padding: '12px 16px', fontSize: 11, fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #1e1e2a', whiteSpace: 'nowrap' },
  tr: { borderBottom: '1px solid #1e1e2a08' },
  td: { padding: '12px 16px', fontSize: 14, color: '#e4e4e7', verticalAlign: 'middle' },
  cellText: { color: '#e4e4e7' },
  emptyTd: { padding: '40px 16px', textAlign: 'center', color: '#52525b', fontSize: 14 },
  // Tags & badges
  badge: { padding: '3px 10px', borderRadius: 20, fontSize: 12, fontWeight: 500 },
  tagList: { display: 'flex', flexWrap: 'wrap', gap: 4 },
  tag: { padding: '2px 8px', background: '#9945FF20', color: '#c084fc', borderRadius: 4, fontSize: 11 },
  tagMore: { padding: '2px 8px', color: '#71717a', fontSize: 11 },
  // Actions
  actionBtns: { display: 'flex', gap: 6 },
  editBtn: { padding: '5px 14px', background: '#1e1e2a', border: 'none', borderRadius: 6, color: '#e4e4e7', cursor: 'pointer', fontSize: 13 },
  deleteBtn: { padding: '5px 10px', background: '#f43f5e15', border: 'none', borderRadius: 6, color: '#f43f5e', cursor: 'pointer', fontSize: 16, fontWeight: 700 },
  loadingText: { color: '#71717a', textAlign: 'center', padding: 40 },
};
