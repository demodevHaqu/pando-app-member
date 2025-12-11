import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface Exercise {
  id: string;
  name: string;
  targetMuscle: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // seconds
  restTime: number; // seconds
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  completedSets: number;
  imageUrl?: string;
  videoUrl?: string;
}

interface Routine {
  id: string;
  name: string;
  description?: string;
  category: 'strength' | 'cardio' | 'flexibility' | 'recovery';
  difficulty: 1 | 2 | 3 | 4 | 5;
  estimatedTime: number; // minutes
  calories?: number;
  exercises: Exercise[];
  isAIRecommended?: boolean;
  createdAt: Date;
}

interface RoutineSession {
  id: string;
  routineId: string;
  startedAt: Date;
  completedAt?: Date;
  currentExerciseIndex: number;
  currentSetIndex: number;
  isResting: boolean;
  restTimeRemaining: number;
  totalCaloriesBurned: number;
  exercises: Exercise[];
}

interface RoutineHistory {
  id: string;
  routineId: string;
  routineName: string;
  completedAt: Date;
  duration: number; // seconds
  exercisesCompleted: number;
  totalExercises: number;
  caloriesBurned: number;
}

interface RoutineState {
  // Routines
  routines: Routine[];
  currentRoutine: Routine | null;

  // Session
  activeSession: RoutineSession | null;

  // History
  history: RoutineHistory[];

  // Actions - Routines
  setRoutines: (routines: Routine[]) => void;
  addRoutine: (routine: Routine) => void;
  updateRoutine: (id: string, updates: Partial<Routine>) => void;
  deleteRoutine: (id: string) => void;
  setCurrentRoutine: (routine: Routine | null) => void;

  // Actions - Session
  startSession: (routine: Routine) => void;
  endSession: (completed?: boolean) => void;
  nextExercise: () => void;
  previousExercise: () => void;
  completeSet: () => void;
  skipExercise: () => void;
  startRest: (duration: number) => void;
  endRest: () => void;
  updateRestTime: (seconds: number) => void;
  addCalories: (calories: number) => void;

  // Actions - History
  addToHistory: (entry: RoutineHistory) => void;
  clearHistory: () => void;
}

