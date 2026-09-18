let current=null;function newDoc(type){current=type;document.getElementById('docType').textContent=type;document.getElementById('title').textContent=type+' — الرياضيات — 4AM';document.querySelector('.empty')?.remove();}function addExercise(btn){if(!current)newDoc('فرض');let list=document.getElementById('blocks');let b=document.createElement('div');b.className='block';b.innerHTML='<b>'+btn.parentElement.querySelector('b').textContent+'</b><span> / 5 نقاط</span><p contenteditable="true">نص التمرين قابل للتعديل داخل وثيقتك.</p>';list.appendChild(b);btn.textContent='✓ تمت الإضافة';btn.disabled=true}function filterExercises(){let q=document.getElementById('search').value.trim();document.querySelectorAll('#exerciseList article').forEach(x=>x.style.display=!q||x.innerText.includes(q)?'block':'none')}function studentVersion(){alert('في النسخة الإنتاجية: إنشاء نسخة مستقلة بدون الحلول.')}function solutionVersion(){alert('في النسخة الإنتاجية: إنشاء نسخة تصحيح مستقلة مع الحل والتنقيط.')}document.getElementById('search').addEventListener('input',filterExercises);
let assessmentItems=[];
function addSampleExercise(){
 const n=assessmentItems.length+1;
 assessmentItems.push({id:Date.now(),title:'تمرين '+String(n).padStart(2,'0'),points:5,statement:'نص التمرين قابل للتعديل قبل الاعتماد.',solution:'التصحيح النموذجي يضاف هنا.'});
 renderAssessment();
}
function removeAssessmentItem(id){assessmentItems=assessmentItems.filter(x=>x.id!==id);renderAssessment();}
function updatePoints(id,v){let x=assessmentItems.find(x=>x.id===id); if(x){x.points=Math.max(0,Number(v)||0);renderAssessment();}}
function renderAssessment(){
 const box=document.getElementById('selectedExercises'), totalEl=document.getElementById('totalPoints'), state=document.getElementById('pointsState');
 if(!assessmentItems.length){box.innerHTML='<div class="empty">لم تضف تمارين بعد.</div>';}
 else box.innerHTML=assessmentItems.map(x=>`<div class="selectedItem"><div class="row"><b>${x.title}</b><button onclick="removeAssessmentItem(${x.id})">حذف</button></div><p contenteditable="true">${x.statement}</p><label>النقاط <input type="number" min="0" step="0.5" value="${x.points}" onchange="updatePoints(${x.id},this.value)"></label></div>`).join('');
 const total=assessmentItems.reduce((a,x)=>a+Number(x.points||0),0);
 totalEl.textContent=total+' / 20';
 if(total===20){state.textContent='✓ مجموع التنقيط مضبوط على 20/20.';state.className='ok';}
 else {state.textContent=total<20?'المجموع أقل من 20 — أضف أو عدّل النقاط.':'المجموع تجاوز 20 — راجع التنقيط.';state.className='warn';}
}
function setAssessmentType(v){document.getElementById('docType').textContent=v;document.getElementById('title').textContent=v+' — الرياضيات — 4AM';}
function makePreview(title,showSolutions){
 const box=document.getElementById('previewBox');
 if(!assessmentItems.length){box.innerHTML='<p class="warn">أضف تمرينًا أولًا.</p>';return;}
 box.innerHTML='<div class="previewDoc"><h3>'+title+'</h3>'+assessmentItems.map((x,i)=>`<div class="block"><b>${x.title}</b><span> / ${x.points} نقاط</span><p>${x.statement}</p>${showSolutions?'<hr><b>التصحيح:</b><p>'+x.solution+'</p>':''}</div>`).join('')+'</div>';
}
function buildStudent(){makePreview('نسخة التلميذ — '+document.getElementById('assessmentType').value,false);}
function buildSolution(){makePreview('التصحيح النموذجي — '+document.getElementById('assessmentType').value,true);}
renderAssessment();
