to_write = []

with open("C:\\Users\\david\\Desktop\\ca326\\2019-ca326-kevin-david-spoileralert\\utils\\data.txt") as f:
	for line in f.readlines():
		line = line.strip().casefold()
		to_write.append(line)

with open("data.txt","w") as f:
	for line in to_write:
		f.write(line)
		f.write("\n")
