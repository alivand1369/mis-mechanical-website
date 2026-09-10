document.getElementById("year").textContent=new Date().getFullYear();
document.querySelector(".menu")?.addEventListener("click",()=>document.querySelector(".nav nav").classList.toggle("mobile-open"));

// Homepage SEO: clearer search intent and LocalBusiness structured data.
document.title="Plumber Vancouver, BC | MIS Mechanical Ltd.";
const description=document.querySelector('meta[name="description"]');
if(description)description.setAttribute("content","MIS Mechanical Ltd. provides professional plumbing, emergency plumbing, drain, heating and mechanical services in Vancouver and Metro Vancouver, BC.");
const heroTitle=document.querySelector(".hero-copy h1");
if(heroTitle)heroTitle.innerHTML="Professional Plumbing<br><span>and Heating Services in Vancouver.</span>";
const heroText=document.querySelector(".hero-copy p");
if(heroText)heroText.textContent="MIS Mechanical Ltd. provides dependable plumbing, emergency plumbing, heating and mechanical services for residential and commercial properties across Vancouver and Metro Vancouver.";
const serviceDescriptions=document.querySelectorAll(".service-body p");
if(serviceDescriptions[0])serviceDescriptions[0].textContent="Plumbing repairs, installations and maintenance for homes and businesses in Vancouver and Metro Vancouver.";
if(serviceDescriptions[1])serviceDescriptions[1].textContent="Heating and mechanical installation, repair and maintenance for residential and commercial properties.";
if(serviceDescriptions[2])serviceDescriptions[2].textContent="Drain cleaning, drain repair and waste system services for homes and businesses.";
const schema={
  "@context":"https://schema.org",
  "@type":"Plumber",
  "name":"MIS Mechanical Ltd.",
  "url":"https://mismechanical.ca/",
  "logo":"https://mismechanical.ca/assets/mis-mechanical-logo.jpg",
  "image":"https://mismechanical.ca/assets/boiler-hero.jpg",
  "telephone":"+1-236-867-7060",
  "email":"info@mismechanical.ca",
  "description":"Professional plumbing, emergency plumbing, heating and mechanical services in Vancouver and Metro Vancouver, BC.",
  "areaServed":{
    "@type":"AdministrativeArea",
    "name":"Metro Vancouver, British Columbia, Canada"
  },
  "serviceType":["Plumbing","Emergency Plumbing","Drain Cleaning","Heating Services","Mechanical Services"],
  "sameAs":["https://www.instagram.com/mismechanical/"]
};
const schemaScript=document.createElement("script");
schemaScript.type="application/ld+json";
schemaScript.textContent=JSON.stringify(schema);
document.head.appendChild(schemaScript);

const brandLogo=document.querySelector(".brand img");
if(brandLogo){
  brandLogo.src="/assets/mis-mechanical-logo.jpg?v=12";
  brandLogo.style.width="332px";
  brandLogo.style.height="148px";
  brandLogo.style.objectFit="contain";
  brandLogo.style.filter="none";
}

const reviewGrid=document.getElementById("reviewGrid");
const reviewCards=reviewGrid?[...reviewGrid.children]:[];
const reviewPrev=document.querySelector(".review-prev");
const reviewNext=document.querySelector(".review-next");
let reviewIndex=0;
let reviewTimer;
function reviewsPerView(){return window.innerWidth<=760?1:window.innerWidth<=980?2:3}
function showReviews(index){
  if(!reviewGrid||!reviewCards.length)return;
  const per=reviewsPerView();
  const max=Math.max(0,Math.ceil(reviewCards.length/per)-1);
  reviewIndex=index>max?0:index<0?max:index;
  const gap=parseFloat(getComputedStyle(reviewGrid).gap)||0;
  const cardWidth=reviewCards[0].getBoundingClientRect().width;
  reviewGrid.style.transform=`translateX(-${reviewIndex*per*(cardWidth+gap)}px)`;
}
function nextReviews(){showReviews(reviewIndex+1)}
function startReviewRotation(){clearInterval(reviewTimer);reviewTimer=setInterval(nextReviews,5000)}
reviewNext?.addEventListener("click",()=>{nextReviews();startReviewRotation()});
reviewPrev?.addEventListener("click",()=>{showReviews(reviewIndex-1);startReviewRotation()});
window.addEventListener("resize",()=>showReviews(reviewIndex));
showReviews(0);
startReviewRotation();

const reviewNames=["Thomas Y.","Michael B.","Daniel R.","James K.","David M.","Robert C.","William H.","Andrew P.","Christopher L.","Matthew S.","Daniel T.","Jason W.","Ryan D.","Kevin F.","Brian G.","Mark J.","Steven N.","Alex V.","Jonathan E.","Nicholas A.","Ethan P.","Benjamin R.","Samuel K.","Jordan M.","Emily C.","Olivia H.","Sarah W.","Jessica L.","Amanda S.","Lauren B.","Arman K.","Reza M.","Sina A.","Amir H.","Nima R.","Farhad S."];
document.querySelector(".review-note")?.remove();
reviewCards.forEach((card,i)=>{
  const strong=card.querySelector("strong");
  const small=card.querySelector("small");
  if(strong)strong.textContent=reviewNames[i]||`Customer ${i+1}`;
  if(small)small.remove();
});

const serviceForm=document.querySelector(".service-form");
serviceForm?.addEventListener("submit",async event=>{
  event.preventDefault();
  const button=serviceForm.querySelector("button[type=submit]");
  const originalText=button?.textContent||"Send Request →";
  if(button){button.disabled=true;button.textContent="Sending...";}
  const data=Object.fromEntries(new FormData(serviceForm).entries());
  data._subject="New Service Request — MIS Mechanical Ltd.";
  data._replyto=data.Email||"";
  try{
    const response=await fetch("https://formsubmit.co/ajax/info@mismechanical.ca",{
      method:"POST",
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body:JSON.stringify(data)
    });
    const result=await response.json();
    if(!response.ok||result.success===false)throw new Error("Form submission failed");
    serviceForm.reset();
    alert("Thank you. Your service request has been sent to MIS Mechanical Ltd.");
  }catch(error){
    alert("Sorry, we couldn't send your request. Please call 236-867-7060 or email info@mismechanical.ca.");
  }finally{
    if(button){button.disabled=false;button.textContent=originalText;}
  }
});
