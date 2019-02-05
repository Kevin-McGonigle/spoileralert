# This program takes a text file and removes duplicates
# In this case I am using files that have been converted from JSON to text format

with open("episdoes.txt") as f:
	lines = f.readlines()
	for i in range(len(lines)):
		lines[i] = lines[i].strip()
	lines = set(lines)


	# some test code
	seen = []
	for name in lines:
		assert(name not in seen)
		seen.append(name)


# Open a new file, write the new data
with open("Characters_cleaned.txt", "w") as f:
	for name in lines:
		f.write(name)
		f.write("\n")