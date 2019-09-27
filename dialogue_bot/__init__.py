from personal_constants import COM_ID
from bot import Vk_bot


bot = Vk_bot(COM_ID)
bot.init_longpoll()