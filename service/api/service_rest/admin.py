from django.contrib import admin
from .models import Appointment, Technician
# Register your models here.


@admin.register(Appointment)
class Appointment(admin.ModelAdmin):
    pass

@admin.register(Technician)
class Technician(admin.ModelAdmin):
    pass
