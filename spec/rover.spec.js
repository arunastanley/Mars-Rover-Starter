const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test message with two commands', commands);
  let rover = new Rover(98382);
  let response = rover.receiveMessage(message);
  // 7 tests here!

  it("constructor sets position and default values for mode and generatorWatts",function(){
      let roverObj = new Rover(43);
      expect(roverObj).toEqual({position: 43, mode: 'NORMAL', generatorWatts: 110});
  });

  it("response returned by receiveMessage contains the name of the message",function(){
      expect(response.message).toEqual('Test message with two commands');
  });


  it("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
      expect(response.results.length).toBe(2);
  });

  it("responds correctly to the status check command",function(){
      // let commandStatusChk = [new Command('STATUS_CHECK')];
      // let message1 = new Message('Message for status chk', commandStatusChk);
      // let rover1 = new Rover(34);
      // let response1 = rover1.receiveMessage(message1);
      // expect(response1.results[0]['roverStatus']).toEqual({"generatorWatts": 110, "mode": "NORMAL", "position": 34})
 
      expect (response.results[1].roverStatus).toEqual({"generatorWatts": 110, "mode": "LOW_POWER", "position": 98382})
    });

    it("responds correctly to the mode change command",function(){
      let commandModeChngLow = [new Command('MODE_CHANGE', 'LOW_POWER')];
      let messageLow = new Message('Message for mode change Low_Power', commandModeChngLow);
      let rover1 = new Rover(34);
      let response1 = rover1.receiveMessage(messageLow);
      expect(response1.results[0]['completed']).toEqual(true);
      expect(rover1.mode).toBe('LOW_POWER');
     
      let commandModeChngNorm = [new Command('MODE_CHANGE', 'NORMAL')];
      let messageNorm = new Message('Message for mode change NORMAL', commandModeChngNorm); 
      let rover2 = new Rover(77);
      let response2 = rover2.receiveMessage(messageNorm);
      expect(response2.results[0]['completed']).toEqual(true);
      expect(rover2.mode).toBe('NORMAL');

    });

    it("responds with a false completed value when attempting to move in LOW_POWER mode",function(){
    

      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'),new Command('MOVE',22)];
      let message = new Message('Test message with two commands', commands);
      let rover = new Rover(98382);
      let response = rover.receiveMessage(message);
      expect(response.results[1]['completed']).toEqual(false);
      expect(rover.position).toBe(98382);
    });

it("responds with the position for the move command",function(){
  
    let commandMove = [new Command('MOVE',22)];
    let messageMove = new Message('Message for Move', commandMove);
    let rover3 = new Rover(99);
    let response3 = rover3.receiveMessage(messageMove);
    expect(response3.results[0]['completed']).toEqual(true);
    expect(rover3.position).toBe(22);

  });


});
