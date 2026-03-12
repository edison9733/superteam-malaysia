// © 2026 edison9733. ScrollSpyProvider — activates scroll-spy on mount
'use client';
import useScrollSpy from '@/hooks/useScrollSpy';

export default function ScrollSpyProvider() {
  useScrollSpy();
  return null; // No visual output — just activates the observer
}
