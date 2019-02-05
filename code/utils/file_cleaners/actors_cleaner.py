to_write = []

with open("actors.txt", encoding="utf8") as f:
	for line in f.readlines():
		line = line.strip().split()
		if line[0] == "actorName":
			to_write.append(" ".join(line[1:]).casefold())

to_write = set(to_write)

with open("actors_cleaned", "w") as f:
	for name in to_write:
		f.write(name)
		f.write("\n")