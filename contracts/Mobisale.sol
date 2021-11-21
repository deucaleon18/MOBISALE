// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Mobisale {
    uint256 public userCount = 0;

    struct User {
        uint256 serial;
        uint256 balance;
        string email;
        string username;
        address payable paymentAccount;
    }

    mapping(uint256 => User) public users;

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

    function buyPost(uint256 userSerial, uint256 amount) public payable {
        users[userSerial].balance += amount / 1000000000000000000;
    }

    function redeemBalance(uint256 userSerial) payable public {
        (users[userSerial].paymentAccount).transfer(users[userSerial].balance);
    }
}
