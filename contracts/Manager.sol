//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Manager {
    // counter used to assign ids to unique managers
    uint256 counter;

    //account struct of a password manager
    struct Account {
        address[] owners;
        address[] members;
        string[] websiteUrls;
        string verifyPlain;
        string verifyEncrypted;
    }

    // maps an id to an accounts struct
    mapping(uint256 => Account) accountId;

    // maps the password of a website url to a manager
    mapping(string => string) password;

    // event for newly created manager
    event newManager(address _address, uint256 _uint);

    // modifier to only allow members of a manager to call a function
    modifier onlyMembers(uint256 _id) {
        bool isMember;

        for(uint i = 0; i < accountId[_id].members.length; i++) {
            if(msg.sender == accountId[_id].members[i]) {
                isMember = true;
            }
        }
        require(isMember == true, "Function not called by member!");
        _;
    }
   
    // modifier to only allow members of a owner to call a function
    modifier onlyOwners(uint256 _id) {
        bool isOwner;
        for(uint i = 0; i < accountId[_id].owners.length; i++) {
            if(msg.sender == accountId[_id].owners[i]) {
                isOwner = true;
            }
        }
        require(isOwner == true, "Function not called by owner!");
        _;
    }

    // create a unique password manger
    function createManager(string calldata _plaintextMsg, string calldata _encryptedMsg) external {
        // counter used to assign a unique id to newly created manager
        counter++;

        accountId[counter].verifyPlain = _plaintextMsg;
        accountId[counter].verifyEncrypted = _encryptedMsg;

        // sets the msg sender as the default owner of the manager
        accountId[counter].owners.push(msg.sender);
        accountId[counter].members.push(msg.sender);

        emit newManager(msg.sender, counter);
    }

    function getVerifyText(uint256 _id) external view returns(string memory, string memory) {
        return (accountId[_id].verifyPlain, accountId[_id].verifyEncrypted);
    }

    /**OWNER FUNCTIONS*/
    
    // add owner to a manager
    function addOwner(address _address, uint256 _id) external onlyOwners(_id) {
        accountId[_id].owners.push(_address);
        accountId[counter].members.push(msg.sender);
    }

    // add member to a manager
    function addMember(address _address, uint256 _id) external onlyOwners(_id) {
        accountId[_id].members.push(_address);
    }

    // add multiple members to a manager
    function addMultipleMembers(address[] calldata _addresses, uint256 _id) external onlyOwners(_id) {
        for(uint i = 0; i < _addresses.length; i++){
            accountId[_id].members.push(_addresses[i]);
        }
    }

    //remove member to from a manager
    function removeMember(address _address, uint256 _id) external onlyOwners(_id) {
        for(uint i = 0; i < accountId[_id].members.length; i++){
            if(accountId[_id].members[i] == _address) {
                delete accountId[_id].members[i];
            }
        }
    }

    function changeMangerPassword(string[] calldata newPasswords, string calldata _plaintextMsg, string calldata _encryptedMsg, uint256 _id) external onlyOwners(_id) {
        accountId[counter].verifyPlain = _plaintextMsg;
        accountId[counter].verifyEncrypted = _encryptedMsg;

        for(uint i = 0; i < accountId[_id].websiteUrls.length; i++) {
            password[accountId[_id].websiteUrls[i]] = newPasswords[i];
        }
    }

    // add password for a spefic website
    function addPassword(string calldata _password, string calldata _websiteUrl, uint256 _id) external onlyOwners(_id) {
        // setting the password to a specific website and manager id
        string memory passwordId = string(abi.encodePacked(_websiteUrl, _id));
        require(bytes(password[passwordId]).length == 0, "Password already added");
        accountId[_id].websiteUrls.push(passwordId);
        password[passwordId] = _password;
    }
    
    function retrieveSiteArr(uint256 _id) external view onlyOwners(_id) returns(string[] memory) {
        return accountId[_id].websiteUrls;
    }

    /**MEMBER FUNCTIONS*/

    // function to return a password to a website specific to a manager id
    function retrievePassword(string calldata _websiteUrl, uint256 _id) external view onlyMembers(_id) returns(string memory){
        return password[string(abi.encodePacked(_websiteUrl, _id))];
    }
}