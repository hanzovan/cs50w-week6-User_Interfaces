from django.shortcuts import render
from django.http import HttpResponse, Http404

# Create your views here.
texts = ["This is the first paragraph", 
    "This is the second paragraph",
    "This is the third paragraph"
]

def index(request):
    return render(request, "singlepage/index.html")

def section(request, num):
    if 1 <= num <= 3:
        return HttpResponse(texts[(num - 1)])

    else:
        raise Http404("No such section")