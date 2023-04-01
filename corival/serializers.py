from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name', 'date_joined', 'description', 'phone', 'is_recruiter', 'is_candidate']
        

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = '__all__'

        
class RecruiterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recruiter
        fields = '__all__'

        
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ('question', 'choice', 'position', 'answer_position')
        

class ApptitudeSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)
    class Meta:
        model = Apptitude
        fields = ('id', 'question', 'choices', 'category', 'difficulty','added_by')
            
        
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
    class Meta:
        model = Practice
        fields = '__all__'
        
        
class PracticeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeSubmission
        fields = '__all__'
        
        
