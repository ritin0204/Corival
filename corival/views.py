from django.http import JsonResponse
import json,datetime,random
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone
from django.db import IntegrityError
from django.shortcuts import redirect, render
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.decorators import login_required
from .models import Practice,User,Competition,CompResponse,Questions,Notifications

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        return render(request,'corival/index.html',{"username":request.user.username})
    return render(request,'corival/login.html')

@login_required
def get_user(request,username):
    try:
        user = User.objects.get(username=username)
        return render(request,"corival/profile.html",{"user":user.serialize()})
    except ObjectDoesNotExist:
        return render(request,"corival/error.html",{"error":"404: Username Not Found"})

@login_required
def notifications(request):
    alerts = Notifications.objects.filter(user=request.user.id)
    alerts.order_by('-created_time')
    return render(request,"corival/updates.html",{
        "notifications":[alert.serialize() for alert in alerts]
    })

@login_required
def competitions(request,type):
    now = timezone.now()
    contests = Competition.objects.all()
    if type == "all":
        return JsonResponse([contest.serialize() for contest in contests],status =200,safe=False)
    elif type == "ongoing":
        #need to fix
        return JsonResponse([contest.serialize() for contest in contests if contest.end_time > now],status =200,safe=False)
    elif type == "archived":
        for contest in contests:
            if contest.end_time <= now:
                contest.archive=True
                contest.save()
        return JsonResponse([contest.serialize() for contest in contests.filter(archive=True)],status=200,safe=False)
    elif type=="challenges":
        return JsonResponse([contest.serialize() for contest in contests.filter(is_challenge=True)],status =200,safe=False)
    else:
        return render(request,"corival/error.html",{"error":f"Invalid Type Of Contest! Are You Sure It's {type}"})

# @login_required
# def add_challenge(request):
    # pass
#if you creating challenge send value is_challenge = true and valid opponent id

@login_required
@csrf_exempt
def add_practice(request):
    if request.method == "POST":
        topics = request.POST.getlist('topics')
        no_of_questions = int(request.POST["noOfQuestions"])
        print(topics, no_of_questions)
        minutes = no_of_questions*1.75
        duration = datetime.timedelta(minutes=minutes)
        practice = Practice.objects.create(user=request.user,duration=duration,no_of_questions=no_of_questions)
        if topics == []:
            questions = Questions.objects.all()[0:no_of_questions+1]
        else:
            questions = Questions.objects.filter(category=str(topics[0]))
            #add [0:no_of_questions]
        for que in questions:
            practice.questions.add(que)
        practice.save()
        return render(request,"corival/quiz.html",{
            "comp":practice,
            "totalQuestions":practice.no_of_questions,
            "duration":practice.duration,
            "questions":[question.serialize() for question in questions]
        })
    else:
        return render(request,"corival/practice.html")

