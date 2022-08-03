from attr import fields
from .models import Challenges, CompResponse, Competition, Notifications, Practice, Questions, User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'profile_pic',
            'username',
            'first_name', 
            'last_name', 
            'email', 
            'last_login', 
            'is_manager', 
            'is_superuser', 
            'rating', 
            'bio',
            'date_joined'
            ]

class QuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = [
            'id',
            'statement',
            'options1',
            'options2',
            'options3',
            'options4',
            'category',
        ]

class CompetitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competition
        fields = '__all__'

class PracticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Practice
        fields = '__all__'

class CompResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompResponse
        fields = '__all__'

class NotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        ordering = ['-created_time']
        fields = '__all__'

class ChallengeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Challenges
        ordering = ['-end_time']
        fields = '__all__'