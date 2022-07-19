# Python program for the above approach

# Function to form edge between
# two vertices src and dest
from typing import List
from sys import maxsize
from collections import deque

def add_edge(adj: List[List[int]],
			src: int, dest: int) -> None:
	adj[src].append(dest)
	adj[dest].append(src)

# Function which finds all the paths
# and stores it in paths array
def find_paths(paths: List[List[int]], path: List[int],
			parent: List[List[int]], n: int, u: int) -> None:
	# Base Case
	if (u == -1):
		paths.append(path.copy())
		return

	# Loop for all the parents
	# of the given vertex
	for par in parent[u]:
		print(parent[u])

		# Insert the current
		# vertex in path
		path.append(u)

		# Recursive call for its parent
		find_paths(paths, path, parent, n, par)

		# Remove the current vertex
		path.pop()

# Function which performs bfs
# from the given source vertex
def bfs(adj: List[List[int]],
		parent: List[List[int]], n: int,
		start: int) -> None:

	# dist will contain shortest distance
	# from start to every other vertex
	dist = [maxsize for _ in range(n)]
    
	q = deque()

	# Insert source vertex in queue and make
	# its parent -1 and distance 0
	q.append(start)
	parent[start] = [-1]
	dist[start] = 0

	# Until Queue is empty
	while q:
		u = q[0]
		q.popleft()
		for v in adj[u]:
			if (dist[v] > dist[u] + 1):

				# A shorter distance is found
				# So erase all the previous parents
				# and insert new parent u in parent[v]
				dist[v] = dist[u] + 1
				q.append(v)
				parent[v].clear()
				parent[v].append(u)

			elif (dist[v] == dist[u] + 1):

				# Another candidate parent for
				# shortes path found
				parent[v].append(u)

# Function which prints all the paths
# from start to end
def print_paths(adj: List[List[int]], n: int,
				start: int, end: int) -> None:
                
                
	paths = []
	path = []
	parent = [[] for _ in range(n)]

	# Function call to bfs
	bfs(adj, parent, n, start)

	# Function call to find_paths
	find_paths(paths, path, parent, n, end)
	print(paths)
	for v in paths:

		# Since paths contain each
		# path in reverse order,
		# so reverse it
		v = reversed(v)

		# Print node for the current path
		for u in v:
			print(u, end = " ")
		print()

# Driver Code
if __name__ == "__main__":

	# Number of vertices
	n = 6

	# array of vectors is used
	# to store the graph
	# in the form of an adjacency list
	adj = [[] for _ in range(n)]

	# Given Graph
	add_edge(adj, 0, 1)
	add_edge(adj, 0, 2)
	add_edge(adj, 1, 3)
	add_edge(adj, 1, 4)
	add_edge(adj, 2, 3)
	add_edge(adj, 3, 5)
	add_edge(adj, 4, 5)

	# Given source and destination
	src = 2
	dest = 4

	# Function Call
	print_paths(adj, n, src, dest)

# This code is contributed by sanjeev2552
