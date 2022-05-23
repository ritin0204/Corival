import datetime
from django.utils import timezone
from django.db import IntegrityError
from django.shortcuts import redirect, render
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.decorators import login_required
from .models import User,Competition,CompResponse,Questions

# Create your views here.
def index(request):
    if request.user.is_authenticated:
        # now = datetime.datetime.now()
        now = timezone.now()
        contests = Competition.objects.filter(archive=False)
        ongoing = []
        for contest in contests:
            if contest.start_time <= now<=contest.end_time:
                ongoing.append(contest)
        print(ongoing)
        return render(request,'corival/index.html',{
            'ongoing':ongoing
        })
    return render(request,'corival/index.html')

@login_required
def get_competition(request,compId):
    comp = Competition.objects.get(id=compId)
    
    return render(request,'corival/comp_details.html',{
        'comp':comp
    })

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
        test_user = User.objects.filter(email=email)
        if test_user is not None:
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
