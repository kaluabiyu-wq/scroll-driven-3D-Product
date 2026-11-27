import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { getQuality } from '../../config/quality';
import type { Quality, QualityPreference } from '../../config/quality';

type QualityContextValue = {
  preference: QualityPreference;
  quality: Quality;
  setPreference: (value: QualityPreference) => void;
};

const QualityContext = createContext<QualityContextValue | null>(null);

export function QualityProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<QualityPreference>(() => {
    try {
      const saved = localStorage.getItem('halo-quality');
      return saved === 'low' || saved === 'medium' || saved === 'high' ? saved : 'auto';
    } catch {
      return 'auto';
    }
  });

  useEffect(() => {
    try { localStorage.setItem('halo-quality', preference); } catch { /* Storage may be disabled. */ }
  }, [preference]);

  const value = useMemo(() => ({
    preference,
    quality: getQuality(preference),
    setPreference: setPreferenceState,
  }), [preference]);

  return <QualityContext.Provider value={value}>{children}</QualityContext.Provider>;
}

export function useQualitySettings() {
  const value = useContext(QualityContext);
  if (!value) throw new Error('useQualitySettings must be used inside QualityProvider');
  return value;
}
