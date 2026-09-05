const menuBtn=document.querySelector('.menu-btn');
const nav=document.querySelector('.nav');
menuBtn?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

document.getElementById('trip-form')?.addEventListener('submit', function(e){
  e.preventDefault();
  const data=new FormData(this);
  const text=`HIGH ROAD CUSTOM TRIP ENQUIRY\n\nName: ${data.get('name')}\nPhone: ${data.get('phone')}\nDestination: ${data.get('destination')||'Not specified'}\nDate: ${data.get('date')||'Not specified'}\nTravellers: ${data.get('travellers')||'Not specified'}\nStyle: ${data.get('style')||'Not specified'}\nMessage: ${data.get('message')||''}`;
  const message=document.getElementById('form-message');
  message.textContent='Your enquiry is ready. We will connect the form to WhatsApp/email in the next step.';
  console.log(text);
});
