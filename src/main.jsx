import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Activity, BarChart3, CalendarDays, Check, ChevronRight, Dumbbell,
  Flame, LayoutDashboard, Menu, Minus, Plus, Target, Trophy, Users, Wallet, X
} from 'lucide-react'
import './styles.css'

const stats = [
  ['Peso atual', '72,45 kg', 'Meta 75–77 kg'],
  ['Massa muscular', '36,2 kg', 'Acompanhar evolução'],
  ['Gordura corporal', '26,1%', 'Monitorar tendência'],
  ['Treinos', '5 dias/semana', 'Plano de hipertrofia'],
]

const workout = [
  { name: 'Puxador frontal', sets: '4', reps: '8–12', rir: 'RIR 2' },
  { name: 'Remada sentada', sets: '3', reps: '8–12', rir: 'RIR 2' },
  { name: 'Remada baixa', sets: '3', reps: '10–15', rir: 'RIR 1–2' },
  { name: 'Rosca direta', sets: '3', reps: '8–12', rir: 'RIR 2' },
  { name: 'Rosca martelo', sets: '3', reps: '10–12', rir: 'RIR 1–2' },
]

function Dashboard({ setActive }) {
  return <>
    <section className="hero">
      <div>
        <span className="pill">PROJETO RHINO</span>
        <h2>Disciplina hoje.<br/><span>Resultados amanhã.</span></h2>
        <p>Seu treino, sua evolução e seus objetivos em um só lugar.</p>
        <button className="primary" onClick={() => setActive('Meu Treino')}>
          Abrir treino <ChevronRight size={18}/>
        </button>
      </div>
      <img src="/rhino-logo.png" alt="" className="hero-logo"/>
    </section>

    <section className="stats">
      {stats.map(([title, value, note]) => <article key={title}>
        <p>{title}</p><strong>{value}</strong><small>{note}</small>
      </article>)}
    </section>

    <section className="grid">
      <article className="panel wide">
        <div className="panel-head"><div><p className="eyebrow">PRÓXIMO TREINO</p><h3>Segunda — Costas + Bíceps</h3></div><CalendarDays size={22}/></div>
        {workout.slice(0,3).map(ex => <div className="exercise" key={ex.name}>
          <div className="exercise-icon"><Dumbbell size={22}/></div>
          <div><strong>{ex.name}</strong><span>{ex.sets} séries × {ex.reps} reps</span></div><b>{ex.rir}</b>
        </div>)}
      </article>

      <article className="panel"><div className="panel-head"><div><p className="eyebrow">EVOLUÇÃO</p><h3>Meta de peso</h3></div><Target size={22}/></div>
        <div className="progress"><span style={{width:'62%'}}></span></div>
        <div className="progress-label"><strong>72,45 kg</strong><span>75–77 kg</span></div>
        <p className="muted">Acompanhe peso, cargas, medidas e composição corporal.</p>
      </article>

      <article className="panel"><div className="panel-head"><div><p className="eyebrow">GAMIFICAÇÃO</p><h3>Nível atual</h3></div><Trophy size={22}/></div>
        <div className="rank"><span>🐅</span><div><strong>TIGRE</strong><small>Próximo nível: RHINO</small></div></div>
        <div className="xp"><span>XP 7.240 / 10.000</span><b>72%</b></div>
      </article>
    </section>
  </>
}

function MeuTreino() {
  const [done, setDone] = useState([])
  const [loads, setLoads] = useState({})
  const completed = done.length
  const progress = Math.round((completed / workout.length) * 100)

  const changeLoad = (name, delta) => setLoads(prev => ({...prev, [name]: Math.max(0, Number(prev[name] || 0) + delta)}))

  return <section className="workout-page">
    <div className="workout-summary panel">
      <div><p className="eyebrow">TREINO A · HOJE</p><h2>Costas + Bíceps</h2><p className="muted">5 exercícios · hipertrofia · controle de carga</p></div>
      <div className="workout-percent"><strong>{progress}%</strong><span>concluído</span></div>
    </div>
    <div className="workout-progress progress"><span style={{width:`${progress}%`}}></span></div>

    <div className="exercise-list">
      {workout.map((ex, index) => {
        const isDone = done.includes(index)
        return <article className={isDone ? 'exercise-card done' : 'exercise-card'} key={ex.name}>
          <div className="exercise-card-top">
            <div className="exercise-number">{index + 1}</div>
            <div className="exercise-title"><strong>{ex.name}</strong><span>{ex.sets} séries × {ex.reps} reps · {ex.rir}</span></div>
            <button className={isDone ? 'check-btn checked' : 'check-btn'} onClick={() => setDone(prev => isDone ? prev.filter(i => i !== index) : [...prev,index])} aria-label="Concluir exercício"><Check size={19}/></button>
          </div>
          <div className="load-row">
            <span>Carga</span>
            <div className="load-control"><button onClick={() => changeLoad(ex.name,-2)}><Minus size={16}/></button><strong>{loads[ex.name] || 0} kg</strong><button onClick={() => changeLoad(ex.name,2)}><Plus size={16}/></button></div>
            <span className="load-note">Última sessão</span>
          </div>
        </article>
      })}
    </div>
    <button className="finish-btn" disabled={completed < workout.length} onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>{completed === workout.length ? 'Treino concluído ✓' : `Concluir todos os exercícios (${completed}/${workout.length})`}</button>
  </section>
}

function Placeholder({ title }) {
  const descriptions = {
    'Evolução':'Acompanhe peso, cargas, medidas e composição corporal.',
    'Metas':'Defina objetivos e acompanhe seu progresso.',
    'Conquistas':'Suas medalhas, níveis e desafios aparecerão aqui.',
    'Personal':'Área do Personal: alunos, prescrições e acompanhamento.',
    'Financeiro':'Controle de mensalidades, pagamentos e inadimplência.',
  }
  return <section className="placeholder panel"><Activity size={36}/><p className="eyebrow">RHINO 2.0</p><h2>{title}</h2><p>{descriptions[title]}</p><span>Esta área será construída na próxima etapa.</span></section>
}

function App() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('Dashboard')
  const nav = [['Dashboard', LayoutDashboard],['Meu Treino', Dumbbell],['Evolução', BarChart3],['Metas', Target],['Conquistas', Trophy],['Personal', Users],['Financeiro', Wallet]]

  return <div className="app">
    <aside className={open ? 'sidebar open' : 'sidebar'}>
      <div className="brand"><img src="/rhino-logo.png" alt="RHINO Meu Treino"/><div><strong>RHINO</strong><span>MEU TREINO</span></div><button className="close" onClick={() => setOpen(false)}><X size={20}/></button></div>
      <nav>{nav.map(([label, Icon]) => <button key={label} className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => {setActive(label);setOpen(false)}}><Icon size={19}/><span>{label}</span>{label === 'Personal' && <em>NOVO</em>}</button>)}</nav>
      <div className="sidebar-footer"><Flame size={18}/><span>DISCIPLINA • FOCO • RESULTADOS</span></div>
    </aside>

    <main>
      <header><button className="menu" onClick={() => setOpen(true)}><Menu size={22}/></button><div><p className="eyebrow">RHINO — MEU TREINO</p><h1>{active}</h1></div><div className="avatar">G</div></header>
      {active === 'Dashboard' ? <Dashboard setActive={setActive}/> : active === 'Meu Treino' ? <MeuTreino/> : <Placeholder title={active}/>} 
      <footer>RHINO — MEU TREINO · ESCOLHA VIVER SAUDÁVEL</footer>
    </main>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
