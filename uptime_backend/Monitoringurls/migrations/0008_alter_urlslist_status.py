# Generated by Django 4.1.5 on 2023-01-03 11:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Monitoringurls', '0007_remove_urlshistory_url_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='urlslist',
            name='status',
            field=models.CharField(choices=[('ACTIVE', 'ACTIVE'), ('DOWN', 'DOWN')], max_length=6),
        ),
    ]