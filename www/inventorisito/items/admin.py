from django.contrib import admin

#Register your models here
from .models import Item
from .models import Vendor

admin.site.register(Item)
admin.site.register(Vendor)

