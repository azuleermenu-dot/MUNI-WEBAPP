const cards = [
  ['📅', 'Study Planner', 'Plan focused study sessions around your classes.'],
  ['📝', 'Assignments', 'Track homework and deadlines.'],
  ['🎯', 'Exams', 'Prepare for upcoming tests and exams.'],
  ['🧠', 'Flashcards', 'Review key concepts quickly.'],
  ['❓', 'Quizzes', 'Practice and measure what you know.'],
  ['📚', 'Reviewers', 'Keep learning materials together.'],
];

export default function Dashboard() {
  return <main className="shell"><header className="topbar"><div className="brand"><span>M</span><strong>MUNI</strong></div><div className="school">Minuyan National High School</div><button className="avatar">S</button></header><section className="hero"><div><p className="eyebrow">STUDENT DASHBOARD</p><h1>Make today count.</h1><p className="muted">Your schoolwork, study plan, and review tools in one place.</p></div><div className="progress"><strong>0%</strong><span>Study progress</span><div><i /></div></div></section><section className="today"><div className="section-title"><h2>Today</h2><span>Wednesday, Oct 28</span></div><div className="task"><span className="check">✓</span><div><b>Build your study plan</b><small>Start by adding your subjects and priorities.</small></div><span className="pill">Getting started</span></div></section><section className="grid">{cards.map(([icon,title,text])=><article className="feature" key={title}><span className="feature-icon">{icon}</span><h3>{title}</h3><p>{text}</p><a href="#">Open →</a></article>)}</section></main>;
}
