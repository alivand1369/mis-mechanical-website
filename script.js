document.getElementById("year").textContent=new Date().getFullYear();
document.querySelector(".menu")?.addEventListener("click",()=>document.querySelector(".nav nav").classList.toggle("mobile-open"));

const logoUrl="/assets/mis-mechanical-logo-footer.png?v=2";
document.querySelector(".brand img")?.setAttribute("src",logoUrl);
document.querySelector(".footer>img")?.setAttribute("src",logoUrl);
const brandLogo=document.querySelector(".brand img");
if(brandLogo){brandLogo.style.width="190px";brandLogo.style.height="88px";brandLogo.style.objectFit="contain"}
const footerLogo=document.querySelector(".footer>img");
if(footerLogo){footerLogo.style.width="175px";footerLogo.style.height="150px";footerLogo.style.objectFit="contain"}

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

// Temporary sample names only; they are clearly marked as unverified until real customer reviews are supplied.
const sampleNames=["David Miller","Sarah Thompson","Michael Wilson","Emma Johnson","James Anderson","Olivia Brown","Daniel Smith","Sophia Taylor","Matthew Clark","Emily Davis","Andrew Martin","Jessica White","Christopher Lee","Hannah Walker","Ryan Harris","Lauren Lewis","Thomas Young","Megan Hall","Robert Allen","Rachel King","Kevin Wright","Samantha Scott","Jason Green","Nicole Baker","Brandon Adams","Jennifer Nelson","Mark Carter","Ashley Mitchell","Steven Roberts","Amanda Phillips","Brian Campbell","Lisa Evans","Ethan Parker","Nora Bennett","Ali Rezaei","Amir Hosseini"];
reviewCards.forEach((card,i)=>{
  const strong=card.querySelector("strong");
  const small=card.querySelector("small");
  if(strong)strong.textContent=sampleNames[i]||`Customer ${i+1}`;
  if(small)small.textContent="Sample customer — review not yet verified";
});