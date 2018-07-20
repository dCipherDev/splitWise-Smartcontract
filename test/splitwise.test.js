const splitWise = artifacts.require("splitWise");

// Test with Mocha
contract('splitWise', function(accounts) {
	
  // Display the ballance for each address
  function printBalances(accounts) {
    accounts.forEach(function(ac, i) {
      console.log(i, web3.fromWei(web3.eth.getBalance(ac), 'ether').toNumber())
    })
  }
  
  // Setup a variable to hold the contract object.
  var splitwise

  // Display the innitial ballance account
  printBalances(accounts)
  // Create a test case for retreiving the deployed contract.
  it("Should retrive deployed contract.", function(done) {
    // Check if our instance has deployed
    splitWise.deployed().then(function(instance) {
      // Assign our contract instance for later use
      splitwise = instance
      console.log('new client', splitwise)  
      // Pass test if we have an object returned.
      assert.isOk(splitwise)
      // Tell Mocha move on to the next sequential test.
      done()
    })
  })
  
  it("Pass this function if we can receive ether in our contract from address 1 & 2 = 15 eth", function(done) {
	  splitwise.addfund({from:accounts[1], to:splitwise.address, value: web3.toWei(10, "ether")})
	  splitwise.addfund({from:accounts[2], to:splitwise.address, value: web3.toWei(5, "ether")})
    .then(function(tx) {
      // Pass the test if we have a transaction reciept returned.
      assert.isOk(tx.receipt)
      // For convenience, show the balances of accounts after transaction.
      printBalances(accounts)
      done()
    }, function(error) {
        // Force an error if callback fails.
        assert.equal(true, false)
        console.error(error)
        done()
      })
  })
  
  it("Pass this function if just the owner can set a bill ammount", function(done) {
	  splitwise.setbillamount(3000000000000000000, {from:accounts[0], to:splitwise.address})
    .then(function(tx) {
      // Pass the test if we have a transaction reciept returned.
      assert.isOk(tx.receipt)
      // For convenience, show the balances of accounts after transaction.
      printBalances(accounts)
      done()
    }, function(error) {
        // Force an error if callback fails.
        assert.equal(true, false)
        console.error(error)
        done()
      })
  })
  
  it("show me an error here that because the owner is not the guy who is sending the money in this test function", function(done) {
	  splitwise.setbillamount(3000000000000000000, {from:accounts[1], to:splitwise.address})
    .then(function(tx) {
      // Pass the test if we have a transaction reciept returned.
      assert.isOk(tx.receipt)
      // For convenience, show the balances of accounts after transaction.
      printBalances(accounts)
      done()
    }, function(error) {
        // Force an error if callback fails.
        assert.equal(true, false)
        console.error(error)
        done()
      })
  })
  
    //after all test if the contract balance equals with 15 eth and pass this test function
  it("contract balance equal to 15 ethers", function() {
    return splitWise.deployed().then(function(instance){
     return splitwise.getContractBalance.call();
    }).then(function(result){
     assert.equal(result.toNumber(), '15000000000000000000', 'the balance not equal with 15 ethers');
    })
  }); 
  
  it("paybill test function", function(done) {
	  splitwise.paybill("0x1d01980518b2714a9e6f7548e0d626fead98cec6", {from:accounts[0]})
    .then(function(tx) {
      // Pass the test if we have a transaction reciept returned.
      assert.isOk(tx.receipt)
      // For convenience, show the balances of accounts after transaction.
      printBalances(accounts)
      done()
    }, function(error) {
        // Force an error if callback fails.
        assert.equal(true, false)
        console.error(error)
        done()
      })
  })
  
})