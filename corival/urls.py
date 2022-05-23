from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name='index'),
    path('competition/<int:compId>',views.get_competition,name='competition'),

    #Login,Register and logout Urls
    path('login',views.login_view,name='login-view'),
    path('register',views.register_view,name='register-view'),
    path('logout',views.logout_view,name='logout-view'),
]