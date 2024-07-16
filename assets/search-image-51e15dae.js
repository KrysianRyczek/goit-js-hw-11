var g=Object.defineProperty;var y=(t,e,a)=>e in t?g(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var m=(t,e,a)=>(y(t,typeof e!="symbol"?e+"":e,a),a),d=(t,e,a)=>{if(!e.has(t))throw TypeError("Cannot "+a)};var u=(t,e,a)=>(d(t,e,"read from private field"),a?a.call(t):e.get(t)),h=(t,e,a)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,a)},p=(t,e,a,r)=>(d(t,e,"write to private field"),r?r.call(t,a):e.set(t,a),a);import{i as f,S as v}from"./vendor-0fc460d7.js";const l=document.querySelector("#search-image-form");var i;class b{constructor(e){h(this,i,void 0);m(this,"param",{key:"44950793-df63a62bcd1fce85415b89ba5",image_type:"photo",orientation:"horizontal",safesearch:!0,url:"https://pixabay.com/api/"});p(this,i,e)}get addres(){return this.param.url+"?key="+this.param.key+"&q="+u(this,i)+"&image_type="+this.param.image_type+"&orientation="+this.param.orientation+"&safesearch="+this.param.safesearch}}i=new WeakMap;const q=({webformatURL:t,largeImageURL:e,tags:a,likes:r,views:s,comments:o,downloads:n,...w})=>{const c=document.createElement("li");return c.classList.add("gallery-item"),c.innerHTML=`<a class="gallery-link" href="${e}">
            <img 
                class="gallery-image" 
                src="${t}" 
                alt="${a}"
                titel="oooo" 
            />
            <div class="box">
                <div class="box-item">
                    <h3>Likes</h3>
                    <p id="likes">${r}</p>
                </div>
                <div class="box-item">
                    <h3>Views</h3>
                    <p id="views">${s}</p>
                </div>
                <div class="box-item">
                    <h3>Comments</h3>
                    <p id="comments">${o}</p>
                </div>
                <div class="box-item">
                    <h3>Downloads</h3>
                    <p id="downloads">${n}</p>
                </div>
            </div>
        </a>`,c},L=t=>{const e=t.map(q),a=document.createDocumentFragment();return a.append(...e),a},S=(t,e)=>{document.querySelector(t).appendChild(L(e))};l.addEventListener("submit",t=>{t.preventDefault();const e=l.querySelector("#img").value.trim(),a=document.querySelector("#mesage");if(e===""&a===null&&l.insertAdjacentHTML("afterend",'<p id="mesage" class="message">Form field must be filled in!</p>'),e!==""){a!==null&&a.remove();const r=new b(e);document.querySelector("#gallery").hasChildNodes()&&document.querySelectorAll("#gallery > li").forEach(n=>{n.remove()});const s=document.querySelector("#loader");console.log(s),s.classList.add("loader"),fetch(r.addres).then(o=>{if(!o.ok)throw s.classList.remove("loader"),new Error(o.status);return s.classList.remove("loader"),o.json()}).then(o=>{if(o.total===0)return f.error({close:!1,position:"topCenter",progressBar:!1,backgroundColor:"red",messageColor:"white",timeout:5e3,message:"Sorry, there are no images matching your search query. Please try again!",transitionOut:"fadeOutUp"});S("ul.gallery",o.hits),new v("ul.gallery>li>a",{captions:!0,captionType:"attr",captionsData:"alt",captionPosition:"bottom",captionDelay:250,overlay:!0})}).catch(o=>{console.log(o)})}l.reset()});
//# sourceMappingURL=search-image-51e15dae.js.map
