import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Exercise {
  id: string;
  name: string;
  sets: number[];
  completedSets: number[];
  notes?: string;
}

interface WorkoutState {
  currentRoutine: string | null;
  currentExercise: number;
  exercises: Exercise[];
  startTime: Date | null;
  isActive: boolean;

  startRoutine: (routineId: string, exercises: Exercise[]) => void;
  completeSet: (exerciseIndex: number, setIndex: number) => void;
  nextExercise: () => void;
  completeRoutine: () => void;
  pauseWorkout: () => void;
  resumeWorkout: () => void;
  resetWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      currentRoutine: null,
      currentExercise: 0,
      exercises: [],
      startTime: null,
      isActive: false,

      startRoutine: (routineId, exercises) =>
        set({
          currentRoutine: routineId,
          currentExercise: 0,
          exercises,
          startTime: new Date(),
          isActive: true,
        }),

      completeSet: (exerciseIndex, setIndex) =>
        set((state) => {
          const newExercises = [...state.exercises];
          if (!newExercises[exerciseIndex].completedSets.includes(setIndex)) {
            newExercises[exerciseIndex].completedSets.push(setIndex);
          }
          return { exercises: newExercises };
        }),

      nextExercise: () =>
        set((state) => ({
          currentExercise: Math.min(state.currentExercise + 1, state.exercises.length - 1),
        })),

      completeRoutine: () =>
        set({
          currentRoutine: null,
          currentExercise: 0,
          exercises: [],
          startTime: null,
          isActive: false,
        }),

      pauseWorkout: () => set({ isActive: false }),
      resumeWorkout: () => set({ isActive: true }),
      resetWorkout: () =>
        set({
          currentRoutine: null,
          currentExercise: 0,
          exercises: [],
          startTime: null,
          isActive: false,
        }),
    }),
    {
      name: 'workout-storage',
    }
  )
);
