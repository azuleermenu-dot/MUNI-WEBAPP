export type TaskKind = 'assignment' | 'project' | 'homework' | 'other';

export type Task = {
  id: string;
  user_id: string;
  subject_id: string | null;
  title: string;
  due_at: string | null;
  kind: TaskKind;
  completed: boolean;
  created_at: string;
};

export type Subject = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
};

export type Exam = {
  id: string;
  user_id: string;
  subject_id: string | null;
  title: string;
  exam_at: string;
  created_at: string;
};

export type StudySession = {
  id: string;
  user_id: string;
  subject_id: string | null;
  title: string;
  starts_at: string;
  duration_minutes: number;
  completed: boolean;
  created_at: string;
};

export type FlashcardDeck = {
  id: string;
  user_id: string;
  title: string;
  subject: string | null;
  created_at: string;
};

export type Flashcard = {
  id: string;
  deck_id: string;
  question: string;
  answer: string;
  created_at: string;
};
