from django.urls import path
from . import views

urlpatterns = [
    # /corival
    path('',views.index,name='index'),
    #User-Profile/User details Create,Get, Update and Delete User url
    path('rivals/user',views.current_user,name='current_user'),
    path('rivals/<str:username>',views.get_user,name='get_user'),
    # Notifications
    path('notifications',views.notifications,name='notifications'),
    #All kinds of Contest
    path('competitions',views.competitions,name='contest-type'),
    path('competitions/<str:type>',views.competitions,name='contest-type'),
    #all practices
    path('practices/all',views.all_Practices,name='all-practices'),
    #Competitions Create,Read, update, Delete
    path('competition/<str:compId>',views.get_competition, name = 'getCompetition'),
    #participate and get quiz,get marks current user competition
    path('competition/<str:compId>/participate',views.participate,name='participate'),
    #submit cometition quiz
    path('competition/<str:compId>/submit-response',views.submit_contest,name='submit-competition'),
    #get everyone score on competition
    path('competition/<str:compId>/scores',views.get_scores,name ='get-scores'),
    #Search User
    path('rivals/search/<str:username>',views.search_user,name='search-user'),
    #practice get,post,update, delete
    path('practice/<str:pracId>',views.do_practice,name='do-practice'),
    #Create Challenge
    path('challenge/create',views.create_challenge,name='create-challenge'),
    # Put Score, get challenge quesions and start quiz, delete Challenge
    path('challenge/<str:challId>',views.get_challenge,name='get-challenge'),
    #get all challenges
    path('challenges/all',views.all_challenge,name='all-challenge'),
    #Add questions using clients
    path('question/add',views.add_questions,name='add_questions'),
    #Login,Register and logout Urls
    path('login',views.login_view,name='login-view'),
    path('register',views.register_view,name='register-view'),
    path('logout',views.logout_view,name='logout-view'),
]