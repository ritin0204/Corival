# Generated by Django 4.1 on 2023-09-10 17:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('corival', '0036_alter_challenge_end_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='challenge',
            name='end_time',
            field=models.DateTimeField(default=datetime.datetime(2023, 9, 11, 23, 3, 0, 228969)),
        ),
    ]
