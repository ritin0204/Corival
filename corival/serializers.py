from rest_framework import serializers
from .models import *
import random, datetime


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'date_joined', 'last_login', 'phone', 'is_recruiter', 'is_candidate']
        

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'password',
            'date_joined',
            'last_login',
            'description',
            'mathematics',
            'phone',
            'is_recruiter',
            'is_candidate'
        ]
        read_only_fields = ['date_joined', 'last_login', 'is_recruiter', 'is_candidate', 'mathematics']
        write_only_fields = ['password']
        
    def create(self, validated_data):
        password = validated_data.pop('password')
        candidate = Candidate(**validated_data)
        candidate.set_password(password)
        candidate.save()
        return candidate
        
        
class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruiter
        fields = [
            'username',
            'email',
            'password',
            'first_name',
            'last_name',
            'date_joined',
            'last_login',
            'phone',
            'company',
            'verified',
            'position',
            'is_recruiter',
            'is_candidate'
        ]
        read_only_fields = ['date_joined', 'last_login', 'is_recruiter', 'is_candidate']
        write_only_fields = ['password']
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        recruiter = Recruiter(**validated_data)
        recruiter.set_password(password)
        recruiter.save()
        return recruiter

        
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('question', 'choice', 'position')
        

class ApptitudeSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)
    choice1 = serializers.CharField(max_length=100, write_only=True)
    choice2 = serializers.CharField(max_length=100, write_only=True)
    choice3 = serializers.CharField(max_length=100, write_only=True)
    choice4 = serializers.CharField(max_length=100, write_only=True)
    
    class Meta:
        model = Apptitude
        fields = (
            'id', 
            'question', 
            'choices',
            'choice1',
            'choice2',
            'choice3',
            'choice4',
            'answer_position',
            'category', 
            'difficulty',
            'added_by'
        )
        read_only_fields = ['choices']
        extra_kwargs = {
            'answer_position': {'write_only': True},
        }
    
    def create(self, validated_data):
        choices = [
            validated_data.pop('choice1'),
            validated_data.pop('choice2'),
            validated_data.pop('choice3'),
            validated_data.pop('choice4'),
        ]
        apptitude = Apptitude.objects.create(**validated_data)
        for i, choice in enumerate(choices):
            Choice.objects.create(
                question=apptitude,
                choice=choice,
                position=i+1
            )
        return apptitude
        

class ContestSerializer(serializers.ModelSerializer):
    apptitude = ApptitudeSerializer(many=True, read_only=True)
    class Meta:
        model = Contest
        fields = '__all__'
        

class ContestSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContestSubmission
        fields = '__all__'
        

class ContestLeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContestLeaderboard
        fields = '__all__'


class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenge
        fields = '__all__'
        
        
class ChallengeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChallengeSubmission
        fields = '__all__'
        

class ChallengeLeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChallengeLeaderboard
        fields = '__all__'
        
        
class PracticeSerializer(serializers.ModelSerializer):
    questions = ApptitudeSerializer(many=True, read_only=True)
    class Meta:
        model = Practice
        fields = ['id', 'questions', 'category', 'difficulty', 'created_by', 'start_time', 'end_time', 'score']
        read_only_fields = ['end_time', 'start_time', 'questions', 'score', 'created_by']
    
    
    def create(self, validated_data):
        # fro future take number_of_questions from request
        number_of_questions = 3
        # 75% of time limit for each question 45 seconds min for easy, 1.5 minutes for medium, 2.25 minutes for hard
        test_time_in_seconds = validated_data['difficulty'] * 60 * 0.75 * number_of_questions
        # add 10 seconds for buffer and 10 seconds to start the test
        test_duration = datetime.timedelta(seconds=test_time_in_seconds + 20)
        
        validated_data['end_time'] = datetime.datetime.now() + test_duration
        
        if validated_data['category'] == 'All':
            
            apptitude = Apptitude.objects.filter(
                difficulty=validated_data['difficulty']
            )
            
        else:
            
            apptitude = Apptitude.objects.filter(
                category=validated_data['category'],
                difficulty=validated_data['difficulty']
            )
    
        apptitude = random.sample(list(apptitude), number_of_questions)
        validated_data['created_by'] = self.context['request'].user
        practice  = Practice.objects.create(**validated_data)
        practice.questions.set(apptitude)
        return practice
        

class PracticeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeSubmission
        fields = '__all__'
        
        
