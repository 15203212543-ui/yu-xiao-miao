(function(){
  const refreshOrders=()=>window.dispatchEvent(new Event('orders:refresh'));
  const refreshToday=()=>window.dispatchEvent(new Event('selected-day:refresh'));
  const date=document.getElementById('appointmentDate');
  if(date){date.onchange=refreshOrders;date.addEventListener('input',refreshOrders)}
  document.querySelectorAll('#statusFilter [data-status]').forEach(button=>{button.onclick=()=>{document.querySelectorAll('#statusFilter [data-status]').forEach(x=>x.classList.toggle('active',x===button));refreshOrders()}});
  document.querySelectorAll('[data-period]').forEach(button=>button.addEventListener('click',refreshOrders));
  document.querySelectorAll('[data-view="appointments"]').forEach(button=>button.addEventListener('click',()=>setTimeout(refreshOrders,80)));
  document.querySelectorAll('[data-view="today"],#prev,#next').forEach(button=>button.addEventListener('click',()=>setTimeout(refreshToday,80)));
})();
