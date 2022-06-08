from django.urls import path
from . import views

urlpatterns = [
    # /corival
    path('',views.index,name='index'),
    #User-Profile/User details
    path('rivals/<str:username>',views.get_user,name='get_user'),
    # Notifications
    path('notifications',views.notifications,name='notifications'),
    #All kinds of Contest
    path('competitions/<str:type>',views.competitions,name='contest_type'),
    #all practices
    path('practices/all',views.all_Practices,name='all-practices'),
    #Competition-details
    path('competition/<int:compId>',views.get_competition,name='competition'),
    #Create contest
    path('competition/create',views.add_contest,name='add_contest'),

    #Path to start and submit competition quiz
    path('competition/start/<int:compId>',views.startContest,name='start-competition'),
    #create/challenge
    # path('competition/create',views.add_contest,name='add_contest'),
    #Get Questions to practice(get request) , Submit answersand get score(by post request)
    path('practice/',views.add_practice,name='create-practice'),

    #Challenge-details/post to submit challenge
    path('practice/<int:pracId>',views.result_practice,name='result-practice'),

    # #Accept challenge
    # path('challenge/accepted',views.add_challenge,name='add_contest'),

    #Add questions using clients
    path('question/add',views.add_questions,name='add_questions'),
    #Login,Register and logout Urls
    path('login',views.login_view,name='login-view'),
    path('register',views.register_view,name='register-view'),
    path('logout',views.logout_view,name='logout-view'),
]