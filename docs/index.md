# *Irrigação Automatizada*

## Ideia

Sistema de irrigação automatizado que, através de um sensor, acompanha o status de umidade do solo e ativa um módulo próprio de irrigação de acordo com a necessidade. 
Esse sistema estará integrado em um dispositivo arduino e rodará em um servidor Node.js com a biblioteca Johnny-Five, para que as funcionalidades do dispositivo possam ser acessadas diretamente pelo Node.js.

Haverá também uma aplicação web para gerenciamento do dispositivo, ela se comunicará com o servidor através de requisições HTTP, recebendo os logs do servidor e podendo ativar o módulo de irrigação manualmente.

## Diagrama de implantação

![](diagrama.png)


## Montagem do dispositivo

![](model.png)
