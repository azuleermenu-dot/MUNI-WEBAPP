'use client';

import Link from 'next/link';

const features = [
  { icon: '📅', title: 'Study planner', description: 'Make a realistic study plan and keep your week organized.', href: '/planner' },
  { icon: '📝', title: 'Assignments', description: 'Keep homework and deadlines from slipping through the cracks.', href: '/login' },
  { icon: '🎯', title: 'Exams', description: 'See what is coming and give yourself time to prepare.', href: '/login' },
  { icon: '🧠', title: 'Flashcards', description: 'Create your own cards and review in short focused bursts.', href: '/login' },
  { icon: '❓', title: 'Quizzes', description: 'Practice with school-provided questions or make your own.', href: '/login' },
  { icon: '📚', title: 'Reviewers', description: 'Keep source materials and your personal notes together.', href: '/login' },
];

export default function Home() {
  return (
    <main className="shell landing">
      <header className="topbar">
        <Link href="/" className="brand"><span>M</span><strong>MUNI</strong></Link>
        <div className="nav-actions"><span className="school">Minuyan National High School</span><Link className="nav-link" href="/login">Sign in</Link><Link className="nav-cta" href="/signup">Get started <span aria-hidden="true">↗</span></Link></div>
      </header>
      <section className="hero landing-hero">
        <div className="hero-copy"><p className="eyebrow">YOUR STUDENT WORKSPACE</p><h1>Your school life,<br /><em>organized.</em></h1><p className="muted hero-description">One calmer place for your study plan, assignments, exams, flashcards, quizzes, and reviewers—so you can focus on learning, not remembering everything.</p><div className="actions"><Link className="button-primary" href="/signup">Start your workspace <span aria-hidden="true">→</span></Link><Link className="button-secondary" href="/login">I already have an account</Link></div><p className="hero-footnote">Built for students. Open-source and adaptable for schools.</p></div>
        <div className="hero-art" aria-label="A preview of a student study dashboard"><div className="art-window"><div className="art-window-top"><span></span><span></span><span></span><b>MY WEEK</b></div><div className="art-greeting">Small steps add up.</div><div className="art-subtitle">Your study plan</div><div className="art-progress"><i></i></div><div className="art-task"><span className="art-check">✓</span><div><b>Review biology notes</b><small>Today · 25 min</small></div></div><div className="art-task"><span className="art-check">○</span><div><b>Finish math practice</b><small>Today · 30 min</small></div></div><div className="art-stats"><div><small>STUDY STREAK</small><b>3 days 🔥</b></div><div><small>UP NEXT</small><b>Science quiz</b></div></div></div><div className="art-note">One task at a time. ✦</div></div>
      </section>
      <section className="features-section"><div className="section-title"><div><p className="eyebrow">MADE FOR REAL SCHOOL DAYS</p><h2>Everything in its place.</h2></div><span>One workspace · Your pace</span></div><div className="grid landing-grid">{features.map((feature, index) => <Link className="feature landing-feature" href={feature.href} key={feature.title}><div className="feature-top"><span className="feature-icon">{feature.icon}</span><span className="feature-number">0{index + 1}</span></div><h3>{feature.title}</h3><p>{feature.description}</p><span className="feature-arrow" aria-hidden="true">↗</span></Link>)}</div></section>
      <section className="campaign"><div><p className="eyebrow">MUNI BELIEVES</p><h2>We deserve a better<br />educational experience.</h2></div><Link href="/signup" className="button-primary">Build better habits <span aria-hidden="true">→</span></Link></section>
      <footer className="site-footer"><Link href="/" className="brand"><span>M</span><strong>MUNI</strong></Link><span>Made for students, with students in mind.</span><Link href="/login">Student sign in</Link></footer>
    </main>
  );
}
