export interface Equipment {
  id: string;
  name: string;
  category: 'strength' | 'cardio' | 'functional';
  location: string;
  qrCode: string;
  status: 'available' | 'in-use' | 'maintenance';
  videoUrls: {
    basic?: string;
    intermediate?: string;
    advanced?: string;
  };
  exercises: EquipmentExercise[];
}

export interface EquipmentExercise {
  id: string;
  name: string;
  nameKo: string;
  difficulty: 1 | 2 | 3 | 4;
  muscleGroups: string[];
}

export interface ScannedItem {
  id: string;
  equipmentId: string;
  equipmentName: string;
  scannedAt: string;
  location: string;
}
