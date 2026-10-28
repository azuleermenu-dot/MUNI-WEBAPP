import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '../../lib/supabase/server';

const cards = [
  ['📅', 'Study Planner', 'Plan focused study sessions around your classes.', '/planner'],
  ['📝', 'Assignments', 'Track homework and deadlines.', '/planner'],
  ['🎯', 'Exams', 'Prepare for upcoming tests and exams.', '/planner'],
  ['🧠', 'Flashcards', 'Review key concepts quickly.', '/planner'],
  ['❓', 'Quizzes', 'Practice and measure what you know.', '/planner'],
  ['📚', 'Reviewers', 'Keep learning materials together.', '/planner'],
];

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const [{ data: profile }, { count: taskCount }, { count: completedCount }] = await Promise.all([
    supabase.from('profiles').select('full_name,school_name,grade_level,section').eq('id', user.id).maybeSingle(),
    supabase.from('tasks').select('id', { count: 'exact', head: true }).eq('user_id', user.id).eq('completed', false),
    supabase.from('tasks').select('id', { count: 'exact', head: true }).eq('user_id', user.id).eq('completed', true),
  ]);

  const total = (taskCount ?? 0) + (completedCount ?? 0);
  const progress = total ? Math.round(((completedCount ?? 0) / total) * 100) : 0;
  const firstName = profile?.full_name?.split(' ')[0] || 'Student';

  return <main className="shell">
    <header className="topbar"><div className="brand"><span>M</span><strong>MUNI</strong></div><div className="school">{profile?.school_name || 'Minuyan National High School'}</div><div className="avatar">{firstName[0]?.toUpperCase() || 'S'}</div></header>
    <section className="hero"><div><p className="eyebrow">STUDENT DASHBOARD</p><h1>Hi, {firstName}.</h1><p className="muted">Your schoolwork, study plan, and review tools in one place.</p></div><div className="progress"><strong>{progress}%</strong><span>Task progress</span><div><i style={{ width: `${progress}%` }} /></div></div></section>
    <section className="today"><div className="section-title"><h2>Today</h2><span>{new Date().toLocaleDateString('en-PH',{weekday:'long',month:'short',day:'numeric'})}</span></div><div className="task"><span className="check">{taskCount ? '!' : '✓'}</span><div><b>{taskCount ? `${taskCount} unfinished task${taskCount === 1 ? '' : 's'}` : 'You are all caught up'}</b><small>{taskCount ? 'Open the planner to review your deadlines.' : 'Nice work. Keep your study momentum going.'}</small></div><span className="pill">{taskCount ? 'Planner' : 'Done'}</span></div></section>
    <section className="grid">{cards.map(([icon,title,text,href])=><article className="feature" key={title}><span className="feature-icon">{icon}</span><h3>{title}</h3><p>{text}</p><Link href={href}>Open →</Link></article>)}</section>
  </main>;
}
