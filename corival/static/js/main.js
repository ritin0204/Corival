import { showOnly} from "./helper.js";
import { userData } from "./requests.js";

showOnly(".hero-div");
document.querySelector('.menu-bar').addEventListener('click',() => {
    let navEle = document.querySelector('nav');
    navEle.classList.toggle("fullnav");
});
$("#profile-pic").on("click", ()=>{
    showOnly("#profile-block");
    $("#profile-block").empty()
    userData($("#userId").val());
});