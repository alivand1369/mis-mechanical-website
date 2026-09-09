document.getElementById("year").textContent=new Date().getFullYear();
document.querySelector(".menu")?.addEventListener("click",()=>document.querySelector(".nav nav").classList.toggle("mobile-open"));

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