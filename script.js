const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

function closeMenu(){
  nav?.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded','false');
  menuBtn?.setAttribute('aria-label','Open menu');
}
menuBtn?.addEventListener('click',()=>{
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('click', e=>{
  if(nav?.classList.contains('open') && !nav.contains(e.target) && !menuBtn?.contains(e.target)) closeMenu();
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeMenu(); });

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

document.getElementById('tawang-form')?.addEventListener('submit', function(e){
  e.preventDefault();
  const data = new FormData(this);
  const msg = document.getElementById('tawang-message');
  msg.textContent = 'Thanks! Your Tawang enquiry is captured in this prototype. WhatsApp/email delivery will be connected next.';
  console.log('TAWANG ENQUIRY', Object.fromEntries(data.entries()));
});


/* HIGH ROAD V5 TAWANG FORM
   Replace the value below with the HIGH ROAD business WhatsApp number,
   including country code, without + or spaces. Example: 919876543210 */
const HIGH_ROAD_WHATSAPP = "";

function buildTawangWhatsAppMessage(form){
  const data = new FormData(form);
  const lines = [
    "HIGH ROAD - Tawang Enquiry",
    "",
    `Name: ${data.get("name") || ""}`,
    `Phone / WhatsApp: ${data.get("phone") || ""}`,
    `Travel date: ${data.get("date") || "Flexible"}`,
    `Travellers: ${data.get("travellers") || "Not specified"}`,
    `Travel style: ${data.get("style") || "Not specified"}`,
    `Message: ${data.get("message") || "No additional message"}`
  ];
  return lines.join("\n");
}

const tawangForm = document.getElementById("tawang-form");
if(tawangForm){
  tawangForm.addEventListener("submit", function(e){
    e.preventDefault();
    const message = buildTawangWhatsAppMessage(tawangForm);
    const status = document.getElementById("tawang-message");
    if(!HIGH_ROAD_WHATSAPP){
      status.textContent = "Add HIGH_ROAD_WHATSAPP in script.js to activate direct WhatsApp enquiries.";
      status.style.color = "#12355B";
      return;
    }
    window.open(`https://wa.me/${HIGH_ROAD_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank");
    status.textContent = "Opening WhatsApp…";
  });
}

document.querySelectorAll('[data-trip]').forEach(function(button){
  button.addEventListener('click', function(){
    const style = document.querySelector('#tawang-form select[name="style"]');
    const message = document.querySelector('#tawang-form textarea[name="message"]');
    if(style && !style.value) style.value = "Road trip";
    if(message) message.value = `I'm interested in: ${button.dataset.trip}`;
  });
});


const contactForm = document.getElementById('contact-form');
if(contactForm){
  const params = new URLSearchParams(location.search);
  const service = params.get('service');
  if(service){ const field = contactForm.querySelector('[name="service"]'); if(field){ for(const option of field.options){ if(option.text === service) field.value = service; } } }
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(contactForm);
    const lines = [
      'HIGH ROAD ENQUIRY','',
      `Name: ${data.get('name')||''}`,
      `Phone / WhatsApp: ${data.get('phone')||''}`,
      `Service: ${data.get('service')||'Not specified'}`,
      `Destination: ${data.get('destination')||'Not specified'}`,
      `Date: ${data.get('date')||'Flexible'}`,
      `Travellers: ${data.get('travellers')||'Not specified'}`,
      `Message: ${data.get('message')||''}`
    ];
    highRoadSaveEnquiry('General contact', Object.fromEntries(data.entries()));
    window.open(`https://wa.me/919707635538?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
    const status=document.getElementById('contact-message');
    if(status) status.textContent='Opening WhatsApp…';
  });
}


/* HIGH ROAD V21: lightweight local enquiry tracker
   Saves enquiries on this browser/device only. No customer data is sent to a server. */
function highRoadSaveEnquiry(type, data){
  try{
    const key='highRoadEnquiries';
    const existing=JSON.parse(localStorage.getItem(key)||'[]');
    existing.unshift({
      id:'HR-'+Date.now().toString(36).toUpperCase(),
      createdAt:new Date().toISOString(),
      type:type,
      status:'New',
      ...data
    });
    localStorage.setItem(key, JSON.stringify(existing.slice(0,200)));
  }catch(err){ console.warn('HIGH ROAD enquiry tracker unavailable',err); }
}

/* HIGH ROAD V16: dedicated Plan Your Trip form */
const planForm = document.getElementById('plan-form');
if(planForm){
  planForm.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(planForm);
    const lines = [
      'HIGH ROAD - CUSTOM TRIP ENQUIRY','',
      `Name: ${data.get('name') || ''}`,
      `Phone / WhatsApp: ${data.get('phone') || ''}`,
      `Destination: ${data.get('destination') || 'Not specified'}`,
      `Travel date: ${data.get('date') || 'Flexible'}`,
      `Travellers: ${data.get('travellers') || 'Not specified'}`,
      `Trip style: ${data.get('style') || 'Not specified'}`,
      `Pickup / starting point: ${data.get('pickup') || 'Not specified'}`,
      `Message: ${data.get('message') || 'No additional message'}`
    ];
    highRoadSaveEnquiry('Custom trip', Object.fromEntries(data.entries()));
    window.open(`https://wa.me/919707635538?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
    const status = document.getElementById('plan-message');
    if(status) status.textContent = 'Opening WhatsApp with your enquiry…';
  });
}


/* HIGH ROAD V17: rental enquiry -> WhatsApp */
const rentalFormV17 = document.getElementById('rental-form-v17');
if(rentalFormV17){
  document.querySelectorAll('[data-rental-service]').forEach(function(link){
    link.addEventListener('click', function(){
      const service = link.getAttribute('data-rental-service');
      const select = rentalFormV17.querySelector('[name="service"]');
      if(select) select.value = service;
    });
  });

  rentalFormV17.addEventListener('submit', function(e){
    e.preventDefault();
    const data = new FormData(rentalFormV17);
    const lines = [
      'HIGH ROAD - RENTAL ENQUIRY','',
      `Name: ${data.get('name') || ''}`,
      `Phone / WhatsApp: ${data.get('phone') || ''}`,
      `Rental type: ${data.get('service') || 'Not specified'}`,
      `Rental date: ${data.get('date') || 'Not specified'}`,
      `Rental days: ${data.get('days') || 'Not specified'}`,
      `Pickup: ${data.get('pickup') || 'Not specified'}`,
      `Drop-off: ${data.get('dropoff') || 'Not specified'}`,
      `Destination / route: ${data.get('route') || 'Not specified'}`,
      `Requirements: ${data.get('message') || 'None'}`
    ];
    highRoadSaveEnquiry('Rental', Object.fromEntries(data.entries()));
    window.open(`https://wa.me/919707635538?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
    const status = document.getElementById('rental-message-v17');
    if(status) status.textContent = 'Opening WhatsApp with your rental enquiry…';
  });
}
