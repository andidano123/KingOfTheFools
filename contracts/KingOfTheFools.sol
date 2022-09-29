// SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.17;

/**
 * @title KingOfTheFools
 * @dev The KingOfTheFools contract has the address of the current king (kingAddr) and the balance of the current king (kingBalance), 
 * and provides deposit function and two getter functions.
 */
contract KingOfTheFools{
    address kingAddr = address(0);
    uint256 kingBalance = 0 ether;
    
    /**
    * @dev If the deposit amount (msg.value) is more than the previous person (current king), 
    * msg.sender become "King of the fools", and the money (msg.value) gets sent back to the previous person
    */
    function deposit() external payable{        
        require(msg.value > 0, 'Amount must be more than 0');
        require(msg.sender != kingAddr, 'Not allowed to deposit again');

        // If Smart Contract is empty, then make msg.sender to be the king directly.
        if (kingBalance == 0) {
            kingAddr = msg.sender;
            kingBalance = msg.value;
        } else {
            require(msg.value >= kingBalance * 3 / 2, "Not enough eth to be the king");
            
            // Send the money back to the current king.
            (bool sent, ) = kingAddr.call{ value: msg.value }("");
            require(sent, "Failed to send Ether");

            // Replace king info.
            kingBalance = msg.value;
            kingAddr = msg.sender;            
        }        
    }

    function getKing() external view returns (address) {
        return kingAddr;        
    }
    function getKingBalance() external view returns (uint256) {
        return kingBalance;
    }
}