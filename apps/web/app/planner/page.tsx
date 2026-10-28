'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '../../lib/supabase/browser';

type Task = { id: string; title: string; due_at: string | null; completed: boolean | null };

export default function Planner() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function load() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { window.location.assign('/login'); return; }
    const { data, error } = await supabase.from('tasks').select('id,title,due_at,completed').eq('user_id', user.id).order('due_at', { ascending: true, nullsFirst: false });
    if (error) setError(error.message); else setTasks(data ?? []);
  }

  useEffect(() => { load(); }, []);

  async function addTask(event: FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    setBusy(true); setError('');
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Please sign in again.');
      const { error } = await supabase.from('tasks').insert({ user_id: user.id, title: title.trim(), kind: 'assignment', completed: false });
      if (error) throw error;
      setTitle(''); await load();
    } catch (e) { setError(e instanceof Error ? e.message : 'Unable to add task.'); }
    finally { setBusy(false); }
  }

  async function toggle(task: Task) {
    const supabase = createClient();
    const { error } = await supabase.from('tasks').update({ completed: !task.completed }).eq('id', task.id);
    if (error) setError(error.message); else await load();
  }

  return <main className="shell">
    <header className="topbar"><div className="brand"><span>M</span><strong>MUNI</strong></div><Link href="/dashboard">← Dashboard</Link></header>
    <section className="page-head"><p className="eyebrow">PLANNER</p><h1>Study schedule</h1><p className="muted">Manage your own schoolwork and study priorities.</p></section>
    <form onSubmit={addTask} className="task-form"><input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Add an assignment or task…" aria-label="Task title"/><button disabled={busy}>{busy ? 'Adding…' : 'Add task'}</button></form>
    {error && <p className="error" role="alert">{error}</p>}
    <section className="planner-list">{tasks.length === 0 ? <div className="empty">No tasks yet. Add your first school task above.</div> : tasks.map(task => <button className={`task-row ${task.completed ? 'done' : ''}`} key={task.id} onClick={()=>toggle(task)}><span className="check">{task.completed ? '✓' : '○'}</span><span><strong>{task.title}</strong><small>{task.due_at ? new Date(task.due_at).toLocaleString('en-PH') : 'No deadline set'}</small></span></button>)}</section>
  </main>;
}
