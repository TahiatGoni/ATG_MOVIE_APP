from django.shortcuts import render
from movie_api.models import Movie
from rest_framework import views, status
from rest_framework import permissions
from movie_api.serializers import MovieSerializer
from rest_framework.response import Response
from rest_framework.authentication import BasicAuthentication
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist

class SignupView(views.APIView):

	def post(self, request):
		name = request.data.get('username')
		password = request.data.get('password')
		user = User.objects.create_user(username=name,
                                 password=password)

		user.save()

		return Response({"username": name, "password": password}, status=status.HTTP_201_CREATED)

class LoginView(views.APIView):
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [BasicAuthentication]

	def get(self, request):
		return Response(
			{"res": "Login Successful"},
			status=status.HTTP_200_OK)

# Create your views here.
class MovieView(views.APIView):
	"""
	API endpoint that allows users to be viewed or edited.
	"""
	serializer_class = MovieSerializer
	permission_classes = [permissions.IsAuthenticated]
	authentication_classes = [BasicAuthentication]

	def get(self, request, id=None):

		if id is None:

			data = Movie.objects.filter(user=request.user.id)
			# data = Movie.objects.all()

			serializer = MovieSerializer(data, many=True)

			return Response(serializer.data, status=status.HTTP_200_OK)

		try:
			data = Movie.objects.get(id=id)
		except ObjectDoesNotExist:
			return Response(
				{"res": "Object with id does not exists"}, 
				status=status.HTTP_400_BAD_REQUEST
			)

		serializer = MovieSerializer(data)

		return Response(serializer.data, status=status.HTTP_200_OK)


	def post(self, request):

		data = {
			'title': request.data.get('Title'), 
			'year': request.data.get('Year'), 
			'imdbID': request.data.get('imdbID'),
			'poster': request.data.get('Poster'),
			'user': request.user.id
		}

		serializer = MovieSerializer(data=data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)

		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



	def delete(self, request, id):
		'''
		Deletes the todo item with given todo_id if exists
		'''
		instance = Movie.objects.get(id=id)
		if not instance:
			return Response(
				{"res": "Object with id does not exists"}, 
				status=status.HTTP_400_BAD_REQUEST
			)
		instance.delete()
		return Response(
			{"res": "Object deleted!"},
			status=status.HTTP_200_OK)
