# Generated by Django 4.1.1 on 2023-01-04 07:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Monitoringurls', '0009_rename_url_id_urlshistory_url_name_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='urlshistory',
            old_name='url_name',
            new_name='urlslist',
        ),
    ]