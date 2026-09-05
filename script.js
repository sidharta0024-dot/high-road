const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

function closeMenu(){
  nav?.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded','false');
}
menuBtn?.addEventListener('click',()=>{
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',closeMenu));

document.querySelectorAll('[data-destination]').forEach(card=>{
  card.addEventListener('click',()=>{
    const select=document.getElementById('destination');
    if(select) select.value=card.dataset.destination;
  });
});
document.querySelectorAll('[data-tour]').forEach(link=>{
  link.addEventListener('click',()=>{
    const message=document.querySelector('[name="message"]');
    if(message) message.value=`I'm interested in the ${link.dataset.tour}.`;
  });
});

document.getElementById('trip-form')?.addEventListener('submit',function(e){
  e.preventDefault();
  const data=new FormData(this);
  const text=`HIGH ROAD CUSTOM TRIP ENQUIRY\n\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nDestination: ${data.get('destination')||'Not specified'}\nDate: ${data.get('date')||'Not specified'}\nTravellers: ${data.get('travellers')||'Not specified'}\nStyle: ${data.get('style')||'Not specified'}\nMessage: ${data.get('message')||''}`;
  const message=document.getElementById('form-message');
  message.textContent='Thanks! Your enquiry is captured in this prototype. WhatsApp/email delivery will be connected next.';
  console.log(text);
});
