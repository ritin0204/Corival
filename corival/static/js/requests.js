export {userData,compData, challengeData};
import {formatDate} from "./helper.js";
const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');
const userData = (username) => {
    $.ajax({
        url: `/rivals/${username}`,
        'X-CSRFToken': csrftoken,
        type: "GET",
        dataType : "json",
    })
    .done(function( json ) {
        if(json.profile_pic === null){json.profile_pic="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"}
        $("#profile-block").append(
            `<div class="cover-div">
            </div>
            <img class="profile-page-img" src="${json.profile_pic}" alt="Profile Image">
            <div class="profile-details">
                <h1>${json.first_name+" "+json.last_name}</h1>
                <div class="username">@${json.username}</div>
                <div class="smali-dates">
                    <small>Last Login : ${formatDate(json.last_login)}</small></br>
                    <small>Date joined : ${formatDate(json.date_joined)}</small>
                </div>
                <p><strong>Apptitude: </strong>${json.rating}</p>
                <p class="user-bio"> ${json.bio}</p>
            </div>`
        )
    })
    .fail(function( xhr, status, errorThrown ) {
    });
}
const compData = () =>{
    $.ajax({
        url: "/competitions/all",
        'X-CSRFToken': csrftoken,
        type: "GET",
        dataType : "json",
    })
    .done(function(competitions) {
        competitions.forEach(competition => {
            if(competition.archive){
                $("#archived-div").append(
                `<div class="card flex shadow hover">
                    <div class="comp-cover"></div>
                    <div class="card-body">
                        <h3>${competition.name}</h3>
                        <p><strong>TimeLine : </strong>${formatDate(competition.start_time)} - ${formatDate(competition.end_time)}</p>
                        <p>${(competition.description) ?competition.description:'No Description Avalible'}</p>
                    </div>
                    <button class="btn hover pink-btn " id="${competition.id}">View details</button>
                </div>`
                );
            }
            else{
                $("#ongoing-div").append(
                `<div class="card flex shadow hover">
                    <div class="comp-cover"></div>
                    <div class="card-body">
                        <h3>${competition.name}</h3>
                        <p><strong>TimeLine : </strong>${formatDate(competition.start_time)} - ${formatDate(competition.end_time)}</p>
                        <p>${(competition.description) ?competition.description:'No Description Avalible'}</p>
                    </div>
                    <button class="pink-btn btn hover" id="${competition.id}">View details</button>
                </div>`
                );
            }
        });
    })
    .fail(function( xhr, status, errorThrown ) {
    });
}
const challengeData = () =>{
    $.ajax({
        url: "/challenges/all",
        'X-CSRFToken': csrftoken,
        type: "GET",
        dataType : "json",
    })
    .done(function(challenges) {
        challenges.forEach(challenge => {
            console.log("Hello World!")
            console.log(challenge)
        });
    })
    .fail(function( xhr, status, errorThrown ) {
    });
}