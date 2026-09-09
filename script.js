document.getElementById("year").textContent=new Date().getFullYear();
document.querySelector(".menu")?.addEventListener("click",()=>document.querySelector(".nav nav").classList.toggle("mobile-open"));

const logoUrl="/assets/mis-mechanical-logo-footer.png?v=6";
document.querySelector(".brand img")?.setAttribute("src",logoUrl);
document.querySelector(".footer>img")?.setAttribute("src",logoUrl);
const brandLogo=document.querySelector(".brand img");
if(brandLogo){brandLogo.style.width="190px";brandLogo.style.height="88px";brandLogo.style.objectFit="contain";brandLogo.style.filter="brightness(1.65) saturate(1.2) contrast(1.08)"}
const footerLogo=document.querySelector(".footer>img");
if(footerLogo){footerLogo.style.width="175px";footerLogo.style.height="150px";footerLogo.style.objectFit="contain";footerLogo.style.filter="brightness(1.8) saturate(1.2) contrast(1.08) drop-shadow(0 0 2px rgba(255,255,255,.18))"}

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