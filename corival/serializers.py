from rest_framework import serializers
from .models import *


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
    class Meta:
        model = Practice
        fields = '__all__'
        
        
class PracticeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PracticeSubmission
        fields = '__all__'
        
        
