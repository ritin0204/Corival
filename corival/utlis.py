from .models import Apptitude, Choice, User
import datetime, random


class QuestionSetter():
    def __init__(self, category="All", difficulty=1, N=3, start_time=datetime.datetime.now()):
        self.category = category
        self.difficulty = difficulty
        self.start_time = start_time
        self.apptitude = None
        self.end_time = None
        self.set_apptitude(N)
        
        
    def set_apptitude(self, N):
        test_time_in_seconds = self.difficulty * 60 * 0.75 * N
        # add 10 seconds for buffer and 10 seconds to start the test
        test_duration = datetime.timedelta(seconds=(test_time_in_seconds + 20))
        
        self.end_time = self.start_time + test_duration
        
        if self.category == 'All':
            
            self.apptitude = Apptitude.objects.filter(
                difficulty=self.difficulty
            )
            
        else:
            
            self.apptitude = Apptitude.objects.filter(
                category=self.category,
                difficulty=self.difficulty
            )
    
        self.apptitude = random.sample(list(self.apptitude), N)
        return self.apptitude
    
    
    def upload_questions(self):
        path = "/home/ritin/git-repo/Corival/apptitude.csv"
        
        with open(path, "r") as f:
            data = f.readlines()
            
        for line in (data[1:]):
            line = line.strip()
            line = line.split(",")
            
            question = line[0]
            choices = line[1:5]
            answer_position = int(line[5])
            category = line[6]
            difficulty = int(line[7])
            added_by = User.objects.get(username="ritin0204")
            try:
                apptitude = Apptitude.objects.create(question=question, answer_position=answer_position, category=category, difficulty=difficulty, added_by=added_by)
                    
                for i, choice in enumerate(choices):
                    Choice.objects.create(
                        question=apptitude,
                        choice=choice,
                        position=i+1
                    )
                
                print("Question uploaded: ", question)
            except BaseException as e:
                print(e)
            except ValueError as e:
                print(e)
                
                
            
            
    