from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.decorators import login_required

from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView

from django.contrib.auth.models import User
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework import viewsets
from .serializers import *
from .models import *
from .permissions import *
import datetime, pytz

utc=pytz.UTC
# Create your views here.

# I am turning this of so i can deveop the frontend without having to login everytime
class PermissionMixin(object):
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    

def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})


def current_user(request):
    if request.user.is_authenticated:
        if request.user.is_candidate:
            user = Candidate.objects.get(username=request.user.username)
            serializer = CandidateSerializer(user,many=False)
            return JsonResponse(serializer.data)
        elif request.user.is_recruiter:
            user = Recruiter.objects.get(username=request.user.username)
            serializer = RecruiterSerializer(user,many=False)
            return JsonResponse(serializer.data)
        serializer = UserSerializer(request.user,many=False)
        return JsonResponse(serializer.data)
    return JsonResponse({"error":"User not logged in"},status=400)


@login_required
def logout_view(request):
    if request.method == "POST":
        logout(request)
        return JsonResponse({"success":"Logged out successfully"},status=200)
    return JsonResponse({"error":"Invalid request"},status=400)
   

@method_decorator(csrf_exempt, name='dispatch')
class AuthView(APIView):
    template_name = 'frontend/index.html'
    
    def post(self,request):
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username,password=password)
        if user is not None:
            login(request,user)
            userData = UserSerializer(instance=user,many=False)
            return Response(userData.data,status=200)
        else:
            return JsonResponse({"error":"Invalid Username or password"},status=400)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class CandidateViewSet(viewsets.ModelViewSet):
    serializer_class = CandidateSerializer
    queryset = Candidate.objects.all()
    
    def create(self, request, *args, **kwargs):
        response =  super().create(request, *args, **kwargs)
        if response.status_code == 201:
            login(request,User.objects.get(username=request.data['username']))
        return response
        
    
class RecruiterViewSet(viewsets.ModelViewSet):
    serializer_class = RecruiterSerializer
    queryset = Recruiter.objects.all()
    
    def create(self, request, *args, **kwargs):
        response =  super().create(request, *args, **kwargs)
        if response.status_code == 201:
            login(request,User.objects.get(username=request.data['username']))
        return response
    

class ApptitudeViewSet(viewsets.ModelViewSet):
    queryset = Apptitude.objects.all()
    serializer_class = ApptitudeSerializer
    
    
class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
    

class ContestViewSet(viewsets.ModelViewSet):
    queryset = Contest.objects.all()
    serializer_class = ContestSerializer
    permission_classes = [ IsAdminUser, IsRecruiter]
    
    
    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [IsRecruiter]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    
    # We'll define permission later on
    def list(self, request, *args, **kwargs):
        upcoming = ContestSerializer(Contest.objects.filter(start_time__gt=utc.localize(datetime.datetime.utcnow())),many=True).data
        previous = ContestSerializer(Contest.objects.filter(end_time__lt=utc.localize(datetime.datetime.utcnow())),many=True).data
        return Response({'upcoming':upcoming,'previous':previous})
    
    
    def retrieve(self, request, *args, **kwargs):
        response =  super().retrieve(request, *args, **kwargs)
        if response.status_code == 200:
            contest = Contest.objects.get(id=kwargs['pk'])
            if contest.start_time > utc.localize(datetime.datetime.utcnow()):
                response.data['status'] = "upcoming"
            elif contest.end_time < utc.localize(datetime.datetime.utcnow()):
                response.data['status'] = "previous"
            else:
                response.data['status'] = "ongoing"
                response.data['questions'] = ApptitudeSerializer(contest.get_questions(),many=True).data
        return response
    
    
    def update(self, request, *args, **kwargs):
        return Response({"error":"You can't update a contest"},status=400)
    
    
class ContestSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContestSubmission.objects.all()
    serializer_class = ContestSubmissionSerializer
    permission_classes = [IsAuthenticated]
    
    
    def create(self, request, *args, **kwargs):
        contest = Contest.objects.get(id=request.data['contest'])
        TOTAL_QUESTIONS = contest.get_questions().count()
        if contest.start_time > utc.localize(datetime.datetime.utcnow()):
            return Response({"error":"Contest is not started yet"},status=400)
        elif contest.end_time < utc.localize(datetime.datetime.utcnow()):
            return Response({"error":"Contest is over"},status=400)
        else:
            response = super().create(request, *args, **kwargs)
            if response.status_code == 201:
                contestLeaderBoard = ContestLeaderboard.objects.filter(contest=contest,user=request.user.username)
                if contestLeaderBoard.count() == 0:
                    rightSubmission = 1 if response.data['answer'] else 0
                    score = (rightSubmission/TOTAL_QUESTIONS)*100
                    timeSpent = datetime.datetime.strptime(response.data['time_taken'], '%H:%M:%S') - datetime.datetime.strptime('00:00:00', '%H:%M:%S')
                    ContestLeaderboard.objects.create(contest=contest,user=request.user, score=score, time_taken=timeSpent)
                else:
                    score = contestLeaderBoard[0].score + ((1/TOTAL_QUESTIONS)*100)
                    timeSpent = (datetime.datetime.strptime(response.data['time_taken'], '%H:%M:%S') - datetime.datetime.strptime('00:00:00', '%H:%M:%S'))+ contestLeaderBoard[0].time_taken
                    contestLeaderBoard.update(score=score, time_taken=timeSpent)
        return response
    
    
    def update(self, request, *args, **kwargs):
        return Response({"error":"You can't update a contest submission"},status=400)
    
    
    
class ContestLeaderboardViewSet(viewsets.ModelViewSet):
    queryset = ContestLeaderboard.objects.all()
    serializer_class = ContestLeaderboardSerializer
    permission_classes = [IsAuthenticated]
    
    
    def list(self, request, *args, **kwargs):
        contest = Contest.objects.get(id=kwargs['contest_id'])
        if contest.start_time > utc.localize(datetime.datetime.utcnow()):
            return Response({"error":"Contest is not started yet"},status=400)
        elif contest.end_time < utc.localize(datetime.datetime.utcnow()):
            contest_leaderboard = ContestLeaderboard.objects.filter(contest=contest)
            return Response(ContestLeaderboardSerializer(contest_leaderboard,many=True).data)
        else:
            return Response({"error":"Contest is ongoing"},status=400)
        
        
    def retrieve(self, request, *args, **kwargs):
        username = kwargs['username']
        contest_id = kwargs['contest_id']
        contest_leaderboard = ContestLeaderboard.objects.filter(contest=contest_id,user=username)
        if contest_leaderboard.count() == 0:
            return Response({"error":"User not found"},status=400)
        else:
            response = Response(ContestLeaderboardSerializer(contest_leaderboard[0]).data)
            contest_submissions = ContestSubmission.objects.filter(contest=contest_id,user=username)
            results = ContestSubmissionSerializer(contest_submissions,many=True)
            for result in results.data:
                apptitude = Apptitude.objects.get(id=result["apptitude"])
                result["answer_position"] = apptitude.get_answer()
                result["apptitude"] = ApptitudeSerializer(apptitude,many=False).data
            response.data['results'] = results.data
            return response
            
    
class ChallengeViewSet(viewsets.ModelViewSet):
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer
    
    
class ChallengeSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ChallengeSubmission.objects.all()
    serializer_class = ChallengeSubmissionSerializer
    
    
class ChallengeLeaderboardViewSet(viewsets.ModelViewSet):
    queryset = ChallengeLeaderboard.objects.all()
    serializer_class = ChallengeLeaderboardSerializer
    

class PracticeViewSet(viewsets.ModelViewSet):
    queryset = Practice.objects.all()
    serializer_class = PracticeSerializer
    permission_classes = [IsAuthenticated]
    
    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        practice = Practice.objects.get(id=kwargs['pk'])
        if practice.get_results().count() == practice.questions.all().count() or practice.end_time < utc.localize(datetime.datetime.utcnow()):
            results = PracticeSubmissionSerializer(practice.get_results(),many=True)
            for result in results.data:
                apptitude = Apptitude.objects.get(id=result["apptitude"])
                result["answer_position"] = apptitude.get_answer()
                result["apptitude"] = ApptitudeSerializer(apptitude,many=False).data
            response.data['results'] = results.data
            response.data['score'] = practice.get_score()
            del response.data['questions']
        return response
    
    
class PracticeSubmissionViewSet(viewsets.ModelViewSet):
    queryset = PracticeSubmission.objects.all()
    serializer_class = PracticeSubmissionSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        practice = Practice.objects.get(id=request.data['practice'])
        if practice.end_time < utc.localize(datetime.datetime.utcnow()):
            return JsonResponse({"error":"Practice has ended"},status=400)
        response = super().create(request, *args, **kwargs)
        return response
    
    def update(self, request, *args, **kwargs):
        return JsonResponse({"error":"You cannot update a submission"},status=400)
    
    