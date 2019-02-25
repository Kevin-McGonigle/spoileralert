# This program demonstrates how fast (or slow) IMDbPY is for our uses and why we've decided not to use it

from imdb import IMDb
from pprint import pprint
import time

start_time = time.time()

ia = IMDb() # create imdb object

mcu = ia.get_keyword("marvel-cinematic-universe", results=10) # gets all mcu films

actors = []

for film in mcu:						# iterates through each mcu film
	filmID = ia.get_imdbID(film)		# get the unique id of the film 
	film = ia.get_movie(filmID)			# get the unique film based off the film in order to access the cast of each film
	cast = film['cast']					# get the cast
	for person in cast:					
		actors.append(person)			# store each actor in the actors list

pprint(actors)
print("{} seconds".format(time.time() - start_time))