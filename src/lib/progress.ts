import { academyData } from '../data/academy_data';
import { codingTheology } from '../data/coding_theology';
import { cyberLabs } from '../data/cyber_labs';
import { osData } from '../data/os_data';

const STORAGE_KEYS = {
  academy: 'lotus_academy_progress',
  labs: 'lotus_labs_progress',
  concepts: 'lotus_concepts_viewed',
  os: 'lotus_os_explored',
  cheatsheets: 'lotus_cheatsheets_copied',
} as const;

// Academy progress
export function getAcademyProgress(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.academy) || '[]');
  } catch {
    return [];
  }
}

export function getAcademyTotal(): number {
  return Object.values(academyData).reduce(
    (sum, team) => sum + team.cheats.length + team.guides.length,
    0
  );
}

export function getAcademyPercentage(): number {
  const learned = getAcademyProgress().length;
  const total = getAcademyTotal();
  return total > 0 ? Math.round((learned / total) * 100) : 0;
}

// Labs progress
export interface LabsProgress {
  [labId: string]: number[];
}

export function getLabsProgress(): LabsProgress {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.labs) || '{}');
  } catch {
    return {};
  }
}

export function saveLabsProgress(progress: LabsProgress): void {
  localStorage.setItem(STORAGE_KEYS.labs, JSON.stringify(progress));
}

export function getLabsTotalSteps(): number {
  return cyberLabs.reduce((sum, lab) => sum + lab.steps.length, 0);
}

export function getLabsPercentage(): number {
  const progress = getLabsProgress();
  const completedSteps = Object.values(progress).reduce(
    (sum, steps) => sum + steps.length,
    0
  );
  const total = getLabsTotalSteps();
  return total > 0 ? Math.round((completedSteps / total) * 100) : 0;
}

export function getCompletedLabIds(): string[] {
  const progress = getLabsProgress();
  return cyberLabs
    .filter((lab) => {
      const completed = progress[lab.id] || [];
      return completed.length === lab.steps.length && lab.steps.length > 0;
    })
    .map((lab) => lab.id);
}

// Coding Theology progress
export function getConceptsProgress(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.concepts) || '[]');
  } catch {
    return [];
  }
}

export function saveConceptsProgress(viewed: string[]): void {
  localStorage.setItem(STORAGE_KEYS.concepts, JSON.stringify(viewed));
}

export function getConceptsPercentage(): number {
  const viewed = getConceptsProgress().length;
  const total = codingTheology.length;
  return total > 0 ? Math.round((viewed / total) * 100) : 0;
}

// OS progress
export function getOSProgress(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.os) || '[]');
  } catch {
    return [];
  }
}

export function saveOSProgress(explored: string[]): void {
  localStorage.setItem(STORAGE_KEYS.os, JSON.stringify(explored));
}

export function getOSPercentage(): number {
  const explored = getOSProgress().length;
  const total = osData.length;
  return total > 0 ? Math.round((explored / total) * 100) : 0;
}

// Cheat Sheets progress
export function getCheatSheetsProgress(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.cheatsheets) || '[]');
  } catch {
    return [];
  }
}

export function saveCheatSheetsProgress(copied: string[]): void {
  localStorage.setItem(STORAGE_KEYS.cheatsheets, JSON.stringify(copied));
}

// Total cheat sheet items (all commands across all sheets)
const CHEAT_SHEET_TOTAL = 48; // 8 sheets × 6 commands each

export function getCheatSheetsPercentage(): number {
  const copied = getCheatSheetsProgress().length;
  return Math.round((copied / CHEAT_SHEET_TOTAL) * 100);
}

// Overall progress
export function getOverallPercentage(): number {
  const academy = getAcademyPercentage();
  const labs = getLabsPercentage();
  const concepts = getConceptsPercentage();
  const os = getOSPercentage();
  const cheatsheets = getCheatSheetsPercentage();
  return Math.round((academy + labs + concepts + os + cheatsheets) / 5);
}

export interface ProgressOverview {
  academy: number;
  labs: number;
  concepts: number;
  os: number;
  cheatsheets: number;
  overall: number;
}

export function getProgressOverview(): ProgressOverview {
  return {
    academy: getAcademyPercentage(),
    labs: getLabsPercentage(),
    concepts: getConceptsPercentage(),
    os: getOSPercentage(),
    cheatsheets: getCheatSheetsPercentage(),
    overall: getOverallPercentage(),
  };
}

// First-time user check
export function isFirstTimeUser(): boolean {
  return getOverallPercentage() === 0;
}

// Continue Learning suggestion
export function getNextRecommendation():
  | { type: 'academy' | 'lab' | 'concept' | 'os' | 'cheatsheet'; title: string; path: string }
  | null {
  // Suggest OS first for beginners
  if (getOSProgress().length === 0) {
    return { type: 'os', title: 'Explore OS 101', path: '/os' };
  }

  // Then suggest a lab
  const labsProgress = getLabsProgress();
  const incompleteLab = cyberLabs.find((lab) => {
    const completed = labsProgress[lab.id] || [];
    return completed.length < lab.steps.length;
  });
  if (incompleteLab) {
    return {
      type: 'lab',
      title: incompleteLab.title,
      path: '/labs',
    };
  }

  // Then suggest a concept
  const viewedConcepts = getConceptsProgress();
  const unviewedConcept = codingTheology.find((c) => !viewedConcepts.includes(c.id));
  if (unviewedConcept) {
    return {
      type: 'concept',
      title: unviewedConcept.title,
      path: '/library',
    };
  }

  // Then suggest academy content
  const academyProgress = getAcademyProgress();
  const totalAcademy = getAcademyTotal();
  if (academyProgress.length < totalAcademy) {
    return {
      type: 'academy',
      title: 'Lotus Academy Teams',
      path: '/academy',
    };
  }

  // Then suggest cheat sheets
  const copiedSheets = getCheatSheetsProgress();
  if (copiedSheets.length < CHEAT_SHEET_TOTAL) {
    return {
      type: 'cheatsheet',
      title: 'Cheat Sheet Hub',
      path: '/cheatsheets',
    };
  }

  return null;
}
