import { showOnly} from "./helper.js";
import { userData, compData, challengeData } from "./requests.js";

showOnly(".hero-div");
window.onbeforeunload = () => window.scrollTo(0, 0);
if($("#profile-pic").attr('src')===''){
    $("#profile-pic").prop('src',"https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg")
}
document.querySelector('.menu-bar').addEventListener('click',() => {
    let navEle = document.querySelector('nav');
    navEle.classList.toggle("fullnav");
    let menuEle = document.querySelector('.menu-bar');
    menuEle.classList.toggle("full-menu");
});
$("#profile-pic").on("click", ()=>{
    showOnly("#profile-block");
    $("#profile-block").empty()
    userData($("#userId").val());
});
$("#comps-link").on("click", ()=>{
    showOnly("#comp-block");
    $(".card-div").empty()
    compData();
});
$("#challenge-link").on("click", ()=>{
    showOnly("#challenge-block");
    // $().empty();
    challengeData();
});