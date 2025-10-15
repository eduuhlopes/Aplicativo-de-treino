export interface UserProfile {
  name: string;
  weight: number;
  height: number;
  dob: string; // YYYY-MM-DD
}

export interface UserData {
  weight: number;
  height: number;
  goal: 'Massa Muscular' | 'Definição' | 'Perda de Peso';
}

export interface Exercise {
  name: string;
  description: string;
  reps: string;
  rest: string;
  youtubeVideoId: string;
  equipment: string;
  musclesWorked: string;
}

export interface DailyWorkout {
  day: string;
  focus: string;
  daySummary: string;
  exercises: Exercise[];
}

export interface WorkoutPlan {
  workoutPlan: DailyWorkout[];
}