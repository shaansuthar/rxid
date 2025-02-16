#!/usr/bin/env python

import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
from time import sleep
import pyrebase
import os
import random
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('API_KEY')
AUTH_DOMAIN = os.getenv('AUTH_DOMAIN')
DATABASE_URL = os.getenv('DATABASE_URL')
STORAGE_BUCKET = os.getenv('STORAGE_BUCKET')

# fix based on ours            
config = {     
  "apiKey": API_KEY,
  "authDomain": AUTH_DOMAIN,
  "databaseURL": DATABASE_URL,
  "storageBucket": STORAGE_BUCKET
}
# fix based on ours
firebase = pyrebase.initialize_app(config)

# Use GPIO pins
reader = SimpleMFRC522()
writer = SimpleMFRC522()
servo1 = 21
servo2 = 18
servo3 = 20

GPIO.cleanup()

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

GPIO.setup(servo1,GPIO.OUT)  
GPIO.setup(servo2,GPIO.OUT)  
GPIO.setup(servo3,GPIO.OUT)  

servo1_pwm = GPIO.PWM(servo1, 50)
servo2_pwm = GPIO.PWM(servo2, 50)
servo3_pwm = GPIO.PWM(servo3, 50)

servo1_pwm.start(0)
servo2_pwm.start(0)
servo3_pwm.start(0)

def read_rfid():
	print("Scan card")
	id, text = reader.read()
	print(id) 
	print(text)
	return id
        
def write_rfid():
	text = input("New Data:")
	print("Now place your tag to write.")
	writer.write(text)
	print("Written")

def servo_1(quantity):
	# Move the servo back and forth
	for i in range(quantity):
		print("Servo 1")
		servo1_pwm.ChangeDutyCycle(5)     # Changes the pulse width to 3 (so moves the servo)
		servo3_pwm.ChangeDutyCycle(10)     # Changes the pulse width to 3 (so moves the servo)
		sleep(1)                 # Wait 1 second
		servo1_pwm.ChangeDutyCycle(10)
		servo3_pwm.ChangeDutyCycle(5)    # Changes the pulse width to 12 (so moves the servo)
		sleep(1)


def servo_2(quantity):
	# Move the servo back and forth
	for i in range(quantity):
		print("Servo 2")
		servo2_pwm.ChangeDutyCycle(12)     # eject
		sleep(1)                 # Wait 1 second
		servo2_pwm.ChangeDutyCycle(10)    # vertical
		sleep(1)
             
try:
	db = firebase.database()
	rfid_id = db.child("rfid_id").get().val()
	quantity = db.child("User").child("Prescriptions").child("Quantity").get().val()
	
	print(rfid_id)
	
	
	
	
	while True:
		state = db.child("state").get().val()
		auth = db.child("auth").get().val()
		
		# no mode - off
		if state == 0:
			sleep(0.5)
			
		# write to rfid
		if state == 1:
			write_rfid()
			auth = db.update({"auth": False})
			state = db.update({"state": 0})
			
		# read to rfid	
		if state == 2:
			identity = read_rfid()
			auth = db.update({"auth": True})
			rfid_id = db.update({"rfid_id": identity})
			rfid_id = db.child("rfid_id").get().val()
			state = db.update({"state": 0})
			
		# pill dispenser
		if state == 3 and auth == True:
			identity = read_rfid()
			rfid_id = db.child("rfid_id").get().val()
			auth = db.update({"auth": False})
			state = db.update({"state": 0})
			servo_2(quantity)
			
			
		# pill dispenser - fun mode
		if state == 4 and auth == True:
			auth = db.update({"auth": False})
			identity = read_rfid()
			rfid_id = db.child("rfid_id").get().val
			state = db.update({"state": 0})
			servo_1(quantity)
			
		sleep(1)
			
except KeyboardInterrupt: 		
    pass
    
finally:
    servo1_pwm.stop()
    servo2_pwm.stop()
    GPIO.cleanup()
