# Generated by Django 4.0 on 2022-06-22 03:44

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('corival', '0013_alter_competition_questions_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='competition',
            name='end_time',
            field=models.DateTimeField(default=datetime.datetime(2022, 6, 23, 9, 14, 0, 404025)),
        ),
        migrations.AlterField(
            model_name='competition',
            name='questions',
            field=models.ManyToManyField(related_name='questions', to='corival.Questions'),
        ),
        migrations.AlterField(
            model_name='competition',
            name='start_time',
            field=models.DateTimeField(default=datetime.datetime(2022, 6, 22, 9, 14, 0, 404025)),
        ),
    ]