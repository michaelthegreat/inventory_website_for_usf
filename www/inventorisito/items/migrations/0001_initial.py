# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(default=b'', max_length=250)),
                ('unit_price', models.DecimalField(default=0.0, max_digits=32, decimal_places=16)),
                ('item_number', models.CharField(default=b'', max_length=250)),
                ('order_id', models.CharField(default=b'', max_length=250)),
                ('weblink', models.CharField(default=b'', max_length=250)),
                ('transaction_id', models.CharField(default=b'', max_length=250)),
                ('quantity', models.IntegerField(default=0)),
                ('upc_code', models.CharField(default=b'', max_length=250)),
                ('image_source', models.CharField(default=b'', max_length=250)),
                ('date_of_purchase', models.DateTimeField(verbose_name=b'date of purchase')),
            ],
        ),
        migrations.CreateModel(
            name='Vendor',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(default=b'', max_length=250)),
                ('item', models.ForeignKey(to='items.Item')),
            ],
        ),
    ]
