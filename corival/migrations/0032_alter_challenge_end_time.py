# Generated by Django 4.1 on 2023-06-02 18:57

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('corival', '0031_alter_challenge_end_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='challenge',
            name='end_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 6, 4, 0, 26, 59, 449708)),
        ),
    ]
