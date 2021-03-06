# Generated by Django 4.0 on 2022-05-21 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('corival', '0004_competition_is_practice'),
    ]

    operations = [
        migrations.RenameField(
            model_name='competition',
            old_name='endTime',
            new_name='end_time',
        ),
        migrations.RenameField(
            model_name='competition',
            old_name='startTime',
            new_name='start_time',
        ),
        migrations.AddField(
            model_name='competition',
            name='archive',
            field=models.BooleanField(default=False),
        ),
    ]
