import { createContext, useContext, useState, type ReactNode } from 'react';

interface LotusContextType {
  mentorContext: string | null;
  setMentorContext: (context: string | null) => void;
}

const LotusContext = createContext<LotusContextType | undefined>(undefined);

export function LotusProvider({ children }: { children: ReactNode }) {
  const [mentorContext, setMentorContext] = useState<string | null>(null);

  return (
    <LotusContext.Provider value={{ mentorContext, setMentorContext }}>
      {children}
    </LotusContext.Provider>
  );
}

export function useLotus() {
  const context = useContext(LotusContext);
  if (context === undefined) {
    throw new Error('useLotus must be used within a LotusProvider');
  }
  return context;
}
