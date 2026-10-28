const cards = [
  ['📅', 'Study Planner', 'Organize today and plan the week ahead.'],
  ['📝', 'Assignments', 'Keep schoolwork and deadlines in one place.'],
  ['🎯', 'Exams', 'See upcoming exams before they sneak up on you.'],
  ['🧠', 'Flashcards', 'Review faster with your own study decks.'],
  ['❓', 'Quizzes', 'Test what you know and track your progress.'],
  ['📚', 'Reviewers', 'Keep your learning materials organized.'],
];

export default function Home() {
  return (
    <main className="shell">
      <nav><strong>MUNI</strong><span>Study smarter. Stay ready.</span><button>Sign in</button></nav>
      <section className="hero">
        <div className="badge">Minuyan National High School</div>
        <h1>Your school life,<br /><em>organized.</em></h1>
        <p>Plan your study time, remember every deadline, and prepare for exams with one simple student workspace.</p>
        <div className="actions"><button className="primary">Get started</button><button className="secondary">Explore MUNI</button></div>
      </section>
      <section className="grid">{cards.map(([icon, title, text]) => <article key={title}><div className="icon">{icon}</div><h2>{title}</h2><p>{text}</p></article>)}</section>
      <footer><strong>MUNI</strong><span>Built for students. Designed to be adapted by schools.</span></footer>
    </main>
  );
}
