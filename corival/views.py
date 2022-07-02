from django.http import Http404, HttpResponse, JsonResponse
import datetime
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.utils import timezone
from django.db import IntegrityError
from django.shortcuts import redirect, render
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import ChallengeSerializer, CompResponseSerializer, CompetitionSerializer, NotificationsSerializer, PracticeSerializer, QuestionsSerializer, UserSerializer
from .models import Challenges, Practice,User,Competition,CompResponse,Questions,Notifications
from .helper import getScore,getQuestions, notifyUser

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        return render(request,'corival/index.html',{"userImage":request.user.profile_pic})
    return render(request,'corival/index.html')

@login_required
@csrf_exempt
@api_view(['GET','POST','PUT','DELETE'])
def get_user(request,username):
    if request.method == "POST" and username=="register":
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            userObj = User.objects.get(username = serializer.data['username'])
            login(request,userObj)
            return redirect('index')
        return Response(serializer.errors, status=400)
    elif request.method == 'PUT':
        serializer = UserSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE':
        request.user.delete()
        return redirect('logout-view')
    else:
        if username=="register":
            return render(request,'corival/register.html')
        try:
            user = User.objects.get(username=username)
            userData = UserSerializer(instance=user,many=False)
            return JsonResponse(userData.data,status=201)
        except ObjectDoesNotExist:
            return render(request,"corival/error.html",{"error":f"404: There is No such username exists with name \"{username}\""})

@api_view(['GET'])
@login_required
def competitions(request,type):
    now = timezone.now()
    contests = Competition.objects.all()
    if type == "all":
        serializer = CompetitionSerializer(contests,many=True)
        return JsonResponse(serializer.data,status=200,safe=False)
    elif type == "ongoing":
        return JsonResponse([contest.serialize() for contest in contests if contest.end_time > now],status =200,safe=False)
    elif type == "archived":
        for contest in contests:
            if contest.end_time <= now:
                contest.archive=True
                contest.save()
        return JsonResponse([contest.serialize() for contest in contests.filter(archive=True)],status=200,safe=False)
    else:
        raise Http404("No such type Exists")

@login_required
@csrf_exempt
@api_view(['GET','POST','DELETE'])
def get_competition(request,compId):
    if compId != "create":
        try:
            compObj = Competition.objects.get(id=int(compId))
        except ObjectDoesNotExist:
            return JsonResponse({"error":"id not found"})
        except ValueError:
            return HttpResponse("invalid Url")

    if compId == "create" and request.method == "POST":
        if request.user.is_superuser or request.user.is_manager:
            no_of_questions = int(request.data["no_of_questions"])
            categorylist = []
            questionlist = getQuestions(no_of_questions,categorylist)
            attr = {
                "questions":questionlist,
                "duration":datetime.timedelta(minutes=no_of_questions*1.75),
                "createdBy":request.user.id,
                "participients":[]
            }
            request.data.update(attr)
            serializer = CompetitionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=200)
            return Response(serializer.errors,status=400)
        return Response({"Error":"You are forbidden to create competition"},status=403)

    elif request.method == "DELETE" and compObj.createdBy == request.user.id:
        compObj.delete()
        return redirect('index')

    elif request.method == "GET":
        if compId == "create":
            return HttpResponse("render competition create form here")
        else:
            serializer = CompetitionSerializer(compObj,many=False)
            return Response(serializer.data,status=200)

    else:
        return Response({"error":"Bad Request"},status=400)

#Operations of compResponse table
@login_required
@csrf_exempt
@api_view(["GET","POST"])
def participate(request,compId):
    try:
        compObj = Competition.objects.get(id=compId)
    except ObjectDoesNotExist:
        raise Http404("No object found")
    if request.method == "POST":
        if not compObj.archive:
            serializer = CompResponseSerializer({"compId":compObj.id,"userId":request.user.id})
            if serializer.is_valid():
                serializer.save()
                questions = compObj.questions.all()
                return render(request,"corival/quiz.html",{
                    "Obj" : compObj,
                    "questions":[question.serialize() for question in questions]
                })
            return Response(serializer.errors,status=400)
        return Response({"Error":"This Competition is Ended or your given time to complete assesmet is passed"},status=403)
    elif request.method == "GET":
        resObj = CompResponse.objects.get(compId=compId,userId=request.user.id)
        serializer = CompResponseSerializer(resObj,many=False)
        return Response(serializer.data,status=200)
    else:
        return Response({"Error":"Forbidden Method"},status=403)

@login_required
@csrf_exempt
@api_view(["PUT"])
def submit_contest(request,compId):
    try:
        compObj = Competition.objects.get(id=compId)
        resObj = CompResponse.objects.get(compId=compId,userId=request.user.id)
    except ObjectDoesNotExist:
        return Http404
    if request.method == "PUT":
        if not compObj.archive and datetime.datetime.now() <= compObj.start_time + compObj.duration+datetime.timedelta(minutes=5):
            compObj.participients.add(request.user.id)
            compObj.save()
            resObj.score = getScore(compId,request,"contest")
            resObj.save()
            return redirect('getCompetition',compObj.id)
        return Response({"Error":"This Competition is Ended or your given time to complete assesmet is passed"},status=403)
    return Response({"Error":"Forbidden Method"},status=403)

