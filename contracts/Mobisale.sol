// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Mobisale {
    uint public userCount = 0;
   

   //user struct for registered users
    struct User {
        uint serial;
        uint balance;
        string email;
        string username;
        address payable paymentAccount;
    }


  //users mapping 
    mapping(uint=> User) public users;

//creating new user on registeration 
    function createUser(
     
        string memory _email,
        string memory _username,
        address payable _paymentAccount
    ) public {
        userCount++;
        users[userCount] = User(
            userCount,
            0,
            _email,
            _username,
            _paymentAccount
        );
    }

//function to increase virtual balance of the post creator
    function buyPost(string memory _username,uint amount) public payable {

        for(uint i=1;i<=userCount;i++){
            if(keccak256(bytes(users[i].username))==keccak256(bytes(_username))){
                 users[i].balance += (amount*9 )/ 10000000000000000000;
            }
        }
    }


//function to redeem the balance earned by the creator 
    function redeemBalance(string memory _username) public  payable {
        
        for(uint i=1;i<=userCount;i++){
            if(keccak256(bytes(users[i].username))==keccak256(bytes(_username))){
                require(users[i].balance>0);
                users[i].paymentAccount.transfer((users[i].balance)*1000000000000000000);
                users[i].balance=0;
            }
        }
       
    }

// function to display the creator's balance
   function returnUserBalance(string memory _username) public view returns(uint){
         for(uint i=1;i<=userCount;i++){
            if(keccak256(bytes(users[i].username))==keccak256(bytes(_username))){
                return users[i].balance;
            }
        }
       
    }

//function to get contract balance  
 function getContractBalance() external view returns(uint){
  return address(this).balance;
 }

}
