from django.contrib import admin

from .models import Notifications, User,Questions,Competition,CompResponse,Practice,Challenges
# Register your models here.
admin.site.register(User)
admin.site.register(Questions)
admin.site.register(Competition)
admin.site.register(CompResponse)
admin.site.register(Notifications)
admin.site.register(Practice)
admin.site.register(Challenges)