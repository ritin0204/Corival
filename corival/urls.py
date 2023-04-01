from django.urls import path, include
from .views import *
from rest_framework import routers


routes = routers.DefaultRouter()
routes.register('candidates',CandidateViewSet, basename='candidate')
routes.register('recruiters',RecruiterViewSet, basename='recruiter')
routes.register('apptitudes',ApptitudeViewSet, basename='apptitude')
# routes.register('contests',ContestViewSet, basename='contest')
# routes.register('practice',PracticeViewSet, basename='practice')
routes.register('users',UserViewSet, basename='user')


urlpatterns = [
    # /corival
    path('',index,name='index'),
    path('api/',include(routes.urls)),
    
    # For Authentication
    # path('rivals/user',views.current_user,name='current_user'),
    # path('login',views.login_view,name='login-view'),
    # path('register',views.register_view,name='register-view'),
    # path('logout',views.logout_view,name='logout-view'),
]