# CarCar

Team:

* Shiran Xiao - Automobile Service microservice
* Person 2 - Which microservice?

## Design


![Image](./image/Design.png)


## Service microservice


Get start:

Please run following three commond to start:

docker volume create two-shot-pgdata
docker-compose build
docker-compose up


The API:

The application comes with a fully-accessible Service API that can keep track of the automobile service for the automobile dealership.

It has fully functional RESTful endpoints for the following entities:

    Technician: the technician that works on the service
    Appointment: the appointment for the automobile service by the technician
    AutomobileVO: the value object stores VIN and sold information polled from inventory microservice

The following documentation describes the available functionality in the Service API.


Technician:

From Insomnia and your browser, you can access the technician endpoints at the following URLs.

Action 	                        Method 	URL
List technician 	            GET 	http://localhost:8080/api/technicians/
Create a technician 	        POST 	http://localhost:8080/api/technicians/
Get a specific technician 	    GET 	http://localhost:8080/api/technicians/:id/
Delete a specific technician 	DELETE 	http://localhost:8080/api/technicians/:id/

Creating a technician requires the technician's first_name, last_name, and employee_id.

{
	"first_name": "Ann",
	"last_name": "Tyler",
	"employee_id": "009"
}

The return value of creating and getting a single technician is its first_name, last_name, employee_id and id.

{
	"first_name": "Ann",
	"last_name": "Tyler",
	"employee_id": "009"
	"id": 27
}

The list of technicians is a dictionary with the key "technicians" set to a list of technicians.

{
	"technicians": [
		{
            "first_name": "Ann",
            "last_name": "Tyler",
            "employee_id": "009"
            "id": 27
		},
    ]
}


Appointment:

From Insomnia and your browser, you can access the appintment endpoints at the following URLs.

Action 	                        Method 	URL
List appintment 	            GET 	http://localhost:8080/api/appintments/
Create a appintment 	        POST 	http://localhost:8080/api/appintments/
Get a specific appintment 	    GET 	http://localhost:8080/api/appintments/:id/
Delete a specific appintment 	DELETE 	http://localhost:8080/api/appintments/:id/
Cancel a specific appintment 	PUT 	http://localhost:8080/api/appintments/:id/cancel/
Finish a specific appintment 	PUT 	http://localhost:8080/api/appintments/:id/finish/

Creating a appintment requires the appintment's vin, date_time, reason, customer and technician.

{
	"vin": "1C3CC5FB2AN120174",
	"date_time": "2024-03-20 12:24",
	"reason": "oil change" ,
	"customer": "Peter parker" ,
	"technician": 27
}

The return value of creating and getting a single appintment is its information and technician information.

{
	"date_time": "2024-03-20 12:24",
	"vin": "1C3CC5FB2AN120174",
	"reason": "oil change",
	"customer": "Peter parker",
	"technician": {
        "first_name": "Ann",
        "last_name": "Tyler",
        "employee_id": "009"
        "id": 27
	},
	"status": "Created",
	"id": 38
}

The list of appintments is a dictionary with the key "appintments" set to a list of appintments.

{
	"appointments": [
        {
            "date_time": "2024-03-20 12:24",
            "vin": "1C3CC5FB2AN120174",
            "reason": "oil change",
            "customer": "Peter parker",
            "technician": {
                "first_name": "Ann",
                "last_name": "Tyler",
                "employee_id": "009"
                "id": 27
            },
            "status": "Created",
            "id": 38
        }
    ]
}

Cancelling a appintment changes appintment's status from "Created" to "canceled".

{
	"date_time": "2024-03-20 12:24",
	"vin": "1C3CC5FB2AN120174",
	"reason": "oil change",
	"customer": "Peter parker",
	"technician": {
        "first_name": "Ann",
        "last_name": "Tyler",
        "employee_id": "009"
        "id": 27
	},
	"status": "canceled",
	"id": 38
}

Finishing a appintment changes appintment's status from "Created" to "finished".

{
	"date_time": "2024-03-20 12:24",
	"vin": "1C3CC5FB2AN120174",
	"reason": "oil change",
	"customer": "Peter parker",
	"technician": {
        "first_name": "Ann",
        "last_name": "Tyler",
        "employee_id": "009"
        "id": 27
	},
	"status": "finished",
	"id": 38
}


AutomobileVO:

From Insomnia and your browser, you can access the AutomobileVO endpoints at the following URLs.

Action 	                        Method 	URL
List AutomobileVO 	            GET 	http://localhost:8080/api/automobileVOs/

The list of automobileVO is a dictionary with the key "automobileVOs" set to a list of automobileVOs.

{
	"automobileVOs": [
		{
			"vin": "1C3CC5FB2AN120174",
			"sold": false,
			"id": 1
		}
	]
}


Frond end:

You can access pages through following URLs.

Content                         URL
MainPage                        http://localhost:3000/
Show technician list            http://localhost:3000/technicians/
Create a new technician         http://localhost:3000/technicians/new/
Show a specific technician      http://localhost:3000/technicians/:id/
Show appointment list           http://localhost:3000/appointments/
Create a new appointment        http://localhost:3000/appointments/new/
Show service history list       http://localhost:3000/history/


## Sales microservice

Explain your models and integration with the inventory
microservice, here.


## Inventory microservice


The API

The application comes with a fully-accessible Inventory API that can keep track of the automobile inventory for the automobile dealership.

It has fully functional RESTful endpoints for the following entities:

    Manufacturer: the company that manufactures the automobile
    VehicleModel: the model of a vehicle created by the manufacturer
    Automobile: the actual automobile of a specific vehicle model

