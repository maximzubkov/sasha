def build_route(user_latitude,user_longitude):
	pushk_latitude = 55.747270
	pushk_longitude = 37.605180
	middle_latitude = round(((user_latitude+pushk_latitude) / 2),7)
	middle_longitude = round(((user_longitude+pushk_longitude) / 2),7)
	link_to_museum = 'https://yandex.ru/maps/?ll={}%2C{}&mode=routes&rtext={}%2C{}~{}%2C{}'.format(middle_longitude,middle_latitude,user_latitude,user_longitude,pushk_latitude,pushk_longitude)
	return (link_to_museum)
