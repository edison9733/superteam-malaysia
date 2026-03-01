// © 2026 edison9733. All rights reserved.
// Superteam Malaysia Official Website — Unauthorized copying prohibited.
'use client';

// hooks/useAdminCrud.js
// React hook for admin dashboard CRUD operations
// Wraps the /api/admin/[table] endpoints with loading states, error handling, and caching

import { useState, useCallback, useEffect } from 'react';

export function useAdminCrud(table) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  // ── Fetch all items ────────────────────────────────────────
  const fetchItems = useCallback(
    async (params = {}) => {
      setLoading(true);
      setError(null);
      try {
        const query = new URLSearchParams(params).toString();
        const res = await fetch(`/api/admin/${table}?${query}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setItems(json.data || []);
        setCount(json.count || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [table]
  );

  // ── Create a new item ──────────────────────────────────────
  const createItem = useCallback(
    async (item) => {
      setError(null);
      try {
        const res = await fetch(`/api/admin/${table}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setItems((prev) => [json.data, ...prev]);
        setCount((prev) => prev + 1);
        return json.data;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    [table]
  );

  // ── Update an existing item ────────────────────────────────
  const updateItem = useCallback(
    async (id, updates) => {
      setError(null);
      try {
        const res = await fetch(`/api/admin/${table}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...updates }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setItems((prev) =>
          prev.map((item) => (item.id === id ? json.data : item))
        );
        return json.data;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    [table]
  );

  // ── Delete an item ─────────────────────────────────────────
  const deleteItem = useCallback(
    async (id) => {
      setError(null);
      try {
        const res = await fetch(`/api/admin/${table}?id=${id}`, {
          method: 'DELETE',
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        setItems((prev) => prev.filter((item) => item.id !== id));
        setCount((prev) => prev - 1);
      } catch (err) {
        setError(err.message);
        throw err;
      }
    },
    [table]
  );

  // Auto-fetch on mount
  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return {
    items,
    loading,
    error,
    count,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
  };
}

// ── Media upload hook ──────────────────────────────────────
export function useMediaUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const upload = useCallback(async (file, folder = 'general', altText = '') => {
    setUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      if (altText) formData.append('alt_text', altText);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      return json.url;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  return { upload, uploading, error };
}
