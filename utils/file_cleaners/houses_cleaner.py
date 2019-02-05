# This program takes a text file and removes duplicates
# In this case I am using files that have been converted from JSON to text format

to_write = []

with open("houses.txt") as f:
	lines = f.readlines()
	for i in range(len(lines)):
		lines[i] = lines[i].strip()
		if lines[i].startswith("name"):
			line = lines[i].split(" ")
			to_write.append(" ".join(line[1:]))

to_write.remove("Include")


# Open a new file, write the new data
with open("houses_cleaned.txt", "w") as f:
	for name in to_write:
		f.write(name)
		f.write("\n")