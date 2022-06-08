let startcontest = document.querySelector("#startcompetition")
document.addEventListener("DOMContentLoaded",()=>{
    document.querySelector("#startcompetition").addEventListener("click",()=> startCompetition(startcontest.value))
});
function loadIndexContent(type="all"){
    let listDiv = document.querySelector("#list-items")
    listDiv.innerHTML = ""
    let title = document.createElement('h2')
    title.innerHTML = type.toUpperCase()
    listDiv.append(title)
    let cardDiv = document.createElement('div')
    cardDiv.className = "card-div"
    if (type.toLowerCase()==='practice'){
        fetch('practices/all')
        .then(response => response.json())
        .then(results =>{
            console.log(results)
            results.forEach(item => {
                let card = document.createElement('div')
                card.className="card"
                card.innerHTML = 
                `
                <h3>Practice${item.id}</h3>
                <p><strong>Scored:</strong>:${item.score}</p>
                <p><strong>Total Questions:</strong>${item.noOfQuestion}</p>
                <div class="center">
                <a href="practice/${item.id}">View</a>
                <div>
                `
                cardDiv.append(card)
            });
            listDiv.append(cardDiv)
        })
    } else {
        fetch(`competitions/${type}`)
        .then(response => response.json())
        .then(results =>{
            results.forEach(item => {
                let card = document.createElement('div')
                card.className="card"
                card.innerHTML = 
                `
                <h3>${item.name}</h3>
                <p><strong>Created by</strong>:${item.createdBy}</p>
                <p><strong>Participients: </strong>${item.participients.length}</p>
                <div class="center">
                <a href="competition/${item.id}">View</a>
                <div>
                `
                cardDiv.append(card)
            });
            listDiv.append(cardDiv)
        })
    }
}
function clockWork(){
    let clockMinute = document.querySelector("#clockminute");
    let clockSec = document.querySelector("#clocksec");
    let min = clockMinute.textContent
    let sec = clockSec.textContent
    if(sec<=0){
        min-=1
        clockMinute.textContent = min
        clockSec.textContent = "60"
    }else{
        sec -=1
        clockSec.textContent = sec
    }
}
function startCompetition(totalQuestion){
    document.querySelector("#Instructions").style.display = "none"
    document.querySelector("#displayquestion").style.display="block";
    const totalTime = totalQuestion*105000;
    let totalSec = totalTime/1000
    let minutes = Math.floor(totalSec/60)
    let seconds = (totalSec%60)
    let clockMinute = document.querySelector("#clockminute");
    let clockSec = document.querySelector("#clocksec");
    clockMinute.textContent = minutes
    clockSec.textContent = seconds
    setInterval(() => {
        clockWork()
    }, 1000);
    setTimeout(() => {
        document.getElementById("quizform").submit();
    }, totalTime);
    console.log(totalQuestion)
}

//Create Contest method
function displayContestForm()
{
    document.querySelector("#createcontestsection").style.display = "flex"
    document.querySelector("#index").style.display = "none"
    document.querySelector("#list-items").style.display="none"
}
// // Add questions Using javaScript
// const question = {
//     'statement':"How Are you?",
//     'op1':"rp",
//     'op2':"we",
//     'op3':"yu",
//     "op4" : "gh",
//     "right":"yu",
//     "queType":'PR'
// }
// const options = {
//     method:"POST",
//     body:JSON.stringify(question)
// }
// fetch('/question/add',options)
//     .then(response=>response.json())
//     .then(result=>{
//         console.log(result)
//     })
