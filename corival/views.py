from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
from django.shortcuts import render
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from django.middleware.csrf import get_token


from rest_framework import viewsets
from .serializers import *
from .models import *


# Create your views here.
class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    

class CandidateViewSet(viewsets.ModelViewSet):
    serializer_class = CandidateSerializer
    queryset = Candidate.objects.all()
    
    
class RecruiterViewSet(viewsets.ModelViewSet):
    serializer_class = RecruiterSerializer
    queryset = Recruiter.objects.all()
    
    
class ApptitudeViewSet(viewsets.ModelViewSet):
    queryset = Apptitude.objects.all()
    serializer_class = ApptitudeSerializer
    
    
# class ContestViewSet(viewsets.ModelViewSet):
#     queryset = Contest.objects.all()
#     serializer_class = ContestSerializer
    
    
# class ContestSubmissionViewSet(viewsets.ModelViewSet):
#     queryset = ContestSubmission.objects.all()
#     serializer_class = ContestSubmissionSerializer
    
    
# class ContestLeaderboardViewSet(viewsets.ModelViewSet):
#     queryset = ContestLeaderboard.objects.all()
#     serializer_class = ContestLeaderboardSerializer


# class ChallengeViewSet(viewsets.ModelViewSet):
#     queryset = Challenge.objects.all()
#     serializer_class = ChallengeSerializer
    
    
# class ChallengeSubmissionViewSet(viewsets.ModelViewSet):
#     queryset = ChallengeSubmission.objects.all()
#     serializer_class = ChallengeSubmissionSerializer
    
    
# class ChallengeLeaderboardViewSet(viewsets.ModelViewSet):
#     queryset = ChallengeLeaderboard.objects.all()
#     serializer_class = ChallengeLeaderboardSerializer
    
    
# class PracticeViewSet(viewsets.ModelViewSet):
#     queryset = Practice.objects.all()
#     serializer_class = PracticeSerializer
    
    
# class PracticeSubmissionViewSet(viewsets.ModelViewSet):
#     queryset = PracticeSubmission.objects.all()
#     serializer_class = PracticeSubmissionSerializer












def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})

def index(request):
    return render(request,'frontend/index.html')


# def current_user(request):
#     if request.user.is_authenticated:
#         serializer = UserSerializer(request.user)
#         return JsonResponse(serializer.data)
#     else:
#         return JsonResponse({"message":"No user is logged in"}, status=401)


# @csrf_exempt
# def login_view(request):
#     if request.method =="POST":
#         username = request.POST['username']
#         password = request.POST['password']
#         user = authenticate(username=username,password=password)
#         if user is not None:
#             login(request,user)
#             userData = UserSerializer(instance=user,many=False)
#             return JsonResponse(userData.data,status=200)
#         else:
#             return JsonResponse({"error":"Invalid Username or password"},status=400)
#             return render(request,'corival/login.html',{
#                 "error":"Invalid Username or password"
#             })
#     # return JsonResponse({"error":"Invalid Request"}, status=400)
#     return render(request,'frontend/index.html')

# @csrf_exempt
# def register_view(request):
#     if request.method == "POST":
#         username = request.POST['username']
#         email = request.POST['email']
#         test_user = User.objects.filter(email=email).count()
#         if test_user>0:
#             return JsonResponse({"error":"Email Already exists"},status=400)
#         password = request.POST['password']
#         firstName = request.POST['firstName']
#         lastName = request.POST['lastName']
#         is_mg = request.POST['purpose']
#         try:
#             user = User.objects.create_user(username,email,password)
#             user.first_name = firstName
#             user.last_name = lastName
#             user.is_manager = is_mg
#             print(user)
#             # user.save()
#         except IntegrityError:
#             user = User.objects.get(username=username)
#             return JsonResponse({"error":"Username already exists"},status=400)
#         else:
#             login(request,user)
#             return JsonResponse({"success":"Registered successfully"},status=200)
#     return render(request,'frontend/index.html')

# @login_required
# def logout_view(request):
#     if request.method == "POST":
#         logout(request)
#         return JsonResponse({"success":"Logged out successfully"},status=200)
#     return JsonResponse({"error":"Invalid request"},status=400)

# @csrf_exempt
# @api_view(['GET','POST'])
# def add_questions(request):
#     if request.method=="POST":
#         serializer = QuestionsSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#     elif request.method == "GET":
#         return Response(QuestionsSerializer(Questions.objects.all(),many=True).data)
#     else:
#         return render(request,"corival/error.html",{"error":"400 : Invalid request"})
    
