const int rele = 7;

String inputString = "";         
boolean toggleComplete = false;  

const int analogInPin = A0;
int sensorValue = 0;        
int prevValue = 0;          

void setup() {

  Serial.begin(9600);

  pinMode(rele,OUTPUT);
  digitalWrite(rele, HIGH);
}

void loop() {
   while (Serial.available() && toggleComplete == false) {
    char inChar = (char)Serial.read();
    if(inChar == 'E'){ // end character for led
     toggleComplete = true;
    }
    else{
      inputString += inChar; 
    }
  }

  if(!Serial.available() && toggleComplete == true)
  {
    // convert String to int. 
    int receivedVal = stringToInt();

    digitalWrite(rele,0);
    delay(2500);
    digitalWrite(rele,1);
        
    toggleComplete = false;
  }
     sensorValue = analogRead(analogInPin);   
     
    if(prevValue != sensorValue){
      Serial.print("B"); // begin character 
      Serial.print(sensorValue);  
      Serial.print("E"); // end character
      prevValue = sensorValue;
    }  

  delay(50);
}

int stringToInt()
{
    char charHolder[inputString.length()+1];
    inputString.toCharArray(charHolder,inputString.length()+1);
    inputString = "";
    int _received = atoi(charHolder);
    return _received;
}

