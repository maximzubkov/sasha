import re
from pymystem3 import Mystem
import urllib.request
import json
import requests

COMMANDS = {
    0: ['как пройти', 'как проходить', 'как добраться', 'как добираться', 'как находить', 'где находиться', 'построить маршрут', 'строить маршрут'],
    1: ['сколько стоить билет', 'сколько стоять билет'],
    2: ['показывать'],
    3: ['рассказывать'],
    
}


POSSIBLE_SLOTS = {
    0: ['туалет', 'выставка', 'галерея', 'картина', 'статуя'],
    1: ['выставка', 'галерея'],
    2: ['выставка', 'галерея', 'картина', 'статуя'],
    3: ['выставка', 'галерея', 'картина', 'статуя'],   
}

def filter_array(arr):
    return [x for x in arr if ((x != ' ') and (x != '\n') and (x != ', ') and (x != ''))]

class Parser:
    def __init__(self, commands, possible_slots):
        self.commands = commands
        self.cmd_id = None
        self.slot1 = None
        self.slot2 = None
        self.possible_slots = possible_slots
    
    def parse(self, text_to_parse):
        text_to_parse_arr = text_to_parse.split(' ')
        text_lemmatized_arr = filter_array(mystem.lemmatize(text_to_parse))
        text_lemmatized = ' '.join(text_lemmatized_arr)
        #print(text_lemmatized_arr)
        for command_num in self.commands:
            for cmd_example in self.commands[command_num]:
                search_result = re.search(cmd_example, text_lemmatized) #result in lemmatized text
                if not isinstance(search_result, type(None)):
                    self.cmd_id = command_num
                    rest = text_lemmatized[search_result.end():]
                    break
        #print('DETECTED COMMAND : ', self.commands[self.cmd_id])
        if isinstance(self.cmd_id, int):
            for slot_example in self.possible_slots[self.cmd_id]:
                search_result = re.search(slot_example, rest)
                if not isinstance(search_result, type(None)):
                    self.slot1 = slot_example
                    self.slot2 = rest[search_result.end():]
                    break
        return self.cmd_id, (self.slot1, self.slot2)
    
    
class Commandir:
    def __init__(self, commands, possible_slots):
        self.FOLDER_ID = "b1gv2cbkq4gh2q0jnpol" # Идентификатор каталога
        self.IAM_TOKEN = 'CggaATEVAgAAABKABIMqRefPkCyc-QkR5SQKV1mSA5MQbMbMO05qNl_HKxXJDUa-kcfZuT_WWVPI6eibBhSdr6ThG0yFHFZMir93Bg4xSL1gOOFvhnHATJ5L2-XfqixH1XRttuFcJRMFELiqB9q4qqwT7-P3a46r7-q-gz_74Ger5kCOLONo-OVzR9DZl_1E_1w9SYrADikcn7XoBH0qivHEp5OO6g_n6ycrSwLf4LVu9ozowD-D79ppvDACnd162gYFw0-Aeud_HWzMwFziyWLuUQFy2pMSI-9dwFOBj5REDGIPYPrM00q-Toi6cxEDldb3g9cj7RrEDqUHMmNo-d7Mmmn6S5lAvzu2EgJa5hfRq9MRla6aMTa9dm442aby_TPGurG0WLZibK3FUTtqasXkqjFV64ZL260Lj9vVfEqzv4B7sVGHXSl2BqUW8OB1JyRQUsmFydE_rM5h_IMeNTOWqkWk1PI2bzNOrxxsu97yojVMgdV4puueOj4YaMJvj6U50dfB07oIHaGDhkQUK6asqtaARaO1yk3rcOHIrtIfC0CdtnA0Wt8LIUFc62PnhRG916Ii1vqSC--rDFFEg_30R4vB9xSiupzTz0FWgfwW-kuH6p7fQVI9s4DG771w8VyubIeMMyutYYwu-6KOmAEbH5JiLb4thHyiL0kuTqWAFXvQ3IGhy3t-xgUdGmIKIDc0ZmY3ZGRjYjZmMDRiZWViMzBiZDhlZTZkZGZmNjY1EIv0uOwFGMvFu-wFIiAKFGFqZXJqZWdqajVuZG0ya2kyZm82EghidXNlaW5vdloAMAI4AUoIGgExFQIAAABQASDxBA' # IAM-токен
        self.text_to_parse = ''
        self.text_parser = Parser(commands, possible_slots)
        self.slots = None
        self.cmd_id = None
        self.commands = commands
        self.possible_slots = possible_slots
        self.json_dict = None
        self.params = "&".join([
        "topic=general",
        "folderId=%s" % self.FOLDER_ID,
        "lang=ru-RU"
        ])
        
    def get_audio(self, path_to_audio):
        data = requests.get(path_to_audio)

        url = urllib.request.Request("https://stt.api.cloud.yandex.net/speech/v1/stt:recognize?%s" % self.params, data=data)
        url.add_header("Authorization", "Bearer %s" % self.IAM_TOKEN)
        responseData = urllib.request.urlopen(url).read().decode('UTF-8')
        decodedData = json.loads(responseData)
        if decodedData.get("error_code") is None:
            self.text_to_parse = decodedData.get("result")
        
    def get_text(self, text):
        self.text_to_parse = text
        
    def get_cmd_and_slots_from_text(self):
        #TODO 
        self.cmd_id, self.slots = self.text_parser.parse(self.text_to_parse)
        
        self.json_dict = {
            'Command id': self.cmd_id,
            'Command name': self.commands[self.cmd_id],
            'Slots': self.slots
        }
        
        with open(str(time.time()).split('.')[0] + '.json', 'w+') as f:
            json.dump(self.json_dict, f)
        
    def print_text(self):
        print("TEXT : ", self.text_to_parse)
        
    def print_text_cmd_slots(self):
        print("TEXT : ", self.text_to_parse)
        if not issubclass(type(self.cmd_id), type(None)):
            print("COMMAND : ", self.commands[self.cmd_id])
            print("SLOT : ", self.slots)
        else:
            print("No commands and slots detected")
    
    
    
#EXAMPLE
# comrad = Commandir(COMMANDS, POSSIBLE_SLOTS)
# comrad.get_audio('https://psv4.userapi.com/c853028//u174815254/audiomsg/d1/b87fb98210.ogg')
# comrad.get_cmd_and_slots_from_text() #here file is created
# comrad.print_text_cmd_slots()
