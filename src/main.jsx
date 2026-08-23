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

const weeklyWorkouts = [
  { day:'SEG', label:'Segunda', group:'Costas + Bíceps', focus:'Puxadas, remadas e bíceps', exercises:[
    {name:'Puxador frontal',sets:'4',reps:'8–12',rir:'RIR 2'},{name:'Remada sentada',sets:'3',reps:'8–12',rir:'RIR 2'},{name:'Remada baixa',sets:'3',reps:'10–15',rir:'RIR 1–2'},{name:'Rosca direta',sets:'3',reps:'8–12',rir:'RIR 2'},{name:'Rosca martelo',sets:'3',reps:'10–12',rir:'RIR 1–2'}]},
  { day:'TER', label:'Terça', group:'Peito + Tríceps', focus:'Peitoral, empurradas e tríceps', exercises:[
    {name:'Supino máquina',sets:'4',reps:'8–12',rir:'RIR 2'},{name:'Supino inclinado',sets:'3',reps:'8–12',rir:'RIR 2'},{name:'Crucifixo',sets:'3',reps:'10–15',rir:'RIR 1–2'},{name:'Tríceps pulley',sets:'3',reps:'10–12',rir:'RIR 2'},{name:'Tríceps francês',sets:'3',reps:'10–12',rir:'RIR 1–2'}]},
  { day:'QUA', label:'Quarta', group:'Pernas', focus:'Quadríceps, posteriores e glúteos', exercises:[
    {name:'Leg press',sets:'4',reps:'8–12',rir:'RIR 2'},{name:'Cadeira extensora',sets:'3',reps:'10–15',rir:'RIR 2'},{name:'Mesa flexora',sets:'3',reps:'10–15',rir:'RIR 1–2'},{name:'Stiff',sets:'3',reps:'8–12',rir:'RIR 2'},{name:'Panturrilha',sets:'4',reps:'12–15',rir:'RIR 1–2'}]},
  { day:'QUI', label:'Quinta', group:'Ombros + Abdômen', focus:'Deltoides, estabilidade e core', exercises:[
    {name:'Desenvolvimento máquina',sets:'4',reps:'8–12',rir:'RIR 2'},{name:'Elevação lateral',sets:'4',reps:'10–15',rir:'RIR 1–2'},{name:'Crucifixo inverso',sets:'3',reps:'10–15',rir:'RIR 2'},{name:'Abdominal máquina',sets:'3',reps:'12–15',rir:'RIR 2'},{name:'Prancha',sets:'3',reps:'30–45s',rir:'RIR 2'}]},
  { day:'SEX', label:'Sexta', group:'Full Body', focus:'Corpo inteiro e condicionamento', exercises:[
    {name:'Agachamento guiado',sets:'3',reps:'8–12',rir:'RIR 2'},{name:'Supino máquina',sets:'3',reps:'8–12',rir:'RIR 2'},{name:'Puxador frontal',sets:'3',reps:'8–12',rir:'RIR 2'},{name:'Elevação lateral',sets:'3',reps:'12–15',rir:'RIR 1–2'},{name:'Abdominal',sets:'3',reps:'12–15',rir:'RIR 2'}]},
  { day:'SÁB', label:'Sábado', group:'Recuperação', focus:'Mobilidade, caminhada e recuperação', exercises:[] },
  { day:'DOM', label:'Domingo', group:'Descanso', focus:'Recuperação para a próxima semana', exercises:[] },
]

const workout = weeklyWorkouts[0].exercises

function Dashboard({ setActive }) {
  return <>
    <section className="hero"><div><span className="pill">PROJETO RHINO</span><h2>Disciplina hoje.<br/><span>Resultados amanhã.</span></h2><p>Seu treino, sua evolução e seus objetivos em um só lugar.</p><button className="primary" onClick={() => setActive('Meu Treino')}>Abrir treino <ChevronRight size={18}/></button></div><img src="/rhino-logo.png" alt="" className="hero-logo"/></section>
    <section className="stats">{stats.map(([title,value,note]) => <article key={title}><p>{title}</p><strong>{value}</strong><small>{note}</small></article>)}</section>
    <section className="grid">
      <article className="panel wide"><div className="panel-head"><div><p className="eyebrow">PRÓXIMO TREINO</p><h3>Segunda — Costas + Bíceps</h3></div><CalendarDays size={22}/></div>{workout.slice(0,3).map(ex => <div className="exercise" key={ex.name}><div className="exercise-icon"><Dumbbell size={22}/></div><div><strong>{ex.name}</strong><span>{ex.sets} séries × {ex.reps} reps</span></div><b>{ex.rir}</b></div>)}</article>
      <article className="panel"><div className="panel-head"><div><p className="eyebrow">EVOLUÇÃO</p><h3>Meta de peso</h3></div><Target size={22}/></div><div className="progress"><span style={{width:'62%'}}></span></div><div className="progress-label"><strong>72,45 kg</strong><span>75–77 kg</span></div><p className="muted">Acompanhe peso, cargas, medidas e composição corporal.</p></article>
      <article className="panel"><div className="panel-head"><div><p className="eyebrow">GAMIFICAÇÃO</p><h3>Nível atual</h3></div><Trophy size={22}/></div><div className="rank"><span>🐅</span><div><strong>TIGRE</strong><small>Próximo nível: RHINO</small></div></div><div className="xp"><span>XP 7.240 / 10.000</span><b>72%</b></div></article>
    </section>
  </>
}

