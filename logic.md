1. As of now, script.tsx will be my backend?
2. pass information from script to the components and hopefully they render
3. So all i need to pass to the component is the items, nothing else



HOW THE APP WILL WORK BASICALLY
1. take all the songs from your library
2. take all the songs from your friend's library
(this might take a min so have some nice loading screen where it takes album covers and spins them in a circle or smth)
3. LINEAR SEARCH EACH SONG? sounds inefficient.
	- whoever has the least total liked songs will be the one we take the songs from and 
		compare it with the other library
4. Put all the songs that are in both librarys in a new array
5. render new array on screen



2 IDEAS TO CONNECT LIBRARYS
1. one phone. 
	- first user log in
	- cache their songs
	- second user log in
	- cache their songs
	- using the data in the cache, you search and compare them
	- push new array with the songs in common
	- display
	
2. two phones.
	- a lot more work for me  T-T
	- first guy presses start lobby button
	- they log in 
	- their library is saved in the server
	- using a link?? or smth the next guy comes and logs in
	- saves their data in the server
	- using their data in the server compare and search
	- push new array with the songs in common
	- display
	
my capabilites rn i would be happy if i get the first one working.
second would be ideal but see how lah

