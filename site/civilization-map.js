(()=>{
 const dialog=document.querySelector('#civilizationDialog');
 const list=document.querySelector('#civilizationList');
 const region=document.querySelector('#civilizationRegion');
 let current=1919;
 const yfmt=y=>y<0?`公元前 ${Math.abs(y)} 年`:y===0?'公元纪年前后':`${y} 年`;
 function render(y){
  current=Number(y);
  const active=civilizations.filter(c=>c.start<=current&&c.end>=current);
  const shown=active.filter(c=>region.value==='全部'||c.region===region.value);
  document.querySelector('#civilizationCount').textContent=active.length;
  document.querySelector('#civilizationResultCount').textContent=`显示 ${shown.length} / ${active.length} 项`;
  list.replaceChildren();
  shown.forEach(c=>{
   const item=document.createElement('article');const heading=document.createElement('strong');heading.textContent=c.name;
   const years=document.createElement('span');years.textContent=`${c.region} · 约 ${yfmt(c.start)}—${yfmt(c.end)}（本图分期）`;
   const p=document.createElement('p');p.textContent=c.detail;
   const a=document.createElement('a');a.textContent='参考资料';a.href=c.source;a.target='_blank';a.rel='noopener noreferrer';
   item.append(heading,years,p,a);list.append(item);
  });
  if(!shown.length){const p=document.createElement('p');p.textContent=active.length?'这个地区在当前年代暂无收录，请选择其他地区。':'这一年代暂未收录精选文明；其他文明和人群仍可能存在。';list.append(p)}
 }
 document.querySelector('#civilizationButton').addEventListener('click',()=>dialog.showModal());
 document.querySelector('.civilization-close').addEventListener('click',()=>dialog.close());
 region.addEventListener('change',()=>render(current));
 window.updateCivilizations=render;
 render(Number(document.querySelector('#yearSlider').value));
})();