@login_required
@csrf_exempt
def result_practice(request,pracId):
    try:
        practice = Practice.objects.get(id=pracId)
    except:
        return render(request,"corival/error.html",{
            "error" : "No Such Session Found."
        })
    questions = practice.questions.all()
    if request.method=="POST":
        total = questions.count()
        userPoint = 0
        for que in questions:
            userAns = str(request.POST[str(que.id)])
            if str(que.right_answer)==userAns:
                userPoint+=1
        userScore = (userPoint//total)*100
        practice.score = userScore
        practice.save()
        update = Notifications.objects.create(message="You Appeared in Practice Session",message_url=f"practice/{practice.id}",user=request.user)
        update.save()
    if practice.score is None:
        return render(request,"corival/error.html",{
            "error" : "You Haven't Submitted Any Response."
        })
    return render(request,"corival/practiceResult.html",{
        "noOfQuestion":questions.count(),
        "practice" : practice,
        "questions" : [question.serialize() for question in questions]
    })

@login_required
@csrf_exempt
def add_contest(request):
    if request.method == "POST":
        name = request.POST["name"]
        createdBy = request.user
        start = request.POST["startTime"]
        end = request.POST["endTime"]
        description = request.POST["description"]
        no_of_questions = int(request.POST["noOfQuestions"])
        
        minutes = no_of_questions*1.75
        duration = datetime.timedelta(minutes=minutes)
        try:
            comp = Competition.objects.create(name=name,createdBy=createdBy,duration=duration,start_time=start,end_time=end,description=description,no_of_questions=no_of_questions)
            # upperLimit = Questions.objects.latest('id')
            #Edit to get random question for Contest
            # i=0
            # while(i<=no_of_questions):
            #     num = random.randint(0,upperLimit)
            #     try:
            #         que = Questions.objects.get(id=num)
            #     except Exception as e :
            #         print(e)
            #         continue
            #     else:
            #         comp.questions.add(que)
            #         i+=1
            questions = Questions.objects.all()[:no_of_questions]
            for que in questions:
                comp.questions.add(que)
            comp.save()
            return redirect('competition',comp.id)
        except Exception as e:
            print(e)
            return render(request,"corival/error.html",{"error":f"{str(e)}"})
    else:
        return render(request,"corival/createComp.html")

@login_required
@csrf_exempt
def all_Practices(request):
    practices = Practice.objects.filter(user=request.user.id)
    return JsonResponse([practice.serialize() for practice in practices],safe=False)

@login_required
def get_competition(request,compId):
    try:
        comp = Competition.objects.get(id=compId)
        attendees = CompResponse.objects.filter(compId=compId).exclude(userId=request.user.id)
        noOfAttendee = comp.participients.all().count()
        attendees = [attendee.serialize() for attendee in attendees]
        currentUser = CompResponse.objects.filter(compId=compId).filter(userId=request.user.id)
        if currentUser.count() == 0:
            return render(request,"corival/contest.html",{
                "comp":comp.serialize(),
                "noOfAttendee": noOfAttendee,
                "attendees":attendees
                })
        else:
            return render(request,"corival/contest.html",{
                "comp":comp.serialize(),
                "noOfAttendee": noOfAttendee,
                "attendees":attendees,
                "your":currentUser[0]
                })
    except ObjectDoesNotExist:
        return render(request,"corival/error.html",{"error":"404! Competition Not Found"})

@login_required
@csrf_exempt
def startContest(request,compId):
    try:
        comp = Competition.objects.get(id=compId)
    except ObjectDoesNotExist:
        return render(request,"corival/error.html",{"error":"404, competition Not Found"})
    else:
        questions = comp.questions.all()
        participient = request.user
        if request.method == "POST":
            givenExam = False
            attendees = comp.participients.all()
            for att in attendees:
                if str(att.username)==str(participient.username):
                    givenExam=True
            if givenExam:
                return render(request,"corival/error.html",{"error":"You Participated before on the Test!"})
            comp.participients.add(participient.id)
            comp.save()
            total = questions.count()
            userPoint = 0
            for que in questions:
                userAns = str(request.POST[str(que.id)])
                if str(que.right_answer)==userAns:
                    userPoint+=1
            userScore = (userPoint//total)*100
            try:
                response = CompResponse.objects.create(compId=comp,userId=participient,score=userScore)
                response.save()
            except IntegrityError:
                return render(request,"corival/error.html",{"error":"We Have Your Response Already! You don't have to worry."})
            update = Notifications.objects.create(message="You Participated in Contest!",message_url=f"competition/{comp.id}",user=participient)
            update.save()
            return redirect('competition',comp.id)
        else:
            givenExam = False
            attendees = comp.participients.all()
            for att in attendees:
                if str(att.username)==str(participient.username):
                    givenExam=True
            if not givenExam:
                return render(request,"corival/quiz.html",{
                    "comp" : comp,
                    "totalQuestions":comp.no_of_questions,
                    "duration":comp.duration,
                    "questions":[question.serialize() for question in questions]
                })
            else:
                return render(request,"corival/error.html",{"error":"You Already given the Test!"})

def login_view(request):
    if request.method =="POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username,password=password)
        if user is not None:
            login(request,user)
            return redirect('index')
        else:
            return render(request,'corival/login.html',{
                "error":"Invalid Username or password"
            })
    return render(request,'corival/login.html')

def register_view(request):
    if request.method == "POST":
        username = request.POST['username']
        email = request.POST['email']
        test_user = User.objects.filter(email=email).count()
        if test_user>0:
            return render(request,'corival/register.html',{
                "error":"This Email already exists, Try to login"
            })
        password = request.POST['password']
        confirm_pass = request.POST['confirm-pass']
        firstName = request.POST['firstName']
        lastName = request.POST['lastName']
        is_mg = request.POST['purpose']
        if confirm_pass != password :
            return render(request,'corival/register.html',{
                "error":"Your Password Should Match!"
            })
        try:
            user = User.objects.create_user(username,email,password)
            user.first_name = firstName
            user.last_name = lastName
            user.is_manager = is_mg
            user.save()
        except IntegrityError:
            user = User.objects.get(username=username)
            return render(request,'corival/register.html',{
                "error":"Username Already exists"
            })
        else:
            login(request,user)
            return redirect('index')
    return render(request,'corival/register.html')

def logout_view(request):
    logout(request)
    return redirect('index')

@csrf_exempt
def add_questions(request):
    if request.method=="POST":
        data = json.loads(request.body)
        question = data.get("statement","")
        op1 = data["op1"]
        op2 = data["op2"]
        op3 = data["op3"]
        op4 = data["op4"]
        rightans = data["right"]
        queType = data["queType"]
        que = Questions.objects.create(statement=question,options1=op1,options2=op2,options3=op3,options4=op4,right_answer=rightans,category=queType)
        return JsonResponse(que.serialize(),status=201)
    return JsonResponse({"Error":"POST Method Required"})
