export {userData,compData, challengeData, practiceData, updateProfile, getContest, deleteContest};
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
const renderCompPage = (type,compData)=>{
    $("#compPage").empty()
    if(type==="contest"){
        $("#compPage").append(
            `
            <div class="card compPageDiv flex">
              <h1>${compData.name}</h1>
              <span><strong>Start Time : </strong>${formatDate(compData.start_time)}</span>
              <span><strong>End Time : </strong>${formatDate(compData.end_time)}</span>
              <span><strong>Duration : </strong>${compData.duration}</span>
              <span><strong>Total Questions : </strong>${compData.no_of_questions}</span>
              <p><strong>Description : </strong>${compData.description}</p>
              <a><strong>Created By : </strong>@${compData.createdBy}</a>
            </div>
          `
        )
        if(compData.archive){
            $("#compPage").append("<div><strong>It's Archived!</strong></div>");
        }
        else{
            $("#compPage").append(
              ` <form action="{% url 'participate' '${compData.id}' %}" method="POST" class="flex flex-column">
                        <input id="userId" type="text" value="{{ request.user.username }}" hidden>
                        <input type="submit" class="btn btn-success hover shadow" value="Start Now">
                </form>`
            )
        }
    }
    // else if(type==="practice"){
        
    // }
    // else{
    //     //that means it's challenge

    // }
}
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
            `
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
                `<div class="card flex shadow">
                    <div class="card-body">
                        <h3>${competition.name}</h3>
                        <p><strong>TimeLine : </strong>${formatDate(competition.start_time)} - ${formatDate(competition.end_time)}</p>
                        <p>${(competition.description) ?competition.description:'No Description Avalible'}</p>
                    </div>
                    <button class="btn btn-info hover" id="contest-id" data-compId="${competition.id}">View</button>
                </div>`
                );
            }
            else{
                $("#ongoing-div").append(
                `<div class="card flex shadow">
                    <div class="card-body">
                        <h3>${competition.name}</h3>
                        <p><strong>TimeLine : </strong>${formatDate(competition.start_time)} - ${formatDate(competition.end_time)}</p>
                        <p>${(competition.description) ?competition.description:'No Description Avalible'}</p>
                    </div>
                    <button class="btn btn-info hover shadow" id="contest-id" data-compId="${competition.id}">View</button>
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
            if(challenge.finished){
                $("#past-chl-div").append(
                    `<div class="card flex shadow">
                        <div class="username-with-photo">
                            <div><img id="profile-with-user" class="profile-img" src="/Challengespage/challenge-cover.png"></div>
                            <div class="username">@nitesh</div>
                        </div>
                        <div class="card-body chl-body">
                            <h3>Wanna Play game ?</h3>
                            <p><strong>TimeLine : </strong>15 July 2022 - 17 July 2022</p>
                        </div>
                        <div class="chl-btn-div">
                            <button class="btn btn-info hover shadow">View details</button>
                        </div>
                    </div>`
                )
            }
            else {
                $("#current-chl-div").append(
                    `<div class="card flex shadow">
                        <div class="username-with-photo">
                            <div><img id="profile-with-user" class="profile-img" src="/Challengespage/challenge-cover.png"></div>
                            <div class="username">@nitesh</div>
                        </div>
                        <div class="card-body chl-body">
                            <h3>Wanna Play game ?</h3>
                            <p><strong>TimeLine : </strong>15 July 2022 - 17 July 2022</p>
                        </div>
                        <div class="chl-btn-div">
                            <button class="btn btn-success hover shadow">Accept</button>
                            <button class="btn btn-danger hover shadow"> Decline</button>
                        </div>
                    </div>`
                )
            }
        });
    })
    .fail(function( xhr, status, errorThrown ) {
    });
}
const practiceData = () =>{
    $.ajax({
        url: "/practices/all",
        'X-CSRFToken': csrftoken,
        type: "GET",
        dataType : "json",
    })
    .done(function(practices) {
        practices.forEach(practice => {
            if(practice.score === null){
                $("#active-practice").append(
                    `<div class="card shadow">
                        <div class="card-body practice-body">
                            <h3>#Practice-ID-${practice.id}</h3>
                            <strong>Total Questions : </strong>${practice.noOfQuestion}</br>
                            <strong>Duration : </strong>${practice.duration}
                        </div>
                        <div class="chl-btn-div">
                            <button class="btn btn-success hover shadow">Start Now</button>
                            <button class="btn btn-info hover shadow">View details</button>
                        </div>
                    </div>`
                    )
            }
            else{
                $("#previous-practice").append(
                    `<div class="card shadow">
                        <div class="card-body practice-body">
                            <h3>#Practice-ID-${practice.id}</h3>
                            <strong>Total Questions : </strong>${practice.noOfQuestion}</br>
                            <strong>Duration : </strong>${practice.duration}
                            <div>
                                <p class="score">${practice.score}%</p>
                                <div class="outer">
                                    <div class="inner" style="width:${practice.score}%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="chl-btn-div">
                            <button class="btn btn-info hover shadow">View details</button>
                        </div>
                    </div>`
                )
            }
        });
    })
    .fail(function( xhr, status, errorThrown ) {
    });
}
const updateProfile = (userData)=>{
    $.ajax({
        url: `/rivals/${userData.username}`,
        type:'PUT',
        headers: {'X-CSRFToken': csrftoken},
        data : userData,
        dataType:"json",
        'Content-Type': 'application/json'
    })
    .done(function(){
        alert("Your details Updated SuccessFully.")
        $("#profile-pic").click();
    })
    .fail(function(xhr, status, errorThrown){
        alert("couldn't Updated ! please try again later.")
        $("#profile-pic").click();
    })
}
const getContest = (compId)=>{
    $.ajax({
        url: `competition/${compId}`,
        type:'GET',
        headers: {'X-CSRFToken': csrftoken},
        dataType:"json",
    })
    .done(function(contest){
        //To render contest, practice and challenge by one function
        //first arg = contest,second arg = json data
        renderCompPage("contest",contest)
    })
    .fail(function(xhr, status, errorThrown){
    })
}
const deleteContest = (compId) =>{
    $.ajax({
        url: `/competition/${compId}`,
        type:'DELETE',
        headers: {'X-CSRFToken': csrftoken},
    })
    .done(function(){
        alert("Contest Deleted SuccessFully.")
    })
    .fail(function(xhr, status, errorThrown){
        alert("Deletion Failed ! please try again later.")
    })
}
