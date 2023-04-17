from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator
import datetime


# Create your models here.
class User(AbstractUser):
    username = models.CharField(max_length=100, unique=True, primary_key=True)
    phone = models.CharField(max_length=10, blank=True)
    is_recruiter = models.BooleanField(default=False)
    is_candidate = models.BooleanField(default=False)
    
    
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.username = self.username.lower()
        
    def __str__(self):
        return self.pk
    
    
class Candidate(User):
    mathematics = models.IntegerField(default=0)
    description = models.TextField(blank=True, default='Hi there! I am using Corival')
    # Rest Will be Other details like Expirence, Projects, skills resume etc.
    
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        # Instead of defining them in serrializers i am defining them here
        self.is_candidate = True
        if self.description == '':
            self.description = 'Hi there! I am using Corival'
    
    
    def __str__(self):
        return self.username
    

class Recruiter(User):
    company = models.CharField(max_length=100, blank=True)
    verified = models.BooleanField(default=False)
    position = models.CharField(max_length=100, blank=True)
    # Rest Will be Other details like Expirence, Projects, skills resume etc.
    
    
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.is_recruiter = True
        

    def __str__(self):
        return self.username
        

# defines all choices for the category below like profit and loss, time and work etc.
APPTITUDE_CHOICES = (
    ['All', 'All'],
    ['Profit and Loss', 'Profit and Loss'],
    ['Time and Work', 'Time and Work'],
    ['Time and Distance', 'Time and Distance'],
    ['Number System', 'Number System'],
    ['Average', 'Average'],
    ['Percentage', 'Percentage'],
    ['Ratio and Proportion', 'Ratio and Proportion'],
    ['Mensuration', 'Mensuration'],
    ['Simple Interest', 'Simple Interest'],
    ['Compound Interest', 'Compound Interest'],
    ['Algebra', 'Algebra'],
    ['Geometry', 'Geometry'],
    ['Trigonometry', 'Trigonometry'],
    ['Data Interpretation', 'Data Interpretation'],
    ['Miscellaneous', 'Miscellaneous']
)
    
DIFFICULTY_CHOICES = (
    [1, 'Easy'],
    [2, 'Medium'],
    [3, 'Hard']
)

class Apptitude(models.Model):
    question = models.TextField(unique=True)
    answer_position = models.IntegerField("answer_position", validators=[MinValueValidator(1), MaxValueValidator(4)], default=1)
    category = models.CharField(max_length=100, choices=APPTITUDE_CHOICES, default=APPTITUDE_CHOICES[0][0])
    difficulty = models.IntegerField(default=1, choices=DIFFICULTY_CHOICES)
    added_by = models.ForeignKey("User", related_name="choices", on_delete=models.CASCADE, default=1)
    
    def __str__(self):
        return self.question
    
    def get_choices(self):
        return self.choices.all()
    
    def get_answer(self):
        return self.answer_position


class Choice(models.Model):
    question = models.ForeignKey("Apptitude", related_name="choices", on_delete=models.CASCADE)
    choice = models.CharField("Choice", max_length=100)
    position = models.IntegerField("position", validators=[MinValueValidator(1), MaxValueValidator(4)], default=1)
    
    class Meta:
        unique_together = [
            # no duplicated choice per question
            ("question", "choice"), 
            # no duplicated position per question 
            ("question", "position") 
        ]
        ordering = ("position",)
    
    
