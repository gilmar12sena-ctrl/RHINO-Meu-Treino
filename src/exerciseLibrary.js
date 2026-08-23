export const exerciseLibrary = [
  {id:'puxador-frontal',name:'Puxador frontal',muscle:'Costas',movement:'Puxada vertical',equipment:'Polia',level:'Intermediário',goal:'Hipertrofia',alternatives:['barra-fixa','puxada-unilateral','puxada-articulada']},
  {id:'barra-fixa',name:'Barra fixa',muscle:'Costas',movement:'Puxada vertical',equipment:'Peso corporal',level:'Intermediário',goal:'Força/Hipertrofia',alternatives:['puxador-frontal','puxada-unilateral']},
  {id:'puxada-unilateral',name:'Puxada unilateral',muscle:'Costas',movement:'Puxada vertical',equipment:'Polia',level:'Intermediário',goal:'Hipertrofia',alternatives:['puxador-frontal','puxada-articulada']},
  {id:'puxada-articulada',name:'Puxada articulada',muscle:'Costas',movement:'Puxada vertical',equipment:'Máquina',level:'Intermediário',goal:'Hipertrofia',alternatives:['puxador-frontal','puxada-unilateral']},
  {id:'remada-sentada',name:'Remada sentada',muscle:'Costas',movement:'Remada horizontal',equipment:'Polia',level:'Iniciante',goal:'Hipertrofia',alternatives:['remada-articulada','remada-baixa']},
  {id:'remada-articulada',name:'Remada articulada',muscle:'Costas',movement:'Remada horizontal',equipment:'Máquina',level:'Intermediário',goal:'Hipertrofia',alternatives:['remada-sentada','remada-baixa']},
  {id:'remada-baixa',name:'Remada baixa',muscle:'Costas',movement:'Remada horizontal',equipment:'Polia',level:'Intermediário',goal:'Hipertrofia',alternatives:['remada-sentada','remada-articulada']},
  {id:'supino-maquina',name:'Supino máquina',muscle:'Peito',movement:'Empurrada horizontal',equipment:'Máquina',level:'Iniciante',goal:'Hipertrofia',alternatives:['supino-inclinado-maquina','supino-halteres']},
  {id:'supino-inclinado-maquina',name:'Supino inclinado máquina',muscle:'Peito',movement:'Empurrada horizontal',equipment:'Máquina',level:'Intermediário',goal:'Hipertrofia',alternatives:['supino-maquina','supino-halteres']},
  {id:'supino-halteres',name:'Supino com halteres',muscle:'Peito',movement:'Empurrada horizontal',equipment:'Halteres',level:'Intermediário',goal:'Hipertrofia',alternatives:['supino-maquina','supino-inclinado-maquina']},
  {id:'crucifixo',name:'Crucifixo máquina',muscle:'Peito',movement:'Adução horizontal',equipment:'Máquina',level:'Iniciante',goal:'Hipertrofia',alternatives:['crucifixo-cabo','crucifixo-halteres']},
  {id:'crucifixo-cabo',name:'Crucifixo na polia',muscle:'Peito',movement:'Adução horizontal',equipment:'Polia',level:'Intermediário',goal:'Hipertrofia',alternatives:['crucifixo','crucifixo-halteres']},
  {id:'leg-press',name:'Leg press',muscle:'Pernas',movement:'Empurrada de pernas',equipment:'Máquina',level:'Iniciante',goal:'Hipertrofia',alternatives:['agachamento-guiado','hack-machine']},
  {id:'agachamento-guiado',name:'Agachamento guiado',muscle:'Pernas',movement:'Agachamento',equipment:'Smith',level:'Intermediário',goal:'Hipertrofia',alternatives:['leg-press','hack-machine']},
  {id:'hack-machine',name:'Hack machine',muscle:'Pernas',movement:'Agachamento',equipment:'Máquina',level:'Intermediário',goal:'Hipertrofia',alternatives:['leg-press','agachamento-guiado']},
  {id:'cadeira-extensora',name:'Cadeira extensora',muscle:'Quadríceps',movement:'Extensão de joelho',equipment:'Máquina',level:'Iniciante',goal:'Hipertrofia',alternatives:['extensao-unilateral']},
  {id:'mesa-flexora',name:'Mesa flexora',muscle:'Posteriores',movement:'Flexão de joelho',equipment:'Máquina',level:'Iniciante',goal:'Hipertrofia',alternatives:['flexora-sentada']},
  {id:'desenvolvimento-maquina',name:'Desenvolvimento máquina',muscle:'Ombros',movement:'Empurrada vertical',equipment:'Máquina',level:'Iniciante',goal:'Hipertrofia',alternatives:['desenvolvimento-halteres']},
  {id:'elevacao-lateral',name:'Elevação lateral',muscle:'Ombros',movement:'Abdução',equipment:'Halteres',level:'Iniciante',goal:'Hipertrofia',alternatives:['elevacao-lateral-maquina','elevacao-lateral-polia']},
  {id:'elevacao-lateral-maquina',name:'Elevação lateral máquina',muscle:'Ombros',movement:'Abdução',equipment:'Máquina',level:'Iniciante',goal:'Hipertrofia',alternatives:['elevacao-lateral','elevacao-lateral-polia']},
  {id:'rosca-direta',name:'Rosca direta',muscle:'Bíceps',movement:'Flexão de cotovelo',equipment:'Barra',level:'Iniciante',goal:'Hipertrofia',alternatives:['rosca-maquina','rosca-polia']},
  {id:'rosca-martelo',name:'Rosca martelo',muscle:'Bíceps',movement:'Flexão de cotovelo',equipment:'Halteres',level:'Iniciante',goal:'Hipertrofia',alternatives:['rosca-martelo-polia']},
  {id:'triceps-pulley',name:'Tríceps pulley',muscle:'Tríceps',movement:'Extensão de cotovelo',equipment:'Polia',level:'Iniciante',goal:'Hipertrofia',alternatives:['triceps-maquina','triceps-frances']},
  {id:'triceps-frances',name:'Tríceps francês',muscle:'Tríceps',movement:'Extensão de cotovelo',equipment:'Halter',level:'Intermediário',goal:'Hipertrofia',alternatives:['triceps-pulley','triceps-maquina']}
]

export const getExercise = id => exerciseLibrary.find(x => x.id === id)
export const getAlternatives = id => { const ex=getExercise(id); return ex ? ex.alternatives.map(getExercise).filter(Boolean) : [] }
