var fs = require('fs'),
http = require('http'),
socketio = require('socket.io'),
url = require("url"), 
SerialPort = require("serialport")

var socketServer;
var serialPort;
var portName = 'COM3';
var dadosEnviados = "";

function startServer(route,handle,debug)
{
	function onRequest(request, response) {
 
        var pathname = url.parse(request.url).pathname; 
        var content = route(handle,pathname,response,request,debug);
	}
	
	var httpServer = http.createServer(onRequest).listen(1337, function(){
		console.log("Servidor rodando em: http://localhost:1337");
	}); 
	serialListener(debug);
	initSocketIO(httpServer,debug);
}

function initSocketIO(httpServer,debug)
{
    
    
    socketServer = socketio.listen(httpServer);
    if(debug == false){
        socketServer.set('log level', 1); // socket IO debug off
    }
    socketServer.on('connection', function (socket) {
        console.log("user connected");
        socket.emit('onconnection', {pollOneValue:dadosEnviados});
        socketServer.on('update', function(data) {
            socket.emit('updateData',{pollOneValue:data});
        });
        socket.on('buttonval', function(data) {
            serialPort.write(data + 'E');
        });
        socket.on('sliderval', function(data) {
            serialPort.write(data + 'P');
        });
        
    });
}

function serialListener(debug)
{
    var dadosRecebidos = "";
    serialPort = new SerialPort(portName, {
        baudRate: 9600,
         dataBits: 8,
         parity: 'none',
         stopBits: 1,
         flowControl: false
    });

    serialPort.on("open", function () {
      console.log('Abrindo comunicacao serial');
        serialPort.on('data', function(data) {
             dadosRecebidos += data.toString();
          if (dadosRecebidos .indexOf('E') >= 0 && dadosRecebidos .indexOf('B') >= 0) {
           dadosEnviados = dadosRecebidos .substring(dadosRecebidos .indexOf('B') + 1, dadosRecebidos .indexOf('E'));
           dadosRecebidos = '';
         }
       socketServer.emit('update', dadosEnviados);
      });  
    });  
}

exports.start = startServer;