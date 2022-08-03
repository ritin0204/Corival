from .models import Challenges, Competition,Practice,Questions

def getScore(compId,request,typeComp):
    if typeComp == "practice":
        obj = Practice.objects.get(id=compId)
    elif typeComp == "challenge":
        obj = Challenges.objects.get(id=compId)
    else:
        obj = Competition.objects.get(id=compId)
    questions = obj.questions.all()
    total = questions.count()
    userPoint = 0
    for que in questions:
        userAns = str(request.POST[str(que.id)])
        if str(que.right_answer)==userAns:
            userPoint+=1
    userScore = (userPoint//total)*100
    return userScore

def getQuestions(no_of_questions,categorylist=[]):
    #A little fix for categories
    if categorylist == []:
        question = Questions.objects.all()[:no_of_questions]
    else:
        question = Questions.objects.all()[:no_of_questions]
    questionlist = []
    for que in question:
        questionlist.append(que.id)
    return questionlist

def notifyUser():
    pass

def formToJson(formdata):
    ans = {}
    form_data = dict(formdata)
    dictData = formdata.dict()
    for i in dictData:
        ans[i] = dictData[i]
    ans['topics'] = form_data["topics"] if form_data.get("topics") else []   
    print(ans)
    return ans
