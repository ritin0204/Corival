import { showOnly} from "./helper.js";
import { userData, compData, challengeData, practiceData, updateProfile, getContest, deleteContest} from "./requests.js";

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
$("#home-link").on("click", ()=>{
    showOnly(".hero-div");
});
$("#profile-pic").on("click", ()=>{
    showOnly("#profile-block-div");
    $("#profile-block").empty()
    userData($("#userId").val());
});
$("#comps-link").on("click", ()=>{
    showOnly("#comp-block");
    $(".content-div").empty()
    compData();
});
$("#challenge-link").on("click", ()=>{
    showOnly("#challenge-block");
    $(".content-div").empty()
    challengeData();
});
$("#practice-link").on("click", ()=>{
    showOnly("#practice-block");
    $(".content-div").empty()
    practiceData()
});
$("#profile-link").on("click",()=>{
    showOnly("#profile-block-div");
    $("#profile-block").empty()
    userData($("#userId").val());
});
$("#edit-profile-btn").on("click",()=>{
    showOnly("#edit-profile-block")
});
$(".card-div").on("click","#contest-id",function(){
    showOnly("#compPage")
    getContest($(this).attr("data-compId"))
});
$("#updateForm").submit(function( event ) {
 
    // Stop form from submitting normally
    event.preventDefault();
    // Get values from elements on the page:
    let userValues = {
        "username": $("#userId").val(),
        "first_name": $("#firstName-input").val(),
        "last_name": $("#lastName-input").val(),
        "bio":$("#bio-input").val()
    }
    updateProfile(userValues);
    userValues = {}
});
$("#api-test-btn").on("click",()=>{
    console.log("working..")
    // participate in contest can be done by form
});