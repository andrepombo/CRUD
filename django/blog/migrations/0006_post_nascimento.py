# Generated by Django 3.2 on 2022-02-01 13:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0005_remove_post_nascimento'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='nascimento',
            field=models.DateField(null=True),
        ),
    ]