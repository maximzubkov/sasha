from dijkstar import Graph,find_path
import pickle
from names_dict import NAMES,NAMES_SVG
import random

def count_djicstra(values):
	tmp_graph = Graph()
	for elem in values:
		for nbhr in elem[1].split(','):
			tmp_graph.add_edge(int(elem[0]),int(nbhr),1)
	tmp_graph.dump('./djicstra_graph/3_gallery')


def init_djicstra():
	with open('graphs.pickle','rb') as file:
		global_file = pickle.load(file)
	first_list = list()
	res = list()
	for elem in global_file:
		for dic in elem:
			if dic['hn']!='':
				tmp_list=list()
				tmp_list.append(dic['id'])
				tmp_list.append(dic['hn'])
			res.append(tmp_list)
	print(res)
	# count_djicstra(first_list)


def get_position_name(name_num,id_circle):
	with open('graphs.pickle','rb') as file:
		global_file = pickle.load(file)
	res_list = list()
	for dic in global_file[name_num]:
		if int(dic['id']) == int(id_circle):
			res_list.append(float(dic['x']))
			res_list.append(float(dic['y']))
		else:
			pass
	return res_list

def get_loc_name(name_num):
	return NAMES[name_num]

def get_routes(name_num,point1,point2):
	global_graph = Graph()
	loc_name = get_loc_name(name_num)
	global_graph = global_graph.load('./djicstra_graph/{}'.format(loc_name))
	graph_route = find_path(global_graph,point1,point2).nodes
	final_list = list()
	for elem in graph_route:
		final_list.append((get_position_name(name_num,elem)))
	return(final_list)

def count_lines(list_of_coords):
	list_of_lines_svg = []
	for i in range(len(list_of_coords)-1):
		line = '<line class="st" x1="{}" y1="{}" x2="{}" y2="{}"/>'.format(list_of_coords[i][0],list_of_coords[i][1],list_of_coords[i+1][0],list_of_coords[i+1][1])
		list_of_lines_svg.append(line)
	return(list_of_lines_svg)
	# print(list_of_lines_svg)

def generate_svg(list_of_lines_svg,name_num):
	with open('./../map_navigate/{}'.format(NAMES_SVG[name_num]),'r') as file_in,open('./tmp_map_{}'.format(NAMES_SVG[name_num]),'a') as file_out:
		file_in_lines = file_in.readlines()[:-1]
		file_out_lines = file_in_lines
		for elem in list_of_lines_svg:
			file_out_lines.append(elem)
		file_out_lines.append('</svg>')
		file_out_lines = "\n".join(file_out_lines)
		file_out.write(file_out_lines)


def select_svg_num(point_in,point_out):
	if (point_in // 100) != (point_out // 100):
		if ((point_in // 100) == 1) and ((point_out // 100) == 2):
			list_tmp = count_lines(get_routes(0,point_in,150))
			generate_svg(list_tmp,0)
			list_tmp = count_lines(get_routes(1,240,point_out))
			generate_svg(list_tmp,1)
		elif ((point_in // 100) == 2) and ((point_out // 100) == 1):
			list_tmp = count_lines(get_routes(1,point_in,240))
			generate_svg(list_tmp,1)
			list_tmp = count_lines(get_routes(0,150,point_out))
			generate_svg(list_tmp,0)
		elif ((point_in // 100) == 3) and ((point_out // 100) == 4):
			list_tmp = count_lines(get_routes(2,point_in,337))
			generate_svg(list_tmp,2)
			list_tmp = count_lines(get_routes(3,429,point_out))
			generate_svg(list_tmp,3)
		elif ((point_in // 100) == 4) and ((point_out // 100) == 3):
			list_tmp = count_lines(get_routes(3,point_in,429))
			generate_svg(list_tmp,3)
			list_tmp = count_lines(get_routes(4,337,point_out))
			generate_svg(list_tmp,2)
		else:
			print('bad route')
	else:
		list_tmp = count_lines(get_routes((point_in // 100)-1,point_in,point_out))
		generate_svg(list_tmp,(point_in // 100)-1)


print(random.randint(1,100))

select_svg_num(110,224)

