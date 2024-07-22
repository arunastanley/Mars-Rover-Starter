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
});
