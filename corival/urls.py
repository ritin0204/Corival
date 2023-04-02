from django.urls import path, include
from .views import *
from rest_framework import routers
from django.views.generic import TemplateView

routes = routers.DefaultRouter()

# User Routes
routes.register('users',UserViewSet, basename='user')
routes.register('candidates',CandidateViewSet, basename='candidate')
routes.register('recruiters',RecruiterViewSet, basename='recruiter')

# Apptitude Routes
routes.register('apptitudes',ApptitudeViewSet, basename='apptitude')

# Contest Routes
routes.register('contests',ContestViewSet, basename='contest')
routes.register('contest-submissions',ContestSubmissionViewSet, basename='contest-submission')
routes.register('contest-leaderboard',ContestLeaderboardViewSet, basename='contest-leaderboard')

# Challenge Routes
routes.register('challenges',ChallengeViewSet, basename='challenge')
routes.register('challenge-submissions',ChallengeSubmissionViewSet, basename='challenge-submission')
routes.register('challenge-leaderboard',ChallengeLeaderboardViewSet, basename='challenge-leaderboard')

# Practice Rouutes
routes.register('practice',PracticeViewSet, basename='practice')
routes.register('practice-submission',PracticeSubmissionViewSet, basename='practice-submission')


urlpatterns = [
    # /corival
    path('',TemplateView.as_view(template_name='frontend/index.html')),
    path('api/',include(routes.urls)),
    
    # For Authentication
    path('rivals/user',current_user,name='current_user'), # path('register',views.register_view,name='register-view'),
    path('login',AuthView.as_view(), name='login-view'),
    path('logout',logout_view,name='logout-view'),
]