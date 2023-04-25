#include <RTClib.h>
#include <Wire.h>

float BIAS=510.7;
uint32_t step;
DateTime dt(0,1,1,0,0,0);

void setup() {
  Serial.begin(9600);
  step = 0;
  int AcsValue=0;
  long Samples=0;
  //dt = F(__TIME__);
  }

DateTime addMilliseconds() {
  uint32_t msBegin = millis();
  uint32_t ms = msBegin - step; // Calcul du temps écoulé depuis l'heure de référence
  uint32_t sec = ms / 1000;
  dt = dt+ TimeSpan(0, 0, 0, sec);
  step = step + sec*1000;
}

void loop() {
  unsigned int x=0;
  float AvgAcs=0.0,AcsValueF=0.0;
  int AcsValue=0;
  long Samples=0;

  for (int x = 0; x < 300; x++){
    AcsValue = analogRead(A0);
    Samples += AcsValue;
    delay (3);
  }
  AvgAcs=Samples/300.0;

  AcsValueF = -((AvgAcs - BIAS)*(5.0/1024.0))/0.185;
  addMilliseconds();

  Serial.print(AcsValueF);
  Serial.print("_");
  Serial.print(dt.hour(), DEC);
  Serial.print(":");
  Serial.print(dt.minute(), DEC);
  Serial.print(":");
  Serial.println(dt.second(), DEC);
  delay(50);
}
