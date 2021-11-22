// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Mobisale {
    uint public userCount = 0;

    struct User {
        uint serial;
        uint balance;
        string email;
        string username;
        address payable paymentAccount;
    }

    mapping(uint=> User) public users;

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

    function buyPost(string memory _username,uint amount) public payable {

        for(uint i=1;i<=userCount;i++){
            if(keccak256(bytes(users[i].username))==keccak256(bytes(_username))){
                 users[i].balance += (amount*9 )/ 10000000000000000000;
            }
        }
    }
    
    function redeemBalance(string memory _username) public  payable {
        
        for(uint i=1;i<=userCount;i++){
            if(keccak256(bytes(users[i].username))==keccak256(bytes(_username))){
                users[i].paymentAccount.transfer(users[i].balance);
            }
        }
       
    }
 
 function getContractBalance() external view returns(uint){
  return address(this).balance;
 }

}
