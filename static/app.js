const pages=document.querySelectorAll('.page');
const titles={overview:['Dashboard','Overview of college operations and recent activity.'],complaints:['Complaints','Track and manage department complaints.'],inventory:['Inventory Requests','Manage departmental inventory requests.'],reports:['Reports & Analytics','Department-wise performance and request analytics.'],departments:['Departments','College-wide department overview.'],settings:['Settings','Personalize language and display preferences.'],archives:['Archives','Deleted and completed records are stored here.']};
const gu={
'Management System':'વ્યવસ્થાપન સિસ્ટમ','MAIN MENU':'મુખ્ય મેનૂ','MANAGEMENT':'વ્યવસ્થાપન','Dashboard':'ડેશબોર્ડ','Dean Dashboard':'ડીન ડેશબોર્ડ','HOD Dashboard':'વિભાગાધ્યક્ષ ડેશબોર્ડ','Complaints':'ફરિયાદો','Inventory Requests':'સામગ્રી માંગણીઓ','Reports':'અહેવાલો','Reports & Analytics':'અહેવાલ અને વિશ્લેષણ','Departments':'વિભાગો','Settings':'સેટિંગ્સ','Logout':'લૉગઆઉટ','Overview of college operations and recent activity.':'કોલેજની કામગીરી અને તાજેતરની પ્રવૃત્તિનું અવલોકન.','Track and manage department complaints.':'વિભાગીય ફરિયાદો તપાસો અને સંચાલિત કરો.','Manage departmental inventory requests.':'વિભાગીય સામગ્રી માંગણીઓ સંચાલિત કરો.','Department-wise performance and request analytics.':'વિભાગવાર કામગીરી અને માંગણી વિશ્લેષણ.','College-wide department overview.':'સમગ્ર કોલેજના વિભાગોનું અવલોકન.','Personalize language and display preferences.':'ભાષા અને ડિસ્પ્લે પસંદગીઓ નક્કી કરો.','WELCOME BACK':'ફરી સ્વાગત છે','Monitor requests and activities across all departments.':'બધા વિભાગોની માંગણીઓ અને પ્રવૃત્તિઓનું નિરીક્ષણ કરો.','Manage requests and activities for your department.':'તમારા વિભાગની માંગણીઓ અને પ્રવૃત્તિઓ સંચાલિત કરો.','Total Complaints':'કુલ ફરિયાદો','Pending':'બાકી','Resolved':'ઉકેલાયેલ','Recent Complaints':'તાજેતરની ફરિયાદો','Click any complaint to preview full details.':'સંપૂર્ણ વિગતો માટે કોઈપણ ફરિયાદ પર ક્લિક કરો.','View All':'બધું જુઓ','Complaint Control Centre':'ફરિયાદ નિયંત્રણ કેન્દ્ર','Click a row to preview, update or manage the complaint.':'ફરિયાદ જોવા, સુધારવા અથવા સંચાલિત કરવા પંક્તિ પર ક્લિક કરો.','+ New Complaint':'+ નવી ફરિયાદ','All Status':'બધી સ્થિતિ','Inventory Control Centre':'સામગ્રી નિયંત્રણ કેન્દ્ર','Review inventory needs and current request status.':'સામગ્રીની જરૂરિયાતો અને માંગણી સ્થિતિ તપાસો.','+ New Request':'+ નવી માંગણી','Complaint ID':'ફરિયાદ ID','Request ID':'માંગણી ID','Department':'વિભાગ','Category':'શ્રેણી','Subject':'વિષય','Priority':'પ્રાથમિકતા','Status':'સ્થિતિ','Date':'તારીખ','Item':'વસ્તુ','Quantity':'જથ્થો','Under Review':'સમીક્ષા હેઠળ','Received':'પ્રાપ્ત','Approved':'મંજૂર','Rejected':'નકારેલ','Completed':'પૂર્ણ','Low':'ઓછી','Medium':'મધ્યમ','High':'ઉચ્ચ','Urgent':'તાત્કાલિક','Anatomy':'શરીરરચના વિજ્ઞાન','Physiology':'શરીરક્રિયા વિજ્ઞાન','Biochemistry':'જીવરસાયણ વિજ્ઞાન','Pathology':'રોગવિજ્ઞાન','Microbiology':'સૂક્ષ્મજીવ વિજ્ઞાન','Pharmacology':'ઔષધ વિજ્ઞાન','Equipment':'ઉપકરણ','IT':'આઈટી','Maintenance':'જાળવણી','Infrastructure':'માળખાકીય સુવિધા','Safety':'સલામતી','Other':'અન્ય','Department Management':'વિભાગ વ્યવસ્થાપન','Click a department to view its complaints.':'વિભાગની ફરિયાદો જોવા તેના પર ક્લિક કરો.','complaints':'ફરિયાદો','requests':'માંગણીઓ','Download Report':'અહેવાલ ડાઉનલોડ કરો','Complaint Resolution':'ફરિયાદ ઉકેલ','Inventory Approval':'સામગ્રી મંજૂરી','Approved requests':'મંજૂર માંગણીઓ','Departments Covered':'આવરી લેવાયેલા વિભાગો','Role-based visibility enabled':'ભૂમિકા આધારિત દૃશ્યતા સક્રિય છે','Interface Preferences':'ઇન્ટરફેસ પસંદગીઓ','Language':'ભાષા','Display Density':'ડિસ્પ્લે ઘનતા','Comfortable':'આરામદાયક','Compact':'સંકુચિત','Ask before deleting records':'રેકોર્ડ કાઢતા પહેલાં પુષ્ટિ પૂછો','Save Preferences':'પસંદગીઓ સાચવો','Secure Role-Based Access':'સુરક્ષિત ભૂમિકા આધારિત ઍક્સેસ','Your session and department permissions are protected.':'તમારું સત્ર અને વિભાગીય પરવાનગીઓ સુરક્ષિત છે.','Raise New Complaint':'નવી ફરિયાદ નોંધાવો','Description':'વર્ણન','Supporting PDF (Optional)':'આધાર PDF (વૈકલ્પિક)','Submit Complaint':'ફરિયાદ સબમિટ કરો','New Inventory Request':'નવી સામગ્રી માંગણી','Reason':'કારણ','Submit Inventory Request':'સામગ્રી માંગણી સબમિટ કરો','Dean Remarks':'ડીનની નોંધ','Delete':'કાઢી નાખો','Save Changes':'ફેરફારો સાચવો','Search complaints...':'ફરિયાદો શોધો...','Settings saved.':'સેટિંગ્સ સાચવવામાં આવી.','Record updated successfully.':'રેકોર્ડ સફળતાપૂર્વક અપડેટ થયો.','Record deleted.':'રેકોર્ડ કાઢી નાખ્યો.','Only PDF attachments are allowed.':'માત્ર PDF ફાઇલ જોડવાની મંજૂરી છે.','Archives':'આર્કાઇવ્સ','Deleted and completed records are stored here.':'કાઢી નાખેલા અને પૂર્ણ થયેલા રેકોર્ડ અહીં સંગ્રહિત છે.','Archived Complaints':'આર્કાઇવ કરેલી ફરિયાદો','Archived Inventory Requests':'આર્કાઇવ કરેલી સામગ્રી માંગણીઓ','Archive Reason':'આર્કાઇવ કારણ','Deleted':'કાઢી નાખેલ'};
let language=localStorage.getItem('erpLanguage')||'en', currentRecord=null, currentKind=null;
const original=new WeakMap();
function t(value){return language==='gu'?(gu[value]||value):value}
function applyLanguage(){
  document.documentElement.lang=language==='gu'?'gu':'en';
  document.querySelectorAll('[data-i18n]').forEach(el=>{if(!original.has(el))original.set(el,el.textContent.trim());el.textContent=t(original.get(el))});
  document.querySelectorAll('[data-value]').forEach(el=>el.textContent=t(el.dataset.value));
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>el.placeholder=t(el.dataset.i18nPlaceholder));
  document.querySelectorAll('option').forEach(el=>{if(!el.dataset.original)el.dataset.original=el.textContent.trim();el.textContent=t(el.dataset.original)});
  const active=document.querySelector('.page.active-page'); if(active) setHeader(active.id);
}
function setHeader(id){const pair=titles[id]||titles.overview;document.getElementById('page-title').textContent=t(pair[0]);document.getElementById('page-subtitle').textContent=t(pair[1])}
function showPage(id,filter){pages.forEach(p=>p.classList.toggle('active-page',p.id===id));document.querySelectorAll('.nav').forEach(n=>n.classList.toggle('active',n.dataset.page===id));setHeader(id);if(id==='complaints'&&filter){document.getElementById('complaint-status').value=filter;filterComplaints()}window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('[data-page]').forEach(n=>n.addEventListener('click',()=>showPage(n.dataset.page,n.dataset.filter)));
function updateClock(){document.getElementById('clock').textContent=new Intl.DateTimeFormat(language==='gu'?'gu-IN':'en-IN',{dateStyle:'medium',timeStyle:'short'}).format(new Date())}updateClock();setInterval(updateClock,30000);
function openModal(id){document.getElementById(id).classList.add('open')}
function closeModal(id){document.getElementById(id).classList.remove('open')}
function toast(message,error=false){const box=document.getElementById('toast');box.textContent=t(message);box.classList.toggle('error',error);box.classList.add('show');setTimeout(()=>box.classList.remove('show'),2800)}
window.openModal=openModal;window.closeModal=closeModal;
document.querySelectorAll('.api-form').forEach(form=>form.addEventListener('submit',async e=>{e.preventDefault();const button=form.querySelector('[type=submit]');button.disabled=true;try{const response=await fetch(form.action,{method:'POST',body:new FormData(form)});const data=await response.json();if(!response.ok)throw new Error(data.error);toast(data.message);setTimeout(()=>location.reload(),650)}catch(error){toast(error.message,true)}finally{button.disabled=false}}));
function detailRow(label,value){return `<div class="detail-row"><span>${t(label)}</span><strong>${value||'—'}</strong></div>`}
document.querySelectorAll('.record-row').forEach(row=>row.addEventListener('click',()=>{
  currentRecord=JSON.parse(row.dataset.record);currentKind=row.dataset.kind;
  document.getElementById('detail-title').textContent=`${currentRecord.id} • ${currentKind==='complaints'?t('Complaints'):t('Inventory Requests')}`;
  let html=detailRow('Department',t(currentRecord.department))+detailRow(currentKind==='complaints'?'Subject':'Item',currentKind==='complaints'?currentRecord.subject:currentRecord.item)+detailRow('Priority',t(currentRecord.priority))+detailRow('Status',t(currentRecord.status))+detailRow('Date',currentRecord.date)+detailRow(currentKind==='complaints'?'Description':'Reason',currentRecord.description||currentRecord.reason)+detailRow('Dean Remarks',currentRecord.remarks);
  if(currentRecord.attachment)html+=`<a class="attachment-link" target="_blank" href="/attachments/${encodeURIComponent(currentRecord.attachment)}">PDF • ${currentRecord.attachment.split('_').slice(1).join('_')}</a>`;
  document.getElementById('detail-content').innerHTML=html;
  const status=document.getElementById('detail-status'),remarks=document.getElementById('detail-remarks');
  if(status)status.value=currentRecord.status;if(remarks)remarks.value=currentRecord.remarks||'';
  const primary=document.getElementById('hod-primary-field'),secondary=document.getElementById('hod-secondary-field'),detail=document.getElementById('hod-detail-field'),priority=document.getElementById('hod-priority');
  if(primary){
    const complaint=currentKind==='complaints';
    document.getElementById('hod-primary-label').textContent=t(complaint?'Subject':'Item');
    document.getElementById('hod-secondary-label').textContent=t(complaint?'Category':'Quantity');
    document.getElementById('hod-detail-label').textContent=t(complaint?'Description':'Reason');
    secondary.type=complaint?'text':'number';secondary.min=complaint?'':'1';
    primary.value=complaint?currentRecord.subject:currentRecord.item;
    secondary.value=complaint?currentRecord.category:currentRecord.quantity;
    detail.value=complaint?currentRecord.description:currentRecord.reason;
    priority.value=currentRecord.priority;
  }
  openModal('detail-modal');
}));
async function mutate(method){
  if(!currentRecord)return;
  const options={method,headers:{'Content-Type':'application/json'}};
  if(method==='PATCH'){
    if(window.erpUser.role==='Dean')options.body=JSON.stringify({status:document.getElementById('detail-status').value,remarks:document.getElementById('detail-remarks').value});
    else{
      const primary=document.getElementById('hod-primary-field').value,secondary=document.getElementById('hod-secondary-field').value,detail=document.getElementById('hod-detail-field').value,priority=document.getElementById('hod-priority').value;
      options.body=JSON.stringify(currentKind==='complaints'?{subject:primary,category:secondary,description:detail,priority}:{item:primary,quantity:secondary,reason:detail,priority});
    }
  }
  const response=await fetch(`/api/${currentKind}/${currentRecord.id}`,options),data=await response.json();if(!response.ok)throw new Error(data.error);toast(data.message);setTimeout(()=>location.reload(),600)
}
document.getElementById('update-record')?.addEventListener('click',()=>mutate('PATCH').catch(e=>toast(e.message,true)));
document.getElementById('delete-record')?.addEventListener('click',()=>{const ask=localStorage.getItem('erpConfirmDelete')!=='false';if(!ask||confirm(language==='gu'?'શું તમે આ રેકોર્ડ કાઢવા માંગો છો?':'Delete this record?'))mutate('DELETE').catch(e=>toast(e.message,true))});
function filterComplaints(){const q=document.getElementById('complaint-search').value.toLowerCase(),status=document.getElementById('complaint-status').value;document.querySelectorAll('#complaints .record-row').forEach(row=>{const record=JSON.parse(row.dataset.record);row.hidden=!(JSON.stringify(record).toLowerCase().includes(q)&&(status==='all'||record.status===status))})}
document.getElementById('complaint-search').addEventListener('input',filterComplaints);document.getElementById('complaint-status').addEventListener('change',filterComplaints);
document.querySelectorAll('.department-card').forEach(card=>card.addEventListener('click',()=>{showPage('complaints');document.getElementById('complaint-search').value=card.dataset.department;filterComplaints()}));
const languageSelect=document.getElementById('language'),density=document.getElementById('density'),confirmDelete=document.getElementById('confirm-delete');languageSelect.value=language;density.value=localStorage.getItem('erpDensity')||'comfortable';confirmDelete.checked=localStorage.getItem('erpConfirmDelete')!=='false';document.body.classList.toggle('compact',density.value==='compact');
document.getElementById('save-settings').addEventListener('click',()=>{language=languageSelect.value;localStorage.setItem('erpLanguage',language);localStorage.setItem('erpDensity',density.value);localStorage.setItem('erpConfirmDelete',confirmDelete.checked);document.body.classList.toggle('compact',density.value==='compact');applyLanguage();updateClock();toast('Settings saved.')});
window.addEventListener('click',e=>{if(e.target.classList.contains('modal'))e.target.classList.remove('open')});
applyLanguage();
