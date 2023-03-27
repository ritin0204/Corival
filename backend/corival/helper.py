from .models import Challenges, Competition,Practice,Questions

# import requests
# from random import random
# from corival.models import Questions

# new_questions = []
# def get_questions():
#     data = requests.get("https://the-trivia-api.com/api/questions")
#     for i in data.json():
#         i["incorrectAnswers"].insert(int(random()*4),i["correctAnswer"])
#         new_questions.append(
#             {
#                 "statement": i["question"],
#                 "options1": i["incorrectAnswers"][0],
#                 "options2": i["incorrectAnswers"][1],
#                 "options3": i["incorrectAnswers"][2],
#                 "options4": i["incorrectAnswers"][3],
#                 "right_answer": i["correctAnswer"]
#             }
#         )
#     return new_questions
# for i in get_questions():
#     try:
#         Questions.objects.bulk_create([Questions(**i)])
#     except IntegrityError:
#         pass
#     else:
#         added = Questions.objects.all().count()
#         print(f"{added} questions added")

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
