import"./hoisted.27333582.js";const e=document.querySelector("form"),t=document.getElementById("result");e?.addEventListener("submit",async s=>{s.preventDefault(),t.innerHTML="Please wait...";const a=new FormData(e),n=await fetch(e.action,{method:"POST",body:a});await n.json(),n.status===200?(e.reset(),t.innerHTML=`
        <div class="bg-green-100 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span class="block sm:inline">Thank you for your message! We'll get back to you soon.</span>
        </div>
      `):t.innerHTML=`
        <div class="bg-red-100 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span class="block sm:inline">Oops! Something went wrong. Please try again later.</span>
        </div>
      `,setTimeout(()=>{t.innerHTML=""},5e3)});
