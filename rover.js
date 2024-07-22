const Command = require('./command.js');
const Message = require('./message.js');

class Rover {
   // Write code here!
   constructor(position){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(msgObj){
      let resultArray = [];
      for(let i=0 ; i < msgObj.commands.length; i++){
         if (msgObj.commands[i].commandType === "MOVE"){
            // msgObj.commands[i].value = this.position;
            this.position = msgObj.commands[i].value;
            resultArray[i] = {completed: true};
         }

         if (msgObj.commands[i].commandType === "STATUS_CHECK"){
            // let respObj = {
            //    position: this.position,
            //    mode: this.mode, 
            //    generatorWatts: this.generatorWatts
            // };
            resultArray[i] = {completed: true, roverStatus: this};
         }

         if(msgObj.commands[i].commandType === "MODE_CHANGE"){
            this['mode'] = msgObj.commands[i].value;
            resultArray[i] = {completed: true};
         }

      }
      let returnObj = {
         message: msgObj.name,
         results: resultArray
      };
     return returnObj;
   }
}

let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
let msg = new Message('Test message with two commands', commands);
let rover = new Rover(98382);
let response = rover.receiveMessage(msg);

console.log(response);

module.exports = Rover;