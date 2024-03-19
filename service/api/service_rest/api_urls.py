from django.urls import path

from .api_views import api_list_technicians

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    # path("shoes/<int:pk>/", api_show_shoe, name="api_show_shoe"),
    # path("bins/", api_list_bins, name="api_list_bins")
]
