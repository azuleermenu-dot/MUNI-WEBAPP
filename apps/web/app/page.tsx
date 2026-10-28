'use client';

import { useState } from 'react';
import { MUNI_FEATURES, MUNI_SCHOOL } from '@muni/shared';

export default function Home() {
  const [active, setActive] = useState('planner');
  const feature = MUNI_FEATURES.find((item) => item.id === active) ?? MUNI_FEATURES[0];
  return (
    <main className="shell">
      <nav><strong>MUNI</strong><span>Study smarter. Stay ready.</span><button>Sign in</button></nav>
      <section className="hero">
        <div className="badge">{MUNI_SCHOOL}</div>
        <h1>Your school life,<br /><em>organized.</em></h1>
        <p>One student workspace for planning, assignments, exams, reviewers, flashcards, quizzes, and study sessions.</p>
        <div className="actions"><button className="primary">Get started</button><button className="secondary">Explore MUNI</button></div>
      </section>
      <section className="grid">{MUNI_FEATURES.map((item) => <button className={`feature ${active === item.id ? 'selected' : ''}`} key={item.id} onClick={() => setActive(item.id)}><div className="icon">{item.icon}</div><h2>{item.title}</h2><p>{item.description}</p></button>)}</section>
      <section className="workspace"><span className="badge">Student workspace</span><h2>{feature.icon} {feature.title}</h2><p>{feature.description}</p><button className="primary">Open {feature.title}</button></section>
      <footer><strong>MUNI</strong><span>Built for students. Open-source and adaptable for schools.</span></footer>
    </main>
  );
}