@login_required
@csrf_exempt
@api_view(["GET","POST","PUT","DELETE"])
def do_practice(request,pracId):
    if pracId != "create":
        try:
            pracObj = Practice.objects.get(id=int(pracId))
        except ObjectDoesNotExist:
            return render(request,"corival/error.html",{"error":f"404: There is No such practice exists with name \"{pracId}\""})
        except ValueError:
            return Http404
    else:
        return render(request,'corival/createPractice.html')
    if request.method == "POST" and pracId=="create":
        no_of_questions = request.data["no_of_questions"]
        attr = {
            "questions":getQuestions(no_of_questions,request.data["category"]),
            "user":request.user.id,
            "duration":datetime.timedelta(minutes=no_of_questions*1.75),
        }
        request.data.update(attr)
        serializer = PracticeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return redirect('do-practice',serializer.data["id"])
        return Response(serializer.errors, status=400)
    elif request.method == 'PUT':
        attr = {
            "id":pracId,
            "score":getScore(pracId,request,"practice")
        }
        request.data.update(attr)
        serializer = PracticeSerializer(pracObj, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data["score"],status=200)
        return Response(serializer.errors, status=400)
    elif request.method == 'DELETE' and pracObj.user == request.user.id:
        pracObj.delete()
        return redirect('index')
    else:
        pracData = PracticeSerializer(instance=pracObj,many=False)
        return Response(pracData.data,status=201)

@login_required
@csrf_exempt
@api_view(["GET"])
def start_practice(request,pracId):
    try:
        pracObj = Practice.objects.get(id = pracId)
    except ObjectDoesNotExist:
        return Response({"Error":"Invalid Id"},status=404)
    if request.user.id == pracObj.user and pracObj.score==None:
        serializer = PracticeSerializer(pracObj,many=False)
        questions = pracObj.questions.all()
        return render(request,"corival/quiz.html",{
            "Obj" : pracObj,
            "questions":[question.serialize() for question in questions],
            "is_practice":True
        })
        # return Response(serializer.data,status=200)
    else:
        return Response({"Error":"Bad request"},status=400)

@login_required
@csrf_exempt
@api_view(["POST"])
def create_challenge(request):
    if request.method == "POST":
        no_of_questions = int(request.data["no_of_questions"])
        categorylist = []
        questionlist = getQuestions(no_of_questions,categorylist)
        attr = {
            "questions":questionlist,
            "duration":datetime.timedelta(minutes=no_of_questions*1.75),
            "createdBy":request.user.id
        }
        request.data.update(attr)
        serializer = ChallengeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=200)
        return Response(serializer.errors,status=400)
    return Response({"Success":"display challenge create form"},status=200)

@login_required
@csrf_exempt
@api_view(["GET","PUT","DELETE"])
def get_challenge(request,challId):
    try:
        challObj = Challenges.objects.get(id=challId)
    except ObjectDoesNotExist:
        return Response({"Error":"Not Found"},status=400)
    if request.method == "GET" and challObj.finished:
        serializer = ChallengeSerializer(challObj,many=False)
        return Response(serializer.data,status=200)

    elif request.method == "PUT":
        result = getScore(challId,request,"challenge")
        if request.user.id == challObj.createdBy:
            challObj.user_score = result
        elif request.user.id == challObj.opponent:
            challObj.opponent_score = result
            challObj.finished = True
        else:
            return HttpResponse("You can't respond to someone elses challenge")
        challObj.save()
        return HttpResponse("Thank you Page")

    elif request.method == "DELETE" and request.user.id == challObj.user or request.user.id == challObj.opponent:
        challObj.delete()
        return Response({"success":"Decline the challenge"},status=200)
    
    else:
        return HttpResponse("bad request or Challenge haven't finished yet")

@login_required
@api_view(["GET"])
def all_challenge(request):
    if request.method == "GET":
        challenges = Challenges.objects.filter(finished=False).filter(opponent=request.user)
        serializer = ChallengeSerializer(challenges,many=True)
        return Response(serializer.data,status=200)
    return Response(serializer.data,status=400)

@login_required
@api_view(["GET"])
def search_user(request,username):
    user = User.objects.filter(username__startswith=username)
    userData = UserSerializer(instance=user,many=True)
    return Response(userData.data,status=201)

@login_required
@api_view(['GET'])
def get_scores(request,compId):
    scores = CompResponseSerializer(CompResponse.objects.filter(compId=compId),many=True)
    return Response(scores.data,status=201)

@login_required
@api_view(['GET'])
def notifications(request):
    updates = NotificationsSerializer(Notifications.objects.filter(user=request.user.id),many=True)
    return Response(updates.data,status=201)

@login_required
@csrf_exempt
def all_Practices(request):
    practices = Practice.objects.filter(user=request.user.id)
    return JsonResponse([practice.serialize() for practice in practices],safe=False)

@csrf_exempt
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

@csrf_exempt
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
@api_view(['GET','POST'])
def add_questions(request):
    if request.method=="POST":
        serializer = QuestionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
    elif request.method == "GET":
        return Response(QuestionsSerializer(Questions.objects.all(),many=True).data)
    else:
        return render(request,"corival/error.html",{"error":"400 : Invalid request"})