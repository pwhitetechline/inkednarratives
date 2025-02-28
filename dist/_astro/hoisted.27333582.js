const s=document.getElementById("mobile-menu-button"),e=document.getElementById("mobile-menu");s&&e&&s.addEventListener("click",()=>{const i=s.getAttribute("aria-expanded")==="true";s.setAttribute("aria-expanded",(!i).toString()),i?(e.classList.add("opacity-0","scale-y-95"),e.classList.remove("opacity-100","scale-y-100"),setTimeout(()=>{e.classList.add("hidden")},300)):(e.classList.remove("hidden"),requestAnimationFrame(()=>{e.classList.add("opacity-100","scale-y-100"),e.classList.remove("opacity-0","scale-y-95")}));const t=s.querySelector("svg");t&&(i?(t.innerHTML=`
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
          `,t.classList.remove("rotate-90")):(t.innerHTML=`
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M6 18L18 6M6 6l12 12"
            />
          `,t.classList.add("rotate-90")))});
