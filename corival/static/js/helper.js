export {showOnly};
const showOnly = (eleId) => {
    // Element that should disappear
    $(".hero-div").hide();
    $("#profile-block").hide();
    //Eleent to show
    $(eleId).show();
}