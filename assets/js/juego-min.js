(()=>{let e=[];const t=["C","D","H","S"],r=["J","Q","K","A"];let o=[];const a=document.querySelector("#nuevo-juego"),n=document.querySelector("#pedir-carta"),c=document.querySelector("#detener"),s=document.querySelectorAll("small"),l=document.querySelectorAll(".div-cartas"),d=(document.querySelector("#jugador-cartas"),document.querySelector("#computadora-cartas"),(t=2)=>{o=[],e=u();for(let e=0;e<t;e++)o.push(0);l.forEach((e=>e.innerText="")),s.forEach((e=>e.innerText=0)),n.disabled=!1,c.disabled=!1}),u=()=>{e=[];for(let o of t){for(let t=2;t<=10;t++)e.push(t+o);for(let t of r)e.push(t+o)}return _.shuffle(e)},i=()=>{if(0===e.length)throw"No hay más cartas en el Deck";return e.pop()},m=(e,t)=>(o[t]=o[t]+(e=>{const t=e.substring(0,e.length-1);return isNaN(t)?"A"===t?11:10:1*t})(e),s[t].innerText=o[t],o[t]),h=(e,t)=>{const r=document.createElement("img");r.src=`assets/cartas/${e}.webp`,r.classList="carta",l[t].append(r)},p=e=>{let t;do{const e=i();t=m(e,o.length-1),h(e,o.length-1)}while(t<e&&e<=21);setTimeout((()=>{const[e,t]=o;e>21?console.warn("Perdiste, Computadora Gana."):t>21?console.warn("Jugador Gana"):t>e&&t<=21?console.warn("Computadora Gana"):t==e&&console.warn("Empate")}),100)};n.addEventListener("click",(()=>{const e=i(),t=m(e,0);h(e,0),(t>21||21==t)&&(n.disabled=!0,c.disabled=!0,p(t))})),c.addEventListener("click",(()=>{n.disabled=!0,c.disabled=!0,p(o[0])})),a.addEventListener("click",(()=>{d()}))})();