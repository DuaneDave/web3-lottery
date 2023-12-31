// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract Lottery {
    address public manager;
    address[] public players;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether, 'send some ether to join');
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp, players)));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;

        payable(players[index]).transfer(address(this).balance);

        players = new address[](0);
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    modifier restricted() {
        require(msg.sender == manager, 'Oops, you are not the manager');
        _;
    }
}