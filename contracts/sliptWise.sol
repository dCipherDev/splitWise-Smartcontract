pragma solidity ^0.4.24;

contract splitwise {

struct Participant {
        uint amount;
        address partaddr;
    }
address private _owner;
uint numberofparti = 0; 
uint totalamountcol = 0;
mapping (address => bool)  partifunded;
mapping (address => bool)  withdrawed;

Participant[] participants;
uint billamount;
uint remainingamount;

modifier isOwner() {
        require(msg.sender == _owner);
        _;
    }
   
function splitwise()
        public {
        _owner = msg.sender;
    }
   
//view the contract balance
    function getContractBalance()  public constant returns(uint){
        return address(this).balance;
    }

//Just owner can set the bill amount
function setbillamount(uint _billamount) public isOwner {

    billamount = _billamount;
}

// add funds
function addfund() payable public {

    if (partifunded[msg.sender] = true) {
        for (uint i = 0; i < participants.length; i++) {
            if (participants[i].partaddr == msg.sender)
             {
                participants[i].amount += msg.value;
             }
        }
    }
    else
    {
        partifunded[msg.sender] = true;
        participants[numberofparti].amount += msg.value;
        numberofparti = numberofparti+1;
    }

}


function paybill  ( address _biller) public isOwner{

    if (this.balance > billamount ) {
        _biller.send(billamount);
    }
}

function findremainingamount() public constant returns(uint)    {

    for (uint j = 0; j < participants.length; j++) {
        totalamountcol = participants[j].amount ;
        }   
    remainingamount = billamount - totalamountcol;
    return remainingamount;

}

function withdraw() {

if (withdrawed[msg.sender] == false) {

    withdrawed[msg.sender] = true;
    for (uint k = 0; k < participants.length; k++) {
            if (participants[k].partaddr == msg.sender) {
                    uint partshare = participants[k].amount;
                }
        }   

    uint balanceamount =(partshare) * (findremainingamount()) / totalamountcol  ;
    msg.sender.transfer(balanceamount);
    }   

}

}