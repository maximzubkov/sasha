import re
import os

graphs = []
for file in os.listdir('/Users/alexander/sasha/map_navigate/'):
    graph = []
    if file[-3:] == 'svg':
        with open('/Users/alexander/sasha/map_navigate/' + file, 'r') as f:
            for line in f.readlines():
                if re.match('<circle', line):
                    dot = {}
                    arr = line.split('"')
                    dot["x"] = arr[3]
                    dot["y"] = arr[5]
                    dot["id"] = arr[9]
                    dot["nbgh"] = arr[11]
                    dot["hn"] = arr[13]
                    graph.append(dot)
        graphs.append(graph)
        
with open('/Users/alexander/sasha/map_navigate/graphs.pickle', 'wb') as f:
    pickle.dump(graphs, f)