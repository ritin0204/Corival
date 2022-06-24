# Generated by Django 4.0 on 2022-06-22 08:23

import datetime
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('corival', '0017_alter_competition_end_time_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='competition',
            name='end_time',
            field=models.DateTimeField(default=datetime.datetime(2022, 6, 23, 13, 53, 34, 68513)),
        ),
        migrations.AlterField(
            model_name='competition',
            name='participients',
            field=models.ManyToManyField(blank=True, related_name='participients', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='competition',
            name='start_time',
            field=models.DateTimeField(default=datetime.datetime(2022, 6, 22, 13, 53, 34, 68513)),
        ),
    ]
