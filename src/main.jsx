import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Activity, BarChart3, CalendarDays, ChevronRight, Dumbbell,
  Flame, LayoutDashboard, Menu, Target, Trophy, Users, Wallet, X
} from 'lucide-react'
import './styles.css'

const stats = [
  ['Peso atual', '72,45 kg', 'Meta 75–77 kg'],
  ['Massa muscular', '36,2 kg', 'Acompanhar evolução'],
  ['Gordura corporal', '26,1%', 'Monitorar tendência'],
  ['Treinos', '5 dias/semana', 'Plano de hipertrofia'],
]

function App() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('Dashboard')

  const nav = [
    ['Dashboard', LayoutDashboard],
    ['Meu Treino', Dumbbell],
    ['Evolução', BarChart3],
    ['Metas', Target],
    ['Conquistas', Trophy],
    ['Personal', Users],
    ['Financeiro', Wallet],
  ]

  return (
    <div className="app">
      <aside className={open ? 'sidebar open' : 'sidebar'}>
        <div className="brand">
          <img src="/rhino-logo.png" alt="RHINO Meu Treino" />
          <div>
            <strong>RHINO</strong>
            <span>MEU TREINO</span>
          </div>
          <button className="close" onClick={() => setOpen(false)}><X size={20}/></button>
        </div>

        <nav>
          {nav.map(([label, Icon]) => (
            <button
              key={label}
              className={active === label ? 'nav-item active' : 'nav-item'}
              onClick={() => { setActive(label); setOpen(false) }}
            >
              <Icon size={19}/>
              <span>{label}</span>
              {label === 'Personal' && <em>NOVO</em>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <Flame size={18}/>
          <span>DISCIPLINA • FOCO • RESULTADOS</span>
        </div>
      </aside>

      <main>
        <header>
          <button className="menu" onClick={() => setOpen(true)}><Menu size={22}/></button>
          <div>
            <p className="eyebrow">RHINO — MEU TREINO</p>
            <h1>{active}</h1>
          </div>
          <div className="avatar">G</div>
        </header>

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
          {stats.map(([title, value, note]) => (
            <article key={title}>
              <p>{title}</p>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <section className="grid">
          <article className="panel wide">
            <div className="panel-head">
              <div>
                <p className="eyebrow">PRÓXIMO TREINO</p>
                <h3>Segunda — Costas + Bíceps</h3>
              </div>
              <CalendarDays size={22}/>
            </div>
            <div className="exercise">
              <div className="exercise-icon"><Dumbbell size={22}/></div>
              <div><strong>Puxador frontal</strong><span>4 séries × 8–12 reps</span></div>
              <b>RIR 2</b>
            </div>
            <div className="exercise">
              <div className="exercise-icon"><Dumbbell size={22}/></div>
              <div><strong>Remada sentada</strong><span>3 séries × 8–12 reps</span></div>
              <b>RIR 2</b>
            </div>
            <div className="exercise">
              <div className="exercise-icon"><Dumbbell size={22}/></div>
              <div><strong>Remada baixa</strong><span>3 séries × 10–15 reps</span></div>
              <b>RIR 1–2</b>
            </div>
          </article>

          <article className="panel">
            <div className="panel-head">
              <div><p className="eyebrow">EVOLUÇÃO</p><h3>Meta de peso</h3></div>
              <Target size={22}/>
            </div>
            <div className="progress"><span style={{width:'62%'}}></span></div>
            <div className="progress-label"><strong>72,45 kg</strong><span>75–77 kg</span></div>
            <p className="muted">Acompanhe peso, cargas, medidas e composição corporal.</p>
          </article>

          <article className="panel">
            <div className="panel-head">
              <div><p className="eyebrow">GAMIFICAÇÃO</p><h3>Nível atual</h3></div>
              <Trophy size={22}/>
            </div>
            <div className="rank"><span>🐅</span><div><strong>TIGRE</strong><small>Próximo nível: RHINO</small></div></div>
            <div className="xp"><span>XP 7.240 / 10.000</span><b>72%</b></div>
          </article>
        </section>

        <footer>RHINO — MEU TREINO · ESCOLHA VIVER SAUDÁVEL</footer>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
