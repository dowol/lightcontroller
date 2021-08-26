/*
 * LIGHT CONTROLLER
 * Written by Dowol
 * https://github.com/dowol/lightctl-controller
 * 
 */

#define ROOM1  9
#define ROOM2 10
#define ROOM3 11
#define ROOM4 12

int stat[4] = { LOW, LOW, LOW, LOW };

// Initialize the device
void setup() {
  // Initialize the physical ports
  pinMode(ROOM1, OUTPUT);
  pinMode(ROOM2, OUTPUT);
  pinMode(ROOM3, OUTPUT);
  pinMode(ROOM4, OUTPUT);
  digitalWrite(ROOM1, LOW);
  digitalWrite(ROOM2, LOW);
  digitalWrite(ROOM3, LOW);
  digitalWrite(ROOM4, LOW);

  // Initialize the serial port
  Serial.begin(9600); 

  shutDown();
}

void loop() {
  if(Serial.available() > 0) {
    int flag = Serial.parseInt();
    // turn off all
    if(flag == 0) {
      shutDown();
    }
    // process the commend
    else{
      int room = flag / 10;
      int cmd = flag % 10;
      switch(cmd){
        case 0:
        turnOff(room);
        break;
        case 1:
        turnOn(room);
        break;
        case 9:
        Serial.print(getStatus(room));
        break;
      }
    }
  }
}

void turnOn(int room){
  if(room > 4 || room < 1) return;
  digitalWrite(room + 8, HIGH);
  stat[room - 1] = HIGH;
}

void turnOff(int room){
  if(room > 4 || room < 1) return;
  digitalWrite(room + 8, LOW);
  stat[room - 1] = LOW;
}

int getStatus(int room){
  if(room > 4 || room < 1) return -1;
  return stat[room - 1];
}

void shutDown(){
  for(int i = 1; i <= 4; i++){
    turnOff(i);
  }
}
