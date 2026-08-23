/* RHINO MINDSET — banco inicial de mensagens diárias
 * As mensagens são escolhidas automaticamente por nível e pela data.
 * Para crescer o acervo, basta adicionar novos objetos às categorias abaixo.
 */
(function(){
  const BANK = {
    1: [
      {text:'Começar pequeno ainda é começar. O importante é não ficar parado.',author:'RHINO',type:'Disciplina'},
      {text:'A constância transforma um primeiro passo em uma nova história.',author:'RHINO',type:'Constância'},
      {text:'Não espere a motivação. Crie o hábito que a motivação acompanha.',author:'RHINO',type:'Foco'},
      {text:'Todo resultado que hoje parece distante começa com uma decisão.',author:'RHINO',type:'Evolução'},
      {text:'Você não precisa vencer o mês hoje. Precisa vencer o dia.',author:'RHINO',type:'Foco'},
      {text:'A melhor hora para cuidar da sua evolução é a hora em que você decide agir.',author:'RHINO',type:'Ação'}
    ],
    6: [
      {text:'A disciplina é fazer o que precisa ser feito, mesmo quando ninguém está olhando.',author:'RHINO',type:'Disciplina'},
      {text:'Você já saiu do começo. Agora proteja a consistência que construiu.',author:'RHINO',type:'Constância'},
      {text:'Progresso não exige perfeição. Exige repetição com intenção.',author:'RHINO',type:'Evolução'},
      {text:'Quando a vontade oscilar, deixe o compromisso assumir o comando.',author:'RHINO',type:'Foco'},
      {text:'A cada treino concluído, você fortalece também a pessoa que está se tornando.',author:'RHINO',type:'Identidade'},
      {text:'Não compare sua jornada. Compare sua disciplina de hoje com a de ontem.',author:'RHINO',type:'Superação'}
    ],
    11: [
      {text:'“Aquele que tem um porquê para viver pode suportar quase qualquer como.”',author:'Friedrich Nietzsche',type:'Propósito'},
      {text:'Seu nível não é um prêmio pelo que você fez. É um compromisso com o próximo nível.',author:'RHINO',type:'Evolução'},
      {text:'“Não é porque as coisas são difíceis que não ousamos; é porque não ousamos que parecem difíceis.”',author:'Sêneca',type:'Coragem'},
      {text:'Você já provou que consegue começar. Agora prove que consegue permanecer.',author:'RHINO',type:'Disciplina'},
      {text:'A força que aparece no espelho começa muito antes: na decisão de não desistir.',author:'RHINO',type:'Mentalidade'},
      {text:'A consistência silenciosa constrói resultados que a motivação sozinha nunca sustenta.',author:'RHINO',type:'Constância'},
      {text:'“Quem olha para fora sonha; quem olha para dentro desperta.”',author:'Carl Gustav Jung',type:'Reflexão'}
    ],
    16: [
      {text:'Você não está apenas treinando um corpo. Está treinando sua capacidade de cumprir a própria palavra.',author:'RHINO',type:'Identidade'},
      {text:'Alta performance começa quando disciplina deixa de ser esforço e passa a ser identidade.',author:'RHINO',type:'Performance'},
      {text:'“A vida exige de cada indivíduo uma contribuição, e depende do indivíduo descobrir qual.”',author:'Viktor Frankl',type:'Propósito'},
      {text:'O próximo nível não pede pressa. Pede precisão, consistência e coragem.',author:'RHINO',type:'Excelência'},
      {text:'Resultados extraordinários são construídos por decisões ordinárias repetidas com excelência.',author:'RHINO',type:'Excelência'},
      {text:'Quanto maior a jornada, mais importante fica lembrar por que você começou.',author:'RHINO',type:'Propósito'}
    ],
    21: [
      {text:'Seu maior adversário não é quem está ao lado. É a versão de você que aceita parar.',author:'RHINO',type:'Superação'},
      {text:'Excelência não é um momento. É o padrão que você decide sustentar.',author:'RHINO',type:'Excelência'},
      {text:'“O que importa não é o que acontece com você, mas como você reage ao que acontece.”',author:'Epicteto',type:'Mentalidade'},
      {text:'Força sem propósito é potência desperdiçada. Direcione sua evolução.',author:'RHINO',type:'Propósito'},
      {text:'O legado começa nas pequenas escolhas que ninguém aplaude.',author:'RHINO',type:'Legado'},
      {text:'Chegar longe é consequência. Permanecer inteiro durante a jornada é a verdadeira vitória.',author:'RHINO',type:'Legado'}
    ]
  };

  function getLevel(){
    const el=document.querySelector('.focus-top h3');
    const match=el && el.textContent.match(/NÍVEL\s+(\d+)/i);
    return match ? Number(match[1]) : 1;
  }

  function bucketFor(level){
    if(level>=21) return 21;
    if(level>=16) return 16;
    if(level>=11) return 11;
    if(level>=6) return 6;
    return 1;
  }

  function dayKey(){
    const d=new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }

  function choose(items,level,key){
    let hash=0;
    const seed=`${key}:${level}`;
    for(let i=0;i<seed.length;i++) hash=((hash<<5)-hash)+seed.charCodeAt(i)|0;
    return items[Math.abs(hash)%items.length];
  }

  function render(){
    const anchor=document.querySelector('.hero, .focus-page, .workout-page, .personal-page, .placeholder');
    if(!anchor || document.querySelector('.rhino-mindset')) return;
    const level=getLevel();
    const bucket=bucketFor(level);
    const key=dayKey();
    const message=choose(BANK[bucket],level,key);
    const node=document.createElement('section');
    node.className='rhino-mindset';
    node.innerHTML=`<div class="rhino-mindset-mark">🦏</div><div class="rhino-mindset-body"><div class="rhino-mindset-top"><span>RHINO MINDSET · MENSAGEM DO DIA</span><b>NÍVEL ${level}</b></div><blockquote>${message.text}</blockquote><div class="rhino-mindset-bottom"><span>— ${message.author}</span><em>${message.type}</em></div></div>`;
    anchor.parentNode.insertBefore(node,anchor);
    localStorage.setItem('rhino_mindset_date',key);
    localStorage.setItem('rhino_mindset_level',String(level));
  }

  function boot(){
    render();
    new MutationObserver(render).observe(document.getElementById('root'),{childList:true,subtree:true});
    window.setInterval(render,60000);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
