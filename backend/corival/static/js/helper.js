export {showOnly, formatDate};
const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
}
const showOnly = (eleId) => {
    // Element that should disappear
    $(".hero-div").hide();
    $("#profile-block-div").hide();
    $("#comp-block").hide();
    $("#challenge-block").hide();
    $("#practice-block").hide();
    $("#edit-profile-block").hide();
    $("#compPage").hide();
    //Eleent to show
    $(eleId).show();
}