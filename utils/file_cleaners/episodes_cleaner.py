# This program takes a text file and removes duplicates, used to clean characters text file so that 
# Used to clean characters text file so that it can be used to classify text to "related to GoT" or "not related to GoT"
# In this case I am using files that have already been converted from JSON to text format

to_write = []

with open("episodes.txt") as f:
	lines = f.readlines()
	for i in range(len(lines)):
		lines[i] = lines[i].strip()
		if lines[i].startswith("episodeTitle"):
			line = lines[i].split(" ")
			to_write.append(" ".join(line[1:]))


# Open a new file, write the new data
with open("episodes_cleaned.txt", "w") as f:
	for name in to_write:
		f.write(name)
		f.write("\n")
