from django.test import TestCase
from django.test.client import Client
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from .models import *
import time


class PracticeTestCase(APITestCase):
    def setUp(self):
        self.client = APIClient()
        # Creatinng HR user
        self.recruiter = Recruiter.objects.create(username='testuser2', password='12345', first_name='test', last_name="recruiter", is_recruiter=True)
        self.client.force_authenticate(user=self.recruiter)
        # Creating Questions
        q1 = Apptitude.objects.create(question="What is 1+1", answer_position=1, difficulty=1, category="All", added_by=self.recruiter)
        Choice.objects.create(question=q1, choice="2", position=1)
        Choice.objects.create(question=q1, choice="3", position=2)
        Choice.objects.create(question=q1, choice="4", position=3)
        Choice.objects.create(question=q1, choice="5", position=4)
        
        q2 = Apptitude.objects.create(question="What is 2+2", answer_position=3, difficulty=1, category="All", added_by=self.recruiter)
        Choice.objects.create(question=q2, choice="2", position=1)
        Choice.objects.create(question=q2, choice="3", position=2)
        Choice.objects.create(question=q2, choice="4", position=3)
        Choice.objects.create(question=q2, choice="5", position=4)
        
        q3 = Apptitude.objects.create(question="What is 3+3", answer_position=3, difficulty=1, category="All", added_by=self.recruiter)
        Choice.objects.create(question=q3, choice="2", position=1)
        Choice.objects.create(question=q3, choice="3", position=2)
        Choice.objects.create(question=q3, choice="6", position=3)
        Choice.objects.create(question=q3, choice="5", position=4)
        
        # Creating Candidate
        self.candidate = Candidate.objects.create(username='testuser', password='12345', first_name='test', last_name="candidate", is_candidate=True)
        self.client.force_authenticate(user=self.candidate)

    def test_create_practice(self):
        
        # If candidate is creating a practice, then the practice should be created
        url = '/api/practice/'
        data = {
            "category": "All",
            "difficulty": 1
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Practice.objects.count(), 1, )
        self.assertEqual(Practice.objects.get().category, 'All')
        self.assertEqual(Practice.objects.get().difficulty, 1)
        
        response2 = self.client.post(url, data, format='json')
        self.assertEqual(response2.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Practice.objects.count(), 2, )
        self.assertEqual(Practice.objects.get(id=2).category, 'All')
        self.assertEqual(Practice.objects.get(id=2).difficulty, 1)
        return response2.data
        
        # If recruiter is creating a practice, then the practice should not be created
        # self.client.force_authenticate(user=self.recruiter)
        # self.client.post(url, data, format='json')
        # self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST, "Recruiter should not be able to create practice")
        
        
    def test_get_practice(self):
        
        # If candidate is getting a practice, then the practice should be returned
        url = '/api/practice/'
        data = {
            "category": "All",
            "difficulty": 1
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Practice.objects.count(), 1, )
        self.assertEqual(Practice.objects.get().category, 'All')
        self.assertEqual(Practice.objects.get().difficulty, 1)
        
        response2 = self.client.post(url, data, format='json')
        self.assertEqual(response2.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Practice.objects.count(), 2, )
        self.assertEqual(Practice.objects.get(id=2).category, 'All')
        self.assertEqual(Practice.objects.get(id=2).difficulty, 1)
        
        url = '/api/practice/2/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('questions')[0].get('question'), 'What is 1+1')
        
    def test_submit_practice(self):
        
        d1 = self.test_create_practice()
        url = '/api/practice/2/'
        response = self.client.get(url)
        
        self.assertEqual(response.data, d1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assert_(response.data.get('results') is None)
        self.assertNotEqual(response.data.get('questions'), None)
        url = '/api/practice-submission/'
        
        user_choices = [2, 3, 3]
        questions = response.data.get('questions')
        
        for i in range(len(questions)):
            data = {
                "practice": 1,
                "time_taken": "00:00:20",
                "user_choice": user_choices[i],
                "apptitude": questions[i].get('id')
            }
            response = self.client.post(url, data, format='json')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        url = '/api/practice/1/'
        response = self.client.get(url)
        
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertNotEqual(response.data.get('results'), None)
        self.assertEqual(response.data.get('score'), '66.67')
        
        