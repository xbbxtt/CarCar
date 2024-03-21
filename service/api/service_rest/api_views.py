from django.views.decorators.http import require_http_methods
from .models import AutomobileVO, Technician, Appointment
import json
from django.http import JsonResponse
from common.json import ModelEncoder
from .encoder import AppointmentDetailEncoder, AppointmentListEncoder, AutomobileVOListEncoder, TechnicianDetailEncoder, TechnicianListEncoder


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        try:
            technicians = Technician.objects.all()
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Page not exist"},
                status=404,
            )
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
        except json.decoder.JSONDecodeError:
                return JsonResponse(
                    {"message": "Invalid input"},
                    status=400,
                )
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


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                    {"message": "Technician does not exist"},
                    status=400,
                )
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=pk)
            technician.delete()
            return JsonResponse(
                technician,
                encoder=TechnicianDetailEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                    {"message": "Technician does not exist"},
                    status=400,
                )


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        try:
            appointments = Appointment.objects.all()
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "Page not found"},
                status=404,
            )
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
        except json.decoder.JSONDecodeError:
            return JsonResponse(
                {"message": "Invalid input"},
                status=400,
                )
        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
            content["status"] = "Created"
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Technician not found"},
                status=400,
            )

        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                    {"message": "Appointment does not exist"},
                    status=400,
                )
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=pk)
            appointment.delete()
            return JsonResponse(
                appointment,
                encoder=AppointmentDetailEncoder,
                safe=False,
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                    {"message": "Appointment does not exist"},
                    status=400,
                )


@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.status = "canceled"
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
                {"message": "Appointment does not exist"},
                status=400,
            )


@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.status = "finished"
        appointment.save()
        return JsonResponse(
            appointment,
            encoder=AppointmentDetailEncoder,
            safe=False,
        )
    except Appointment.DoesNotExist:
        return JsonResponse(
                {"message": "Appointment does not exist"},
                status=400,
            )


@require_http_methods(["GET"])
def api_list_automobileVOs(request):
    try:
        automobileVOs = AutomobileVO.objects.all()
    except AutomobileVO.DoesNotExist:
        return JsonResponse(
            {"message": "Page not exist"},
            status=404,
        )
    return JsonResponse(
        {"automobileVOs": automobileVOs},
        encoder=AutomobileVOListEncoder,
    )
