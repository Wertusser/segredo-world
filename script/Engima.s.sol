// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import "forge-std/console2.sol";

import {Verifier as RevealVerifier} from "../src/verifiers/reveal.sol";
import {Verifier as RegisterVerifier} from "../src/verifiers/register.sol";
import "../src/Enigma.sol";

contract EnigmaScript is Script {
    function run() public {
        RegisterVerifier registerVerifier = new RegisterVerifier();
        RevealVerifier revealVerifier = new RevealVerifier();

        Enigma EnigmaContract = new Enigma(
            registerVerifier,
            revealVerifier
        );

        console2.log("register verifier: ", address(registerVerifier));
        console2.log("reveal verifier: ", address(revealVerifier));
        console2.log("token: ", address(EnigmaContract));
    }
}