export const useRoutineStore = create<RoutineState>()(
  persist(
    (set, get) => ({
      // Initial state
      routines: [],
      currentRoutine: null,
      activeSession: null,
      history: [],

      // Routines actions
      setRoutines: (routines) => set({ routines }),

      addRoutine: (routine) =>
        set((state) => ({ routines: [...state.routines, routine] })),

      updateRoutine: (id, updates) =>
        set((state) => ({
          routines: state.routines.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          ),
        })),

      deleteRoutine: (id) =>
        set((state) => ({
          routines: state.routines.filter((r) => r.id !== id),
        })),

      setCurrentRoutine: (routine) => set({ currentRoutine: routine }),

      // Session actions
      startSession: (routine) => {
        const session: RoutineSession = {
          id: `session-${Date.now()}`,
          routineId: routine.id,
          startedAt: new Date(),
          currentExerciseIndex: 0,
          currentSetIndex: 0,
          isResting: false,
          restTimeRemaining: 0,
          totalCaloriesBurned: 0,
          exercises: routine.exercises.map((e) => ({
            ...e,
            status: 'pending',
            completedSets: 0,
          })),
        };
        set({ activeSession: session, currentRoutine: routine });
      },

      endSession: (completed = true) => {
        const { activeSession, currentRoutine } = get();

        if (activeSession && currentRoutine) {
          const completedExercises = activeSession.exercises.filter(
            (e) => e.status === 'completed'
          ).length;

          const historyEntry: RoutineHistory = {
            id: `history-${Date.now()}`,
            routineId: currentRoutine.id,
            routineName: currentRoutine.name,
            completedAt: new Date(),
            duration: Math.floor(
              (Date.now() - activeSession.startedAt.getTime()) / 1000
            ),
            exercisesCompleted: completedExercises,
            totalExercises: activeSession.exercises.length,
            caloriesBurned: activeSession.totalCaloriesBurned,
          };

          if (completed) {
            set((state) => ({
              history: [historyEntry, ...state.history],
            }));
          }
        }

        set({ activeSession: null });
      },

      nextExercise: () =>
        set((state) => {
          if (!state.activeSession) return state;

          const nextIndex = state.activeSession.currentExerciseIndex + 1;
          if (nextIndex >= state.activeSession.exercises.length) {
            return state;
          }

          const exercises = [...state.activeSession.exercises];
          exercises[state.activeSession.currentExerciseIndex].status = 'completed';
          exercises[nextIndex].status = 'in_progress';

          return {
            activeSession: {
              ...state.activeSession,
              currentExerciseIndex: nextIndex,
              currentSetIndex: 0,
              exercises,
            },
          };
        }),

      previousExercise: () =>
        set((state) => {
          if (!state.activeSession) return state;

          const prevIndex = state.activeSession.currentExerciseIndex - 1;
          if (prevIndex < 0) return state;

          const exercises = [...state.activeSession.exercises];
          exercises[prevIndex].status = 'in_progress';

          return {
            activeSession: {
              ...state.activeSession,
              currentExerciseIndex: prevIndex,
              currentSetIndex: 0,
              exercises,
            },
          };
        }),

      completeSet: () =>
        set((state) => {
          if (!state.activeSession) return state;

          const exercises = [...state.activeSession.exercises];
          const currentExercise = exercises[state.activeSession.currentExerciseIndex];
          const newCompletedSets = currentExercise.completedSets + 1;

          currentExercise.completedSets = newCompletedSets;
          currentExercise.status = 'in_progress';

          // Check if all sets are completed
          if (newCompletedSets >= currentExercise.sets) {
            currentExercise.status = 'completed';
          }

          return {
            activeSession: {
              ...state.activeSession,
              currentSetIndex: state.activeSession.currentSetIndex + 1,
              exercises,
            },
          };
        }),

      skipExercise: () =>
        set((state) => {
          if (!state.activeSession) return state;

          const exercises = [...state.activeSession.exercises];
          exercises[state.activeSession.currentExerciseIndex].status = 'skipped';

          const nextIndex = state.activeSession.currentExerciseIndex + 1;
          if (nextIndex < exercises.length) {
            exercises[nextIndex].status = 'in_progress';
          }

          return {
            activeSession: {
              ...state.activeSession,
              currentExerciseIndex: Math.min(nextIndex, exercises.length - 1),
              currentSetIndex: 0,
              exercises,
            },
          };
        }),

      startRest: (duration) =>
        set((state) => {
          if (!state.activeSession) return state;
          return {
            activeSession: {
              ...state.activeSession,
              isResting: true,
              restTimeRemaining: duration,
            },
          };
        }),

      endRest: () =>
        set((state) => {
          if (!state.activeSession) return state;
          return {
            activeSession: {
              ...state.activeSession,
              isResting: false,
              restTimeRemaining: 0,
            },
          };
        }),

      updateRestTime: (seconds) =>
        set((state) => {
          if (!state.activeSession) return state;
          return {
            activeSession: {
              ...state.activeSession,
              restTimeRemaining: Math.max(0, seconds),
            },
          };
        }),

      addCalories: (calories) =>
        set((state) => {
          if (!state.activeSession) return state;
          return {
            activeSession: {
              ...state.activeSession,
              totalCaloriesBurned: state.activeSession.totalCaloriesBurned + calories,
            },
          };
        }),

      // History actions
      addToHistory: (entry) =>
        set((state) => ({ history: [entry, ...state.history] })),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'routine-storage',
      partialize: (state) => ({
        routines: state.routines,
        history: state.history,
      }),
    }
  )
);
