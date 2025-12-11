import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
interface Instructor {
  id: string;
  name: string;
  profileImageUrl?: string;
  title: string;
  specialties: string[];
  rating: number;
  totalReviews: number;
}

interface GXClass {
  id: string;
  name: string;
  instructor: Instructor;
  category: 'cardio' | 'strength' | 'yoga' | 'dance' | 'cycling' | 'pilates';
  date: Date;
  startTime: string;
  endTime: string;
  duration: number; // minutes
  room: string;
  currentParticipants: number;
  maxParticipants: number;
  difficulty: 1 | 2 | 3;
  calories?: number;
  description?: string;
}

interface Booking {
  id: string;
  classId: string;
  className: string;
  instructorName: string;
  category: GXClass['category'];
  date: Date;
  startTime: string;
  endTime: string;
  room: string;
  bookedAt: Date;
  status: 'confirmed' | 'cancelled' | 'attended' | 'no_show';
}

interface GXState {
  // Classes
  classes: GXClass[];
  selectedClass: GXClass | null;
  selectedDate: Date;

  // Bookings
  bookings: Booking[];

  // Favorites
  favoriteClassIds: string[];
  favoriteInstructorIds: string[];

  // Filters
  categoryFilter: GXClass['category'] | 'all';

  // Actions - Classes
  setClasses: (classes: GXClass[]) => void;
  setSelectedClass: (gxClass: GXClass | null) => void;
  setSelectedDate: (date: Date) => void;

  // Actions - Bookings
  bookClass: (gxClass: GXClass) => Booking;
  cancelBooking: (bookingId: string) => void;
  markAttended: (bookingId: string) => void;
  markNoShow: (bookingId: string) => void;
  getBookingByClassId: (classId: string) => Booking | undefined;
  isClassBooked: (classId: string) => boolean;

  // Actions - Favorites
  toggleFavoriteClass: (classId: string) => void;
  toggleFavoriteInstructor: (instructorId: string) => void;
  isClassFavorite: (classId: string) => boolean;
  isInstructorFavorite: (instructorId: string) => boolean;

  // Actions - Filters
  setCategoryFilter: (category: GXClass['category'] | 'all') => void;

  // Getters
  getUpcomingBookings: () => Booking[];
  getPastBookings: () => Booking[];
  getClassesByDate: (date: Date) => GXClass[];
  getFilteredClasses: () => GXClass[];
}

export const useGXStore = create<GXState>()(
  persist(
    (set, get) => ({
      // Initial state
      classes: [],
      selectedClass: null,
      selectedDate: new Date(),
      bookings: [],
      favoriteClassIds: [],
      favoriteInstructorIds: [],
      categoryFilter: 'all',

      // Classes actions
      setClasses: (classes) => set({ classes }),

      setSelectedClass: (gxClass) => set({ selectedClass: gxClass }),

      setSelectedDate: (date) => set({ selectedDate: date }),

      // Booking actions
      bookClass: (gxClass) => {
        const booking: Booking = {
          id: `booking-${Date.now()}`,
          classId: gxClass.id,
          className: gxClass.name,
          instructorName: gxClass.instructor.name,
          category: gxClass.category,
          date: gxClass.date,
          startTime: gxClass.startTime,
          endTime: gxClass.endTime,
          room: gxClass.room,
          bookedAt: new Date(),
          status: 'confirmed',
        };

        set((state) => ({
          bookings: [...state.bookings, booking],
        }));

        return booking;
      },

      cancelBooking: (bookingId) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
          ),
        })),

      markAttended: (bookingId) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === bookingId ? { ...b, status: 'attended' as const } : b
          ),
        })),

      markNoShow: (bookingId) =>
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === bookingId ? { ...b, status: 'no_show' as const } : b
          ),
        })),

      getBookingByClassId: (classId) => {
        return get().bookings.find(
          (b) => b.classId === classId && b.status === 'confirmed'
        );
      },

      isClassBooked: (classId) => {
        return get().bookings.some(
          (b) => b.classId === classId && b.status === 'confirmed'
        );
      },

      // Favorites actions
      toggleFavoriteClass: (classId) =>
        set((state) => ({
          favoriteClassIds: state.favoriteClassIds.includes(classId)
            ? state.favoriteClassIds.filter((id) => id !== classId)
            : [...state.favoriteClassIds, classId],
        })),

      toggleFavoriteInstructor: (instructorId) =>
        set((state) => ({
          favoriteInstructorIds: state.favoriteInstructorIds.includes(instructorId)
            ? state.favoriteInstructorIds.filter((id) => id !== instructorId)
            : [...state.favoriteInstructorIds, instructorId],
        })),

      isClassFavorite: (classId) => get().favoriteClassIds.includes(classId),

      isInstructorFavorite: (instructorId) =>
        get().favoriteInstructorIds.includes(instructorId),

      // Filter actions
      setCategoryFilter: (category) => set({ categoryFilter: category }),

      // Getters
      getUpcomingBookings: () => {
        const now = new Date();
        return get()
          .bookings.filter(
            (b) => b.status === 'confirmed' && new Date(b.date) >= now
          )
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      },

      getPastBookings: () => {
        const now = new Date();
        return get()
          .bookings.filter(
            (b) => b.status !== 'cancelled' && new Date(b.date) < now
          )
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      },

      getClassesByDate: (date) => {
        const targetDate = new Date(date).toDateString();
        return get().classes.filter(
          (c) => new Date(c.date).toDateString() === targetDate
        );
      },

      getFilteredClasses: () => {
        const { classes, categoryFilter, selectedDate } = get();
        const targetDate = selectedDate.toDateString();

        return classes.filter((c) => {
          const matchesDate = new Date(c.date).toDateString() === targetDate;
          const matchesCategory =
            categoryFilter === 'all' || c.category === categoryFilter;
          return matchesDate && matchesCategory;
        });
      },
    }),
    {
      name: 'gx-storage',
      partialize: (state) => ({
        bookings: state.bookings,
        favoriteClassIds: state.favoriteClassIds,
        favoriteInstructorIds: state.favoriteInstructorIds,
      }),
    }
  )
);
