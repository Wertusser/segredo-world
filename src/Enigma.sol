// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./lib/ERC20.sol";
import "./lib/Ownable.sol";
import "./lib/MerkleProofLib.sol";
import "forge-std/interfaces/IERC20.sol";
import "./EnigmaErrors.sol";

import {Verifier as RegisterVerifier} from "./verifiers/register.sol";
import {Verifier as RevealVerifier} from "./verifiers/reveal.sol";

contract Enigma is ERC20, Ownable {
    using MerkleProofLib for bytes32[];

    struct RiddlesInfo {
        bool solved;
        uint32 createdAt;
    }

    RegisterVerifier public registerVerifier;
    RevealVerifier public revealVerifier;

    uint256 public registrationPrice = 0.01 ether;

    mapping(uint256 riddleHash => RiddlesInfo info) public riddles;
    mapping(address owner => uint256[2] key) public keyOf;

    event NewRiddle(uint256 riddleHash);
    event Registered(address indexed savant, uint256[2] key);
    event RegisterPriceChanged(uint256 oldPrice, uint256 newPrice);

    constructor(
        RegisterVerifier registerVerifier_,
        RevealVerifier revealVerifier_
    ) Ownable() {
        registerVerifier = registerVerifier_;
        revealVerifier = revealVerifier_;
    }

    function name() public view virtual override returns (string memory) {
        return "Enigma863";
    }

    function symbol() public view virtual override returns (string memory) {
        return "863";
    }

    function setRegistrationPrice(uint256 price) external onlyOwner {
        uint256 oldPrice = registrationPrice;
        registrationPrice = price;
        emit RegisterPriceChanged(oldPrice, registrationPrice);
    }

    function addRiddle(uint256 riddleHash) external onlyOwner {
        if (riddles[riddleHash].createdAt > 0) revert RiddleExists();

        riddles[riddleHash].createdAt = uint32(block.timestamp);

        emit NewRiddle(riddleHash);
    }

    function register(
        uint256[2] memory key,
        RegisterVerifier.Proof memory proof
    ) external payable {
        if (msg.value < registrationPrice) revert InsufficientRegisterValue();

        bool isCorrect = registerVerifier.verifyTx(proof, key);
        if (!isCorrect) revert IncorrectRegisterProof();

        keyOf[msg.sender] = key;

        emit Registered(msg.sender, key);
    }

    function mint(uint256 riddleHash, RevealVerifier.Proof memory proof)
        external
    {
        uint32 createdAt = riddles[riddleHash].createdAt;

        if (createdAt == 0) revert RiddleNotFound();
        if (riddles[riddleHash].solved) revert RiddleSolved();

        uint256[2] memory key = keyOf[msg.sender];

        if (key[0] == 0 && key[1] == 0) revert NotRegistered();

        uint256[3] memory inputs = [riddleHash, key[0], key[1]];
        bool isCorrect = revealVerifier.verifyTx(proof, inputs);

        if (!isCorrect) revert IncorrectRevealProof();

        riddles[riddleHash].solved = true;

        _mint(msg.sender, uint256(uint32(block.timestamp) - createdAt));
    }
}
