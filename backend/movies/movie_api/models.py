from django.conf import settings
from django.db import models

# Create your models here.

#we assume the front end directly works with the OMDB API
#we do not save much info in the backend since we can retrieve from the OMDB API when needed
class Movie(models.Model):
	title = models.TextField()
	year = models.IntegerField()
	poster = models.TextField(null=True)
	imdbID = models.CharField(max_length=20)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	