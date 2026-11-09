function cart(){try{return JSON.parse(localStorage.getItem('familyai_cart')||'[]')}catch(e){return[]}}
function cartCount(){return cart().reduce((a,i)=>a+i.q,0)}
function syncCount(){document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=cartCount())}
function add(n,p){let c=cart(),x=c.find(i=>i.n===n);x?x.q++:c.push({n,p,q:1});localStorage.setItem('familyai_cart',JSON.stringify(c));syncCount();toast(n+' added to your family basket')}
function removeItem(n){let c=cart().filter(i=>i.n!==n);localStorage.setItem('familyai_cart',JSON.stringify(c));syncCount();renderCart()}
function filter(){let q=(document.getElementById('search')?.value||'').toLowerCase();document.querySelectorAll('#catalog article').forEach(x=>x.style.display=x.dataset.n.includes(q)?'':'none')}
function promptAI(t){if(!t)return;let i=document.getElementById('ai');if(i)i.value=t;toast('FamilyAI understood: '+t)}
function toast(t){let e=document.getElementById('toast');if(!e){e=document.createElement('div');e.id='toast';document.body.appendChild(e)}e.textContent=t;e.className='toast show';setTimeout(()=>e.className='toast',2800)}
function renderCart(){let box=document.getElementById('cart-list');if(!box)return;let c=cart();if(!c.length){box.innerHTML='<div class="empty">Your basket is empty. FamilyAI can build one for you.</div>';return}box.innerHTML=c.map(i=>`<div class="cart-row"><span>${i.n} × ${i.q}</span><b>₹${i.p*i.q}</b><button onclick="removeItem('${i.n}')">Remove</button></div>`).join('')}
function savePref(k,v){localStorage.setItem('familyai_'+k,v);toast('Family preference saved')}
function voiceDemo(){toast('🎙 Listening… “Add my usual Sunday chicken basket and organic vegetables.”');setTimeout(()=>toast('AI matched: chicken + meal ingredients + organic vegetables. Review before adding.'),1000)}
function warnSugar(){let e=document.getElementById('health-warning');if(e)e.classList.remove('hidden')}
function today(){let d=new Date(),h=d.getHours();document.querySelectorAll('[data-today]').forEach(e=>e.textContent=d.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'}).toUpperCase());document.querySelectorAll('[data-greeting]').forEach(e=>e.textContent=h<12?'Good morning':h<17?'Good afternoon':'Good evening')}
document.addEventListener('DOMContentLoaded',()=>{syncCount();renderCart();today()})
