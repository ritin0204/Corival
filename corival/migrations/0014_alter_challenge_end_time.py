# Generated by Django 4.1 on 2023-04-05 14:55

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('corival', '0013_alter_challenge_end_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='challenge',
            name='end_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 4, 6, 20, 25, 38, 569929)),
        ),
    ]
