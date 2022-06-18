from django.db import models
from django.contrib.auth.models import AbstractUser

# Choices Feilds
APPTITUDE_TYPES = [
    ('PR','Percentage'),
    ('P&L','Profit and loss'),
    ('DC','Discount'),
    ('SI','Simple Interest')
]


# Create your models here.
class User(AbstractUser):
    is_manager = models.BooleanField(default=False)
    rating = models.IntegerField(null=True)
    bio = models.TextField(null=True)

    def serialize(self):
        return {
            'username':self.username,
            'email': self.email,
            'bio': self.bio,
            'fullName': self.get_full_name(),
            'isAdmin': self.is_superuser,
            'isManager':self.is_manager,
            'rating':self.rating,
            'dateJoined':self.date_joined,
            'lastLogin' : self.last_login
        }


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
    is_challenge = models.BooleanField(default=False)
    createdBy = models.ForeignKey("User",on_delete=models.CASCADE)
    start_time = models.DateTimeField(blank=False)
    end_time = models.DateTimeField(blank=False)
    duration = models.DurationField(blank=False)
    archive = models.BooleanField(default=False)
    description = models.TextField(null=True)
    participients = models.ManyToManyField("User",related_name='participient')
    questions = models.ManyToManyField("Questions",related_name='questions')
    no_of_questions = models.IntegerField(default=20)

    def serialize(self):
        return {
            'id':self.id,
            'isChallenge': self.is_challenge,
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
    created_time = models.DateTimeField(auto_now_add=True,editable=False)

    def serialize(self):
        return {
            "messege": self.message,
            "message_url": self.message_url,
            "created_time":self.created_time,
            "read" : self.read
        }