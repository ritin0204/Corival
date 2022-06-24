# Generated by Django 4.0 on 2022-06-23 12:35

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('corival', '0018_alter_competition_end_time_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='compresponse',
            name='start_time',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='profile_pic',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AlterField(
            model_name='competition',
            name='end_time',
            field=models.DateTimeField(default=datetime.datetime(2022, 6, 24, 18, 5, 48, 435294)),
        ),
        migrations.AlterField(
            model_name='competition',
            name='start_time',
            field=models.DateTimeField(default=datetime.datetime(2022, 6, 23, 18, 5, 48, 435294)),
        ),
    ]
