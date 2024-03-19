from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Appointment
import json
from django.http import JsonResponse
from common.json import ModelEncoder


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["last_name", "employee_id"]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id", "id"]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "vin",
        "status",
    ]


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "vin",
        "reason",
        "customer",
        "technician",
        "status",
    ]
    encoders = {
        "technician": TechnicianDetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        try:
            technicians = Technician.objects.all()
            print("-----------------------------------", technicians)
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "No technician"},
                status=400,
            )
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            Technician.objects.get(employee_id=content["employee_id"])
        except Technician.DoesNotExist:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        return JsonResponse(
            {"message": "Employee id already exists!"},
            status=400,
        )
