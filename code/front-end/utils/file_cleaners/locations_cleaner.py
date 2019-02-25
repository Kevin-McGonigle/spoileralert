to_write = []
ignore = ["regions", "sublocation"]

with open("locations.txt") as f:
	lines = f.readlines()
	for i in range(len(lines)):
		line = lines[i].strip().split()
		if line:
			if line[0] not in ignore:
				if line[0] == "subLocation":
					pass
				else:
					if line[0] == "location":
						to_write.append(" ".join(line[1:]))
					else:
						to_write.append(" ".join(line))

del to_write[0]

with open("locations_cleaned.txt", "w") as f:
	for line in to_write:
		f.write(line)
		f.write("\n")