function MeuTreino() {
  const [selectedDay, setSelectedDay] = useState('SEG')
  const [done, setDone] = useState([])
  const [loads, setLoads] = useState({})
  const selected = weeklyWorkouts.find(item => item.day === selectedDay)
  const exercises = selected.exercises
  const completed = done.filter(key => key.startsWith(`${selectedDay}-`)).length
  const progress = exercises.length ? Math.round((completed / exercises.length) * 100) : 0
  const changeLoad = (name, delta) => { const key=`${selectedDay}-${name}`; setLoads(prev => ({...prev,[key]:Math.max(0,Number(prev[key]||0)+delta)})) }
  const toggleDone = name => { const key=`${selectedDay}-${name}`; setDone(prev => prev.includes(key) ? prev.filter(item => item !== key) : [...prev,key]) }

  return <section className="workout-page">
    <div className="weekly-header"><div><p className="eyebrow">PLANO SEMANAL</p><h2>Grupos de treino</h2><p className="muted">Escolha o dia para abrir o treino correspondente.</p></div><CalendarDays size={25}/></div>
    <div className="week-strip">{weeklyWorkouts.map(item => <button key={item.day} className={selectedDay === item.day ? 'day-btn active' : 'day-btn'} onClick={() => setSelectedDay(item.day)}><strong>{item.day}</strong><span>{item.group === 'Recuperação' ? 'REC' : item.group === 'Descanso' ? 'OFF' : item.group.split(' + ')[0]}</span></button>)}</div>
    <div className="workout-summary panel"><div><p className="eyebrow">{selected.label.toUpperCase()} · {selected.exercises.length ? 'TREINO' : 'RECUPERAÇÃO'}</p><h2>{selected.group}</h2><p className="muted">{selected.focus}</p></div><div className="workout-percent"><strong>{progress}%</strong><span>{exercises.length ? 'concluído' : 'descanso'}</span></div></div>
    {exercises.length ? <><div className="workout-progress progress"><span style={{width:`${progress}%`}}></span></div><div className="exercise-list">{exercises.map((ex,index) => { const key=`${selectedDay}-${ex.name}`; const isDone=done.includes(key); return <article className={isDone ? 'exercise-card done' : 'exercise-card'} key={ex.name}><div className="exercise-card-top"><div className="exercise-number">{index+1}</div><div className="exercise-title"><strong>{ex.name}</strong><span>{ex.sets} séries × {ex.reps} reps · {ex.rir}</span></div><button className={isDone ? 'check-btn checked' : 'check-btn'} onClick={() => toggleDone(ex.name)} aria-label="Concluir exercício"><Check size={19}/></button></div><div className="load-row"><span>Carga</span><div className="load-control"><button onClick={() => changeLoad(ex.name,-2)}><Minus size={16}/></button><strong>{loads[key] || 0} kg</strong><button onClick={() => changeLoad(ex.name,2)}><Plus size={16}/></button></div><span className="load-note">Registrar carga</span></div></article>})}</div><button className="finish-btn" disabled={completed < exercises.length} onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>{completed === exercises.length ? 'Treino concluído ✓' : `Concluir todos os exercícios (${completed}/${exercises.length})`}</button></> : <div className="rest-card panel"><span>{selected.day === 'DOM' ? '🛌' : '🧘'}</span><h3>{selected.group}</h3><p>{selected.focus}. Aproveite para recuperar e chegar melhor ao próximo treino.</p></div>}
  </section>
}

function Placeholder({ title }) { const descriptions={'Evolução':'Acompanhe peso, cargas, medidas e composição corporal.','Metas':'Defina objetivos e acompanhe seu progresso.','Conquistas':'Suas medalhas, níveis e desafios aparecerão aqui.','Personal':'Área do Personal: alunos, prescrições e acompanhamento.','Financeiro':'Controle de mensalidades, pagamentos e inadimplência.'}; return <section className="placeholder panel"><Activity size={36}/><p className="eyebrow">RHINO 2.0</p><h2>{title}</h2><p>{descriptions[title]}</p><span>Esta área será construída na próxima etapa.</span></section> }

function App() {
  const [open,setOpen]=useState(false),[active,setActive]=useState('Dashboard')
  const nav=[['Dashboard',LayoutDashboard],['Meu Treino',Dumbbell],['Evolução',BarChart3],['Metas',Target],['Conquistas',Trophy],['Personal',Users],['Financeiro',Wallet]]
  return <div className="app"><aside className={open?'sidebar open':'sidebar'}><div className="brand"><img src="/rhino-logo.png" alt="RHINO Meu Treino"/><div><strong>RHINO</strong><span>MEU TREINO</span></div><button className="close" onClick={()=>setOpen(false)}><X size={20}/></button></div><nav>{nav.map(([label,Icon])=><button key={label} className={active===label?'nav-item active':'nav-item'} onClick={()=>{setActive(label);setOpen(false)}}><Icon size={19}/><span>{label}</span>{label==='Personal'&&<em>NOVO</em>}</button>)}</nav><div className="sidebar-footer"><Flame size={18}/><span>DISCIPLINA • FOCO • RESULTADOS</span></div></aside><main><header><button className="menu" onClick={()=>setOpen(true)}><Menu size={22}/></button><div><p className="eyebrow">RHINO — MEU TREINO</p><h1>{active}</h1></div><div className="avatar">G</div></header>{active==='Dashboard'?<Dashboard setActive={setActive}/>:active==='Meu Treino'?<MeuTreino/>:<Placeholder title={active}/>}<footer>RHINO — MEU TREINO · ESCOLHA VIVER SAUDÁVEL</footer></main></div>
}

createRoot(document.getElementById('root')).render(<App />)
