from flask import Flask,jsonify
from multiprocessing import Process
app = Flask(__name__)
import sys
sys.path.insert(0,'/Users/matveyturkov/sasha/dialogue_bot')
from personal_constants import COM_ID
from bot import Vk_bot
from count_routes import select_svg_num

@app.route("/")
def hello():
	return "<h1 style='color:blue'>Hello There!</h1>"


@app.route('/get_location/<list:id>',methods=['GET'])
def get_location(id):
	location_id
	bot = Vk_bot(COM_ID)
	bot.write_msg(102876628,'hey')
	return jsonify(user_id)


if __name__ == '__main__':
	p1 = Process(target = app.run)
	bot = Vk_bot(COM_ID)
	p2 = Process(target = bot.init_longpoll)
	p1.start()
	p2.start()
	p1.join()
	p2.join()