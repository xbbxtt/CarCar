from .models import AutomobileVO, Technician, Appointment
from common.json import ModelEncoder


class AutomobileVOListEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold", "id"]


class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id", "id"]


class TechnicianDetailEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id", "id"]


class AppointmentListEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "vin",
        "reason",
        "customer",
        "technician",
        "status",
        "id",
    ]
    encoders = {
        "technician": TechnicianDetailEncoder(),
    }


class AppointmentDetailEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "vin",
        "reason",
        "customer",
        "technician",
        "status",
        "id",
    ]
    encoders = {
        "technician": TechnicianDetailEncoder(),
    }
