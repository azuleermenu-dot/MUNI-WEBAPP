export type Feature = { id: string; icon: string; title: string; description: string };

export const MUNI_FEATURES: Feature[] = [
  { id: 'planner', icon: '📅', title: 'Study Planner', description: 'Plan study time and keep your week organized.' },
  { id: 'assignments', icon: '📝', title: 'Assignments', description: 'Track schoolwork and deadlines in one place.' },
  { id: 'exams', icon: '🎯', title: 'Exams', description: 'Keep upcoming assessments visible and prepare early.' },
  { id: 'flashcards', icon: '🧠', title: 'Flashcards', description: 'Create and review your own study cards.' },
  { id: 'quizzes', icon: '❓', title: 'Quizzes', description: 'Practice with source quizzes or make your own.' },
  { id: 'reviewers', icon: '📚', title: 'Reviewers', description: 'Read school materials and build personal reviewers.' },
];

export const MUNI_SCHOOL = 'Minuyan National High School';
