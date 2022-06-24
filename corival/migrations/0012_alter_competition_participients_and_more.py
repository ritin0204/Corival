# Generated by Django 4.0 on 2022-06-22 03:24

import datetime
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('corival', '0011_notifications_alertype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='competition',
            name='participients',
            field=models.ManyToManyField(blank=True, related_name='participient', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='competition',
            name='start_time',
            field=models.DateTimeField(default=datetime.datetime(2022, 6, 22, 8, 54, 57, 511381)),
        ),
    ]