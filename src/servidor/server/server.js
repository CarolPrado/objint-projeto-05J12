const express = require('express');
const http = require('http');
const five = require('johnny-five');
const moment = require('moment');

var Fn = five.Fn;

var app = express();

http.createServer(app).listen(3000, function(){
    console.log("Servidor rodando em: http://localhost:3000");
});

var arduino = new five.Board({
    port: 'COM3'
}).on('ready', () => {
    
    var atividades = []
    
    var sensorUmidade = new five.Pin("A0");
    
    var rele = new five.Relay(
        {
            pin: 7,
            type: 'NO'
        }
    );
    
    // sensorUmidade.on('data', function() {
    //     if (sensorUmidade.value >= 900 ) {
    //         rele.toggle()
    //         setTimeout(() => {
                
    //         console.log('Iniciando irrigacao');
    //             rele.toggle();
    //         }, 5000);
    //     }
    // })
    
    console.log("Arduino pronto!");
    
    app.get('/', (req, res) => {
        res.send({result: 'olar'});
    });
    
    app.get('/umidade', (req, res) => {
        
        if (arduino.isReady) {
            
            console.log('GET umidade');
            
            console.log("Retornando status de umidade.");
            
            sensorUmidade.query((data) => {
                console.log(data);
                atividades.unshift(
                    {
                        value: data.value,
                        timestamp: moment().format()
                        
                    }
                );
                
                res.send(
                    {
                        result: {
                            umidade: data.value,
                            atividades: atividades,
                            status: {
                                id: 200,
                                descricao: 'Comando OK',
                                timestamp: moment().format()
                            }
                        }
                        
                    }
                )
                
            })
        } else {
            res.sendStatus(504);
        }
        
    });
    
    app.route('/irrigacao')
    .all((req, res) => {
        if (arduino.isReady) {
            
            console.log('Iniciando rele');
            
            
            new Promise((resolve, reject) => {
                
                rele.toggle();
                
                setTimeout(() => {
                    rele.toggle();
                    resolve();
                }, 5000);
                
            }).then(() => {
                
                atividades.unshift(
                    {
                        value: true,
                        timestamp: moment().format()
                        
                    }
                );
                
                res.send(
                    {
                        result: {
                            atividades: atividades,
                            status: {
                                id: 200,
                                descricao: 'Comando OK',
                                timestamp: moment().format()
                            }
                        }
                        
                    }
                )
            }).catch(() => {
                res.sendStatus(503);
            })
            
        } else {
            res.sendStatus(504);
        }
    })
    
});

