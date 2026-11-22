/* Historical boundaries: Cliopatria (Seshat Global History Databank), CC BY 4.0.
   Uses the 2-decimal shards from stfn3000/world-history, further simplified to
   0.09 degree tolerance; relation and umbrella polygons are excluded. */
(()=>{
 const svgNS='http://www.w3.org/2000/svg';
 const layer=document.querySelector('#historicalPolities'), labels=document.querySelector('#historicalLabels');
 const status=document.querySelector('#boundaryStatus'), info=document.querySelector('#polityInfo');
 const palette=['#5f8770','#6e8b70','#688795','#808568','#8a796e','#678b83','#8c8367','#777d95','#728f78','#7f8d9b','#8b786f','#73908b'];
 const names={
  'Sumerian City-States':'苏美尔城邦','Indus Valley Civilization':'印度河流域文明','Elam':'埃兰','Early Dynastic Period of Egypt':'古埃及早王朝','Middle Kingdom of Egypt':'古埃及中王国','New Kingdom of Egypt':'古埃及新王国','Old Kingdom of Egypt':'古埃及古王国','Babylonian Empire':'巴比伦','Babylonia':'巴比伦','Neo-Assyrian Empire':'新亚述帝国','Assyria':'亚述','Achaemenid Empire':'波斯帝国','Scythia':'斯基泰','Greek City-States':'希腊城邦','Carthage':'迦太基','Kingdom of Kush':'库施王国','Macedonian Empire':'马其顿帝国','Seleucid Empire':'塞琉古帝国','Ptolemaic Kingdom':'托勒密王国','Maurya Empire':'孔雀帝国','Parthian Empire':'帕提亚帝国','Roman Republic':'罗马共和国','Roman Empire':'罗马帝国','Eastern Roman Empire':'东罗马帝国','Western Roman Empire':'西罗马帝国','Sasanian Empire':'萨珊波斯','Kushan Empire':'贵霜帝国','Gupta Empire':'笈多王朝','Kingdom of the Franks':'法兰克王国','Mongol Empire':'蒙古帝国','Mongol Khanate':'蒙古汗国','Mamluk Sultanate':'马穆鲁克苏丹国','Mali Empire':'马里帝国','Khmer Empire':'吴哥王朝','Ottoman Empire':'奥斯曼帝国','Holy Roman Empire':'神圣罗马帝国','Russian Empire':'俄罗斯帝国','Russian Republic':'俄罗斯共和国','Union of Soviet Socialist Republics':'苏联','Russian Federation':'俄罗斯联邦','British Empire':'大英帝国','British Colonial Empire':'英国殖民帝国','French Africa':'法属非洲','British Africa':'英属非洲','British Raj':'英属印度','Kingdom of France':'法兰西王国','French Fifth Republic':'法兰西第五共和国','United States of America':'美国','Republic of India':'印度共和国','Empire of Japan':'日本帝国','Japan':'日本','Canada':'加拿大','Republic of Brazil':'巴西','Brazilian Republic':'巴西共和国','Commonwealth of Australia':'澳大利亚联邦',
  'Xia':'夏','Shang Dynasty':'商','Zhou Dynasty':'周','Western Zhou':'西周','Eastern Zhou':'东周','Qin':'秦','Chu':'楚','Qi':'齐','Yan':'燕','Zhao':'赵','Wei':'魏','Han':'韩','Jin':'晋','Song':'宋','Lu':'鲁','Yue':'越','Wu':'吴','Cai':'蔡','Zheng':'郑','Cao':'曹','Chen':'陈','Teng':'滕','Han Dynasty':'汉朝','Xin Dynasty':'新朝','Western Jin':'西晋','Eastern Jin':'东晋','Northern Wei':'北魏','Sui Dynasty':'隋朝','Tang Dynasty':'唐朝','Northern Song':'北宋','Southern Song':'南宋','Liao Dynasty':'辽朝','Great Jin':'金朝','Jin Dynasty':'金朝','Western Xia':'西夏','Yuan Dynasty':'元朝','Ming Dynasty':'明朝','Qing Dynasty':'清朝','Xiongnu':'匈奴','Xianbei':'鲜卑','Western Göktürks':'西突厥','Eastern Göktürks':'东突厥','Tibetan Empire':'吐蕃','Republic of China':'中华民国','Kuomintang':'国民党政权','Communist Party of China':'中国共产党控制区','People\'s Republic of China':'中华人民共和国','Minyue':'闽越','Yuezhi':'月氏'
 };
 const yfmt=y=>y<0?'公元前 '+(-y)+' 年':y===0?'公元纪年前后':y+' 年';
 function color(name){let h=2166136261;for(let i=0;i<name.length;i++)h=Math.imul(h^name.charCodeAt(i),16777619);return palette[(h>>>0)%palette.length]}
 function display(name){return names[name]||name}
 function el(name,attrs,parent){const e=document.createElementNS(svgNS,name);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));parent.appendChild(e);return e}
 const indexPromise=fetch('history-boundaries/index.json').then(r=>{if(!r.ok)throw Error('index');return r.json()});
 const shardCache=new Map();
 function loadShard(id){if(!shardCache.has(id)){const p=fetch(`history-boundaries/shard-${id}.json`).then(r=>{if(!r.ok)throw Error(`shard ${id}`);return r.json()}).catch(e=>{shardCache.delete(id);throw e});shardCache.set(id,p)}return shardCache.get(id)}
 let requested=null,timer;
 async function draw(year){
  try{
   const index=await indexPromise;if(year!==requested)return;
   const rows=index.filter(r=>r[1]<=year&&year<=r[2]);
   const ids=[...new Set(rows.map(r=>r[4]))];
   const all=await Promise.all(ids.map(loadShard));if(year!==requested)return;
   const table=new Map(ids.map((id,i)=>[id,all[i]]));const ordered=rows.slice().sort((a,b)=>b[3]-a[3]);
   const frag=document.createDocumentFragment(), labelFrag=document.createDocumentFragment(),used=[];let count=0;
   for(const row of ordered){const [name,from,to,area,shard,id]=row;const geom=table.get(shard)?.[String(id)];if(!geom)continue;count++;
    const g=el('g',{},frag);const p=el('path',{d:geom[0],fill:color(name),'fill-rule':'evenodd',class:'historical-area',tabindex:'0',role:'button','aria-label':`${display(name)}，${yfmt(from)}至${yfmt(to)}，估算范围`},g);
    const title=el('title',{},p);title.textContent=`${display(name)} (${name}) · ${yfmt(from)}—${yfmt(to)} · 历史重建范围`;
    const choose=()=>{info.hidden=false;info.replaceChildren();const b=document.createElement('b');b.textContent=display(name);const small=document.createElement('small');small.textContent=`数据记录：${yfmt(from)}—${yfmt(to)} · 范围为估算`;info.append(b,small)};
    p.addEventListener('click',choose);p.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();e.stopPropagation();choose()}});
    const [x,y]=geom.slice(1);if(names[name]&&area>300000&&used.length<10&&x>45&&x<955&&y>35&&y<440&&used.every(u=>Math.hypot(x-u[0],y-u[1])>58)){const t=el('text',{x,y,class:'historical-label'},labelFrag);t.textContent=display(name);used.push([x,y])}
   }
   layer.replaceChildren(frag);labels.replaceChildren(labelFrag);info.hidden=true;
   status.textContent=year===1949?'1949 年资料未完整反映新中国成立后的变化':`历史政权：${count} 个 · 疆界为估算`;
  }catch(e){if(year!==requested)return;layer.replaceChildren();labels.replaceChildren();info.hidden=true;status.textContent='历史疆界加载失败，请刷新页面重试';console.error('History map failed',e)}
 }
 window.updateHistoricalMap=year=>{year=Number(year);if(year===requested)return;requested=year;clearTimeout(timer);layer.replaceChildren();labels.replaceChildren();info.hidden=true;status.textContent='历史疆界加载中…';timer=setTimeout(()=>draw(year),120)};
 window.updateHistoricalMap(Number(document.querySelector('#yearSlider').value));
})();
