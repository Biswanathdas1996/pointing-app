// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Pointingpoker  {

    struct User {
        string name;
        string profileImg;
        string uid;
    }

    struct PointingData {
        uint slNo;
        string Creator;
        string title;
        string time;                 
        bool show;                 
        bool status;                 
    }

    struct UserInputs {
        uint slNo;
        string uid;
        string title;
        string response;

    }

     
    mapping(string => User) public users;
    string[] public userList ;
    address public manager;
    string public project;
    mapping(address => uint) uniqueAddress;



    PointingData[] public pointingData;
    UserInputs[] public userInputs;


    constructor()  {
        manager = msg.sender;
    }  



    function login(string memory uid) public view returns(bool){
       bytes memory tempEmptyStringTest = bytes(users[uid].name);
        if(tempEmptyStringTest.length == 0){
            return false;
        }else{
            return true;
        }
    }


  function addUser(string memory uid, string memory name , string memory image) public virtual {
        User memory newUser = User({
           name: name,
           profileImg:image,
           uid:uid
        });
        users[uid] = newUser;
        userList.push(uid);
    }

    function getAllUser() public view returns(string[] memory){
        return userList;
    }

  function addnewPointingData(string memory Creator, string memory title, string memory time) public virtual {
        PointingData memory newPointingData = PointingData({
             slNo:pointingData.length,
             Creator:Creator,
             title:title,
             time:time,                 
             show:false,                 
             status:true
        });
       pointingData.push(newPointingData);
    }

    function getAllpointingData() public view returns(PointingData[] memory){
        return pointingData;
    }

    function publishResult(uint id) public {
         PointingData storage currentPointingData = pointingData[id];
         currentPointingData.show = true;
    }

    function compleSession(uint id) public {
         PointingData storage currentPointingData = pointingData[id];
         currentPointingData.status = false;
    }

//..........................User input ................................



    function adduserInputs(string memory uid, string memory title, string memory response) public virtual {
        UserInputs memory newUserInput = UserInputs({
              slNo:userInputs.length,
              uid:uid,
              title:title,
              response:response
        });
       userInputs.push(newUserInput);
    }
    
    function getUserAllInputs() public view returns(UserInputs[] memory){
        return userInputs;
    }

    function updateUserInputs(uint id, string memory response) public {
         UserInputs storage currentUserInput = userInputs[id];
         currentUserInput.response = response;
    }
  




 



    
    
  
}



