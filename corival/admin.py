from django.contrib import admin

from .models import User,Questions,Competition,CompResponse
# Register your models here.
admin.site.register(User)
admin.site.register(Questions)
admin.site.register(Competition)
admin.site.register(CompResponse)