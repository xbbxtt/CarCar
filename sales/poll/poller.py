import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()


from sales_rest.models import AutomobileVO


def get_automobile():
    url = "http://inventory-api:8000/api/automobiles/"
    response = requests.get(url)
    content = json.loads(response.content)
    for auto in content["autos"]:
        AutomobileVO.objects.update_or_create(
            vin=auto["vin"],
            defaults={"sold": auto["sold"]}

        )


def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_automobile()
        except Exception as e:
            print(e, file=sys.stderr)

        time.sleep(5)


if __name__ == "__main__":
    poll()
