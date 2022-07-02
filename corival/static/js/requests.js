export {userData};
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
                    <small>Last Login : ${json.last_login}</small></br>
                    <small>Date joined : ${json.date_joined}</small>
                </div>
                <p><strong>Apptitude: </strong>${json.rating}</p>
                <p class="user-bio"> ${json.bio}</p>
            </div>`
        )
    })
    .fail(function( xhr, status, errorThrown ) {
    });
}