The following documentation describes the available functionality in the Inventory API.
Manufacturers

From Insomnia and your browser, you can access the manufacturer endpoints at the following URLs.

Action 	                        Method 	URL
List manufacturers 	            GET 	http://localhost:8100/api/manufacturers/
Create a manufacturer 	        POST 	http://localhost:8100/api/manufacturers/
Get a specific manufacturer 	GET 	http://localhost:8100/api/manufacturers/:id/
Update a specific manufacturer 	PUT 	http://localhost:8100/api/manufacturers/:id/
Delete a specific manufacturer 	DELETE 	http://localhost:8100/api/manufacturers/:id/

Creating and updating a manufacturer requires only the manufacturer's name.

{
  "name": "Chrysler"
}

The return value of creating, getting, and updating a single manufacturer is its name, href, and id.

{
  "href": "/api/manufacturers/1/",
  "id": 1,
  "name": "Chrysler"
}

The list of manufacturers is a dictionary with the key "manufacturers" set to a list of manufacturers.

{
  "manufacturers": [
    {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  ]
}

Vehicle models

From Insomnia and your browser, you can access the vehicle model endpoints at the following URLs.

Action 	                            Method 	URL
List vehicle models 	            GET 	http://localhost:8100/api/models/
Create a vehicle model 	            POST 	http://localhost:8100/api/models/
Get a specific vehicle model 	    GET 	http://localhost:8100/api/models/:id/
Update a specific vehicle model 	PUT 	http://localhost:8100/api/models/:id/
Delete a specific vehicle model 	DELETE 	http://localhost:8100/api/models/:id/

Creating a vehicle model requires the model name, a URL of an image, and the id of the manufacturer.

{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer_id": 1
}

Updating a vehicle model can take the name and/or the picture URL. It is not possible to update a vehicle model's manufacturer.

{
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg"
}

Getting the detail of a vehicle model, or the return value from creating or updating a vehicle model, returns the model's information and the manufacturer's information.

{
  "href": "/api/models/1/",
  "id": 1,
  "name": "Sebring",
  "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
  "manufacturer": {
    "href": "/api/manufacturers/1/",
    "id": 1,
    "name": "Daimler-Chrysler"
  }
}

Getting a list of vehicle models returns a list of the detail information with the key "models".

{
  "models": [
    {
      "href": "/api/models/1/",
      "id": 1,
      "name": "Sebring",
      "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
      "manufacturer": {
        "href": "/api/manufacturers/1/",
        "id": 1,
        "name": "Daimler-Chrysler"
      }
    }
  ]
}

Automobile information

From Insomnia and your browser, you can access the automobile endpoints at the following URLs.

Note: The identifiers for automobiles in this API are not integer ids. They are the Vehicle Identification Number (VIN) for the specific automobile.

Action 	                        Method 	URL
List automobiles 	            GET 	http://localhost:8100/api/automobiles/
Create an automobile 	        POST 	http://localhost:8100/api/automobiles/
Get a specific automobile 	    GET 	http://localhost:8100/api/automobiles/:vin/
Update a specific automobile 	PUT 	http://localhost:8100/api/automobiles/:vin/
Delete a specific automobile 	DELETE 	http://localhost:8100/api/automobiles/:vin/

You can create an automobile with its color, year, VIN, and the id of the vehicle model.

{
  "color": "red",
  "year": 2012,
  "vin": "1C3CC5FB2AN120174",
  "model_id": 1
}

As noted, you query an automobile by its VIN. For example, you would use the URL

http://localhost:8100/api/automobiles/1C3CC5FB2AN120174/

to get the details for the car with the VIN "1C3CC5FB2AN120174". The details for an automobile include its model and manufacturer.

{
  "href": "/api/automobiles/1C3CC5FB2AN120174/",
  "id": 1,
  "color": "yellow",
  "year": 2013,
  "vin": "1C3CC5FB2AN120174",
  "model": {
    "href": "/api/models/1/",
    "id": 1,
    "name": "Sebring",
    "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
    "manufacturer": {
      "href": "/api/manufacturers/1/",
      "id": 1,
      "name": "Daimler-Chrysler"
    }
  },
  "sold": false
}

You can update the color, year, and sold status of an automobile.

{
  "color": "red",
  "year": 2012,
  "sold": true
}

Getting a list of automobiles returns a dictionary with the key "autos" set to a list of automobile information.

{
  "autos": [
    {
      "href": "/api/automobiles/1C3CC5FB2AN120174/",
      "id": 1,
      "color": "yellow",
      "year": 2013,
      "vin": "1C3CC5FB2AN120174",
      "model": {
        "href": "/api/models/1/",
        "id": 1,
        "name": "Sebring",
        "picture_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Chrysler_Sebring_front_20090302.jpg/320px-Chrysler_Sebring_front_20090302.jpg",
        "manufacturer": {
          "href": "/api/manufacturers/1/",
          "id": 1,
          "name": "Daimler-Chrysler"
        }
      },
      "sold": false
    }
  ]
}


Frond end:

You can access pages through following URLs.

Content                         URL
MainPage                        http://localhost:3000/
Show manufacturer list          http://localhost:3000/manufacturers/
Create a new manufacturer       http://localhost:3000/manufacturers/new/
Show vehicle model list         http://localhost:3000/vehiclemodels/
Create a new vehicle model      http://localhost:3000/vehiclemodels/new/
Show automobile list            http://localhost:3000/automobiles/
Create a new automobile         http://localhost:3000/automobiles/new/
