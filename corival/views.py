from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import IntegrityError
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.views import APIView
from django.middleware.csrf import get_token
from django.utils.decorators import method_decorator
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from .serializers import *
from .models import *

# Create your views here.
   

def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})


def current_user(request):
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)
        return JsonResponse(serializer.data)
    return JsonResponse({"error":"User not logged in"},status=400)


@login_required
def logout_view(request):
    if request.method == "POST":
        logout(request)
        return JsonResponse({"success":"Logged out successfully"},status=200)
    return JsonResponse({"error":"Invalid request"},status=400)


class CSRFExemptMixin(object):
   @method_decorator(csrf_exempt)
   def dispatch(self, *args, **kwargs):
       return super(CSRFExemptMixin, self).dispatch(*args, **kwargs)
   

@method_decorator(csrf_exempt, name='dispatch')
class AuthView(CSRFExemptMixin, APIView):
    template_name = 'frontend/index.html'
    
    def post(self,request):
        print(request.POST)
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username,password=password)
        if user is not None:
            login(request,user)
            print(user)
            userData = UserSerializer(instance=user,many=False)
            return Response(userData.data,status=200)
        else:
            return JsonResponse({"error":"Invalid Username or password"},status=400)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]
    
    
class CandidateViewSet(viewsets.ModelViewSet):
    serializer_class = CandidateSerializer
    queryset = Candidate.objects.all()
    
    
class RecruiterViewSet(viewsets.ModelViewSet):
    serializer_class = RecruiterSerializer
    queryset = Recruiter.objects.all()
    
    
class ApptitudeViewSet(viewsets.ModelViewSet):
    queryset = Apptitude.objects.all()
    serializer_class = ApptitudeSerializer   
    
    
class ContestViewSet(viewsets.ModelViewSet):
    queryset = Contest.objects.all()
    serializer_class = ContestSerializer
    
    
class ContestSubmissionViewSet(viewsets.ModelViewSet):
    queryset = ContestSubmission.objects.all()
    serializer_class = ContestSubmissionSerializer
    
    
class ContestLeaderboardViewSet(viewsets.ModelViewSet):
    queryset = ContestLeaderboard.objects.all()
    serializer_class = ContestLeaderboardSerializer
    
    
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
    
    
class PracticeSubmissionViewSet(viewsets.ModelViewSet):
    queryset = PracticeSubmission.objects.all()
    serializer_class = PracticeSubmissionSerializer
    permission_classes = [IsAuthenticated]
