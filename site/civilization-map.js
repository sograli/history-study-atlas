(()=>{
 const ns='http://www.w3.org/2000/svg';const layer=document.querySelector('#civilizationAreas'),dialog=document.querySelector('#civilizationDialog'),list=document.querySelector('#civilizationList');let current=1919;
 const yfmt=y=>y<0?`公元前 ${Math.abs(y)} 年`:y===0?'公元纪年前后':`${y} 年`;
 const svg=(name,attrs,parent)=>{const e=document.createElementNS(ns,name);for(const [k,v] of Object.entries(attrs))e.setAttribute(k,v);parent.append(e);return e};
 function render(y){current=Number(y);const active=civilizations.filter(c=>c.start<=current&&c.end>=current);document.querySelector('#civilizationCount').textContent=active.length;const frag=document.createDocumentFragment();list.replaceChildren();
  active.forEach(c=>{const x=(c.lon+180)/360*1000,y=(90-c.lat)/180*500;svg('ellipse',{cx:x,cy:y,rx:c.rx,ry:c.ry,fill:'url(#civilizationGlow)',class:'civilization-glow'},frag);const t=svg('text',{x:x,y:y,class:'civilization-name'},frag);t.textContent=c.name;
   const item=document.createElement('article');const heading=document.createElement('strong');heading.textContent=c.name;const years=document.createElement('span');years.textContent=`约 ${yfmt(c.start)}—${yfmt(c.end)}（本图分期）`;const p=document.createElement('p');p.textContent=c.detail;const a=document.createElement('a');a.textContent='参考资料';a.href=c.source;a.target='_blank';a.rel='noopener noreferrer';item.append(heading,years,p,a);list.append(item)});
  if(!active.length){const p=document.createElement('p');p.textContent='这一年代暂未标注精选文明；其他文明和人群仍可能存在。';list.append(p)}layer.replaceChildren(frag)
 }
 document.querySelector('#civilizationButton').addEventListener('click',()=>dialog.showModal());document.querySelector('.civilization-close').addEventListener('click',()=>dialog.close());window.updateCivilizations=render;render(Number(document.querySelector('#yearSlider').value));
})();
