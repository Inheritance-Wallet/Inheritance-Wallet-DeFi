// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EstateInheritance {
    struct Heir {
        address heirAddress;
        uint256 ratio;
    }

    address private owner;
    uint private totalInheritance;
    uint private commissionRate;
    uint private cycleDuration;
    uint private lastDistributionTimestamp;
    address private linkTokenAddress;
    address private uniswapAddress;
    uint private selectedCycle;
    uint private gasLimit;

    mapping(uint => uint) public cycleDurations; // Cycle durations in seconds

    Heir[] heirs;

    event InheritanceReceived(address indexed from, uint amount);
    event InheritanceDistributed(address indexed to, uint amount);

    constructor(
        address _owner,
        uint _commissionRate,
        address _linkTokenAddress,
        address _uniswapAddress
    ) {
        owner = _owner;
        commissionRate = _commissionRate;
        linkTokenAddress = _linkTokenAddress;
        uniswapAddress = _uniswapAddress;
        lastDistributionTimestamp = block.timestamp;
        gasLimit = 300000; // Initial gas limit value

        cycleDurations[1] = 365 days;
        cycleDurations[2] = 730 days;
        cycleDurations[5] = 1825 days;
        cycleDurations[10] = 3650 days;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function inherit() external payable {
        require(msg.value > 0, "Inheritance amount must be greater than zero.");
        totalInheritance += msg.value;
        emit InheritanceReceived(msg.sender, msg.value);
    }

    function setHeirs(address[] memory _recipients, uint256[] memory _ratios) public {
    require(_recipients.length == _ratios.length, "Recipient and ratio lengths do not match");
        delete heirs;
        
        for (uint256 i = 0; i < _recipients.length; i++) {
        Heir memory newHeir;
        newHeir.heirAddress = _recipients[i];
        newHeir.ratio = _ratios[i];

        heirs.push(newHeir);
    }
    }

    function distributeInheritance() external onlyOwner {
        require(block.timestamp >= lastDistributionTimestamp + cycleDurations[selectedCycle], "Distribution cycle not yet completed.");
        
        uint totalCommission = (totalInheritance * commissionRate) / 10000;
        uint availableInheritance = totalInheritance - totalCommission;
        uint remainingInheritance = availableInheritance;
        
        for (uint i = 0; i < heirs.length; i++) {
            uint amount = (availableInheritance * heirs[i].ratio) / 10000;
            remainingInheritance -= amount;
            distributeTokens(heirs[i].heirAddress, amount);

            emit InheritanceDistributed(heirs[i].heirAddress, amount);

        }
        
        distributeTokens(owner, remainingInheritance);
        emit InheritanceDistributed(owner, remainingInheritance);
        
        lastDistributionTimestamp = block.timestamp;
    }

    function distributeTokens(address recipient, uint amount) private {
        IERC20(linkTokenAddress).transferFrom(uniswapAddress, recipient, amount);
    }

    function setCycle(uint _selectedCycle) external onlyOwner {
        require(cycleDurations[_selectedCycle] > 0, "Invalid cycle selection.");
        selectedCycle = _selectedCycle;
    }

    function setGasLimit(uint _gasLimit) external onlyOwner {
        gasLimit = _gasLimit;
    }

    function fullback() external payable {
        // Do something with the received Ether
    }

    function getTotalInheritance() public view returns (uint) {
        return totalInheritance;
    }

    function getCommissionRate() public view returns (uint) {
        return commissionRate;
    }

    function getCycleDuration(uint _cycle) public view returns (uint) {
        return cycleDurations[_cycle];
    }

    function getLastDistributionTimestamp() public view returns (uint) {
        return lastDistributionTimestamp;
    }

    function getGasLimit() public view returns (uint) {
        return gasLimit;
    }

    receive() external payable {
        // Fallback function to receive Ether
        emit InheritanceReceived(msg.sender, msg.value);
    }
}
