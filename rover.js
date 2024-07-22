
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
            if(this.mode === 'LOW_POWER'){
               resultArray[i] = {completed: false};
            }else{
            this.position = msgObj.commands[i].value;
            resultArray[i] = {completed: true};
            }
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



module.exports = Rover;