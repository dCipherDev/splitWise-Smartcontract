var splitwise = artifacts.require("./splitwise.sol");

module.exports = function(deployer) {
	deployer.deploy(splitwise);
};