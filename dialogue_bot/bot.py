from personal_constants import  ACCESS_TOKEN
from commands_text import INFO,LINK
from route_to_museum import build_route
from interfaces import interface1,interface2
import vk_api
from vk_api.bot_longpoll import VkBotLongPoll, VkBotEventType

class Vk_bot:
	def __init__(self,community_id):
		self.community_id = community_id
		self.vk_session = vk_api.VkApi(token=ACCESS_TOKEN)
		self.commands = ['ИНФО','ССЫЛКА']

	def write_msg(self,user_id,message):
		self.vk_session.method('messages.send', {'user_id': user_id, 'message': message})

	def write_command_answer(self,user_id,message):
		if message == self.commands[0]:
			self.write_msg(user_id,INFO)
		elif message == self.commands[1]:
			self.write_msg(user_id,LINK)
		else:
			self.write_msg(user_id,'сам {}'.format(message))

	def init_longpoll(self):
		self.longpoll = VkBotLongPoll(self.vk_session, self.community_id)
		for event in self.longpoll.listen():
			if event.type == VkBotEventType.MESSAGE_NEW:
				self.user_id = event.obj.from_id
				if event.obj.attachments == []:
					if event.obj.text != '':
						interface1(event.obj.text)
						message_text = event.obj.text.upper()
						print(message_text)
						self.write_command_answer(self.user_id,message_text)
					else:
						user_latitude = event.obj.geo['coordinates']['latitude']
						user_longitude = event.obj.geo['coordinates']['longitude']
						link = build_route(user_latitude,user_longitude)
						self.write_msg(self.user_id,link)
				else:
					if event.obj.attachments[0]['type'] == 'photo':
						self.write_msg(self.user_id,'Wrong format')
					elif event.obj.attachments[0]['type'] == 'audio_message':
						audio_message_ogg = event.obj.attachments[0]['audio_message']['link_ogg']
						interface2(audio_message_ogg)
						self.write_msg(174815254,audio_message_ogg) #bulat tests
						print(audio_message_ogg)