class Contest(models.Model):
    title = models.CharField(max_length=100)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    description = models.TextField()
    category = models.CharField(max_length=100, choices=APPTITUDE_CHOICES, default=APPTITUDE_CHOICES[0][0])
    difficulty = models.IntegerField(default=1, choices=DIFFICULTY_CHOICES)
    questions = models.ManyToManyField(Apptitude)
    created_by = models.ForeignKey("User", related_name="contests", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return self.title
    
    
    def get_questions(self):
        return self.questions.all()


class ContestSubmission(models.Model):
    contest = models.ForeignKey("Contest", related_name="submissions", on_delete=models.CASCADE)
    user = models.ForeignKey("User", related_name="submissions", on_delete=models.CASCADE)
    apptitude = models.ForeignKey("Apptitude", related_name="submissions", on_delete=models.CASCADE)
    time_taken = models.DurationField()
    user_choice = models.IntegerField("user_choice", validators=[MinValueValidator(0), MaxValueValidator(4)], default=0)
    answer = models.BooleanField(default=False)
    
    
    def __str__(self):
        return self.user.username

    
class ContestLeaderboard(models.Model):
    contest = models.ForeignKey("Contest", related_name="leaderboard", on_delete=models.CASCADE)
    user = models.ForeignKey("User", related_name="leaderboard", on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    time_taken = models.DurationField(null=True)
    
    class Meta:
        ordering = ["-score", "time_taken"]
        unique_together = [
            ("contest", "user")
        ]
        
    def __str__(self):
        return self.user.username
    

class Challenge(models.Model):
    sender = models.ForeignKey("Candidate", related_name="challenges_sent", on_delete=models.CASCADE)
    reciever = models.ForeignKey("Candidate", related_name="challenges_recieved", on_delete=models.CASCADE)
    
    note = models.TextField(default="No Note")
    difficulty = models.IntegerField(default=1, choices=DIFFICULTY_CHOICES)
    category = models.CharField(max_length=100, choices=APPTITUDE_CHOICES, default=APPTITUDE_CHOICES[0][0])
    questions = models.ManyToManyField(Apptitude)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(default= datetime.datetime.now() + datetime.timedelta(days=1))
    
    def __str__(self):
        return self.sender.username
    
    
class ChallengeSubmission(models.Model):
    challenge = models.ForeignKey("Challenge", related_name="submissions", on_delete=models.CASCADE)
    user = models.ForeignKey("User", related_name="challenge_submissions", on_delete=models.CASCADE)
    apptitude = models.ForeignKey("Apptitude", related_name="challenge_submissions", on_delete=models.CASCADE)
    timm_took = models.TimeField()
    answer = models.BooleanField(default=False)
    
    def __str__(self):
        return self.user.username
    
    
class ChallengeLeaderboard(models.Model):
    challenge = models.ForeignKey("Challenge", related_name="leaderboard", on_delete=models.CASCADE)
    user = models.ForeignKey("User", related_name="challenge_leaderboard", on_delete=models.CASCADE)
    score = models.FloatField(default=0)
    
    
    class Meta:
        ordering = ["-score"]

        
class Practice(models.Model):
    created_by = models.ForeignKey("User", related_name="practice", on_delete=models.CASCADE, default=1)
    difficulty = models.IntegerField(default=1, choices=DIFFICULTY_CHOICES)
    category = models.CharField(max_length=100, choices=APPTITUDE_CHOICES, default=APPTITUDE_CHOICES[0][0])
    questions = models.ManyToManyField(Apptitude)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField()
    score = models.FloatField(default=0)
    
    
    def __str__(self):
        return str(self.id)
    
    
    def get_results(self):
        submmsions = self.submissions.all()
        return submmsions
    
    
    def get_score(self):
        submissions = self.submissions.all()
        if self.score != 0:
            return self.score
        if submissions.count() == 0:
            return 0
        score = submissions.filter(answer=True).count()/submissions.count()
        self.score = float(score*100)
        return self.score
    

class PracticeSubmission(models.Model):
    practice = models.ForeignKey("Practice", related_name="submissions", on_delete=models.CASCADE, default=1)
    user = models.ForeignKey("User", related_name="practice_submissions", on_delete=models.CASCADE, default=1)
    apptitude = models.ForeignKey("Apptitude", related_name="practice_submissions", on_delete=models.CASCADE, default=1)
    user_choice = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(4)], default=1)
    time_taken = models.DurationField()
    answer = models.BooleanField(default=False)
    
    class Meta:
        unique_together = [
            ("practice", "user", "apptitude")
        ]
    
    def __str__(self):
        return str(self.practice.id)
    
    

    