from pyexpat import model
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
    # user_pic = models.ImageField()

    def serialize(self):
        return {
            'username':self.username,
            'email': self.email,
            'fullName': self.get_full_name(),
            'isAdmin': self.is_superuser,
            'isManager':self.is_manager,
            'rating':self.rating
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
            'options1':self.options1,
            'options2':self.options2,
            'options3':self.options3,
            'options4':self.options4,
            'right_answer':self.right_answer,
            'category':self.category
        }

class Competition(models.Model):
    name = models.CharField(max_length=150,blank=False,unique=True)
    is_challenge = models.BooleanField(default=False)
    is_practice = models.BooleanField(default=False)
    createdBy = models.ForeignKey("User",on_delete=models.CASCADE)
    start_time = models.DateTimeField(blank=False)
    end_time = models.DateTimeField(blank=False)
    duration = models.DurationField(blank=False)
    archive = models.BooleanField(default=False)
    description = models.TextField(null=True)
    participients = models.ManyToManyField("User",related_name='participient')
    questions = models.ManyToManyField("Questions",related_name='questions')

    def serialize(self):
        return {
            'name':self.name,
            'createdBy':self.createdBy,
            'startTime':self.startTime,
            'endTime':self.endTime,
            'duration' :self.duration,
            'participients':[user.username for user in self.participients.all()],
            'questions':[que.id for que in self.questions.all()]
        }

class CompResponse(models.Model):
    compId = models.ForeignKey("Competition",on_delete=models.CASCADE)
    userId = models.ForeignKey("User",on_delete=models.CASCADE)
    score = models.IntegerField(blank=False)
    