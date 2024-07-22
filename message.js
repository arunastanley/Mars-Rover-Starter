class Message {
   // Write code here!
   constructor(name,commands){
   this.name = name;
      if(!name){
         throw Error("Name is not passed");
      } 
   this.commands = commands;
   }
   
}
module.exports = Message;