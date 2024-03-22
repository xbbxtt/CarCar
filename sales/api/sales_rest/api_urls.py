from django.urls import path

from .api_views import api_salespeople, api_sales, api_customers, api_customer, api_sale, api_salesperson


urlpatterns = [
    path("salespeople/", api_salespeople, name="api_salespeople"),
    path("salespeople/<int:pk>/", api_salesperson, name="api_salesperson"),
    path("salespeople/new/", api_salesperson, name="api_salesperson"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:pk>/", api_customer, name="api_customer"),
    path("customers/new/", api_customers, name="api_customers"),
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:pk>/", api_sale, name="api_sale"),
    path("sales/new/", api_sale, name="api_sale"),
]
