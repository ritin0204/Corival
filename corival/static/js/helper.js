export {showOnly, formatDate};
const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric"}
    return new Date(dateString).toLocaleDateString(undefined, options)
}
const showOnly = (eleId) => {
    // Element that should disappear
    $(".hero-div").hide();
    $("#profile-block").hide();
    $("#comp-block").hide();
    $("#challenge-block").hide();
    //Eleent to show
    $(eleId).show();
}