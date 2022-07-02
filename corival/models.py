from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime

# Choices Feilds
APPTITUDE_TYPES = [
    ('PR','Percentage'),
    ('P&L','Profit and loss'),
    ('DC','Discount'),
    ('SI','Simple Interest')
]
ALERT_TYPES = [
    ('CH','Challenge'),
    ('COMP','Competition'),
    ('USR','User'),
    ('PRC','Practice')
]

# Create your models here.
class User(AbstractUser):
    is_manager = models.BooleanField(default=False)
    rating = models.IntegerField(null=True)
    bio = models.TextField(null=True)
    profile_pic = models.ImageField(blank=True,null=True,verbose_name="profilepic",upload_to='corival/files/profile')

class Questions(models.Model):
    statement = models.TextField(unique=True)
    options1 = models.CharField(max_length=150,null=True)
    options2 = models.CharField(max_length=150,null=True)
    options3 = models.CharField(max_length=150,null=True)
    options4 = models.CharField(max_length=150,null=True)
    right_answer = models.CharField(max_length=150)
    category = models.CharField(max_length=100,choices=APPTITUDE_TYPES)

    def serialize(self):
        return {
            'id':self.id,
            'statement':self.statement,
            'option1':self.options1,
            'option2':self.options2,
            'option3':self.options3,
            'option4':self.options4,
            'rans':self.right_answer
        }

class Competition(models.Model):
    name = models.CharField(max_length=150,blank=False,unique=True)
    createdBy = models.ForeignKey("User",on_delete=models.CASCADE)
    start_time = models.DateTimeField(blank=False,default=datetime.datetime.now())
    end_time = models.DateTimeField(blank=False,default=datetime.datetime.now() + datetime.timedelta(days=1))
    duration = models.DurationField(blank=False)
    archive = models.BooleanField(default=False)
    description = models.TextField(null=True)
    participients = models.ManyToManyField("User",related_name='participients',blank=True)
    questions = models.ManyToManyField("Questions",related_name='questions',blank=True)
    no_of_questions = models.IntegerField(default=20)

    def serialize(self):
        return {
            'id':self.id,
            'name':self.name,
            'createdBy':self.createdBy.username,
            'startTime':self.start_time,
            'endTime':self.end_time,
            'duration' :self.duration,
            'participients':[user.username for user in self.participients.all()],
            'archive':self.archive,
            'description':self.description,
            'noOfQuestion':self.no_of_questions,
        }

class Practice(models.Model):
    title = models.TextField(max_length=100,null=True)
    user = models.ForeignKey("User",on_delete=models.CASCADE)
    duration = models.DurationField(blank=False)
    questions = models.ManyToManyField("Questions",related_name='practicequestions')
    no_of_questions = models.IntegerField(default=20)
    score = models.IntegerField(blank=True,null=True)

    def serialize(self):
        return {
            'id':self.id,
            'duration' :self.duration,
            'noOfQuestion':self.no_of_questions,
            'score':self.score
        }

class CompResponse(models.Model):
    compId = models.ForeignKey("Competition",on_delete=models.CASCADE)
    userId = models.ForeignKey("User",on_delete=models.CASCADE)
    start_time = models.DateTimeField(auto_now_add=True,null=True)
    score = models.IntegerField(blank=False)

    def serialize(self):
        return {
            "userName": self.userId.username,
            "score":self.score
        }

class Notifications(models.Model):
    message = models.TextField()
    message_url = models.TextField()
    read = models.BooleanField(default=False)
    user = models.ForeignKey("User",on_delete=models.CASCADE)
    alerType = models.CharField(max_length=100,choices=ALERT_TYPES,null=True,default=None)
    created_time = models.DateTimeField(auto_now_add=True,editable=False)

    def serialize(self):
        return {
            "messege": self.message,
            "message_url": self.message_url,
            "created_time":self.created_time,
            "read" : self.read
        }

class Challenges(models.Model):
    name = models.CharField(max_length=150,blank=False,unique=True)
    createdBy = models.ForeignKey("User",on_delete=models.CASCADE,related_name="challenger")
    start_time = models.DateTimeField(blank=False,default=datetime.datetime.now())
    end_time = models.DateTimeField(blank=False,default=datetime.datetime.now() + datetime.timedelta(days=1))
    duration = models.DurationField(blank=False)
    opponent = models.ForeignKey("User",on_delete=models.CASCADE,related_name="chllengee")
    questions = models.ManyToManyField("Questions",related_name='challenge_questions',blank=True)
    user_score = models.IntegerField(blank=True,null=True)
    opponent_score = models.IntegerField(blank=True,null=True)
    no_of_questions = models.IntegerField(default=20)
    finished = models.BooleanField(default=False)

    def __init__(self, *args, **kwargs) -> None:
        if self.end_time<=datetime.datetime.now():
            self.delete()
            return None
        super().__init__(*args, **kwargs)
