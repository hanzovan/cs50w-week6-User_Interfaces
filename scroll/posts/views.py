from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Create your views here.
def index(request):
    return render(request, "posts/index.html")


# Create posts
def posts(request):
    # Get the start and end point from get or self create
    start = int(request.GET.get("start") or 0)
    end = int(request.GET.get("end") or (start + 9))

    # Create an empty list
    data = []

    # Create posts and add it to the list
    for i in range(start, (end + 1)):
        data.append(f"Post #{i}")

    # Render the list to json
    return JsonResponse( {
        "posts": data
    })