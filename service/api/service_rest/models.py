from django.db import models


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=50)

    class Meta:
        ordering = ("employee_id",)


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=50)
    sold = models.BooleanField()


class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=50)
    customer = models.CharField(max_length=50)
    vin = models.CharField(max_length=50)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.CASCADE,
    )
    class Meta:
        ordering = ("date_time",)
