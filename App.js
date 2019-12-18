import "./shim.js";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import FactomIntegrateSDK from "factom-harmony-integrate";

const configure = {
  baseUrl: "https://api.factom.com/v1",
  accessToken: {
    appId: "XXXXX",
    appKey: "XXXX"
  }
};

const Integrate = new FactomIntegrateSDK(configure);

// getIdentity();
claimTest();

async function claimTest() {
  // Execute an Integrate SDK Method
  const claimObj = Integrate.claim.create({
    id:
      "did:factom:2a779d41a2bb745b3050bd4d7f63ec2be050941dace52cad19036d9684afee79",
    FullName: "Lukas Murray"
  });
  console.log("ClaimObj", claimObj);

  claimObj.sign({
    signer:
      "did:factom:2a779d41a2bb745b3050bd4d7f63ec2be050941dace52cad19036d9684afee79#key-1",
    signerPrivateKey: "idsec32vrpyBYP12MpVtrhyEgX5dqZLD4hKhorHJjs2T9qY9vWntmB6"
  });

  await claimObj.register({
    destinationChainId:
      "57bb92d7130b67caa18267da46e61248351ee901ae4d54573a6a2ad3500d19cb",
    signerPrivateKey: "idsec32vrpyBYP12MpVtrhyEgX5dqZLD4hKhorHJjs2T9qY9vWntmB6",
    signerChainId:
      "2a779d41a2bb745b3050bd4d7f63ec2be050941dace52cad19036d9684afee79"
  });
  console.log("Register ClaimObj", claimObj);

  await claimObj.verify({
    signerPublicKey: "idpub2nJz8MYB2gSWUCpSH6rJdnMoJxUsWd8q8hMrhLQztJvGFjoyTR",
    verbose: true
  });
  console.log("Verify ClaimObj", claimObj);
}

async function identityTest() {
  const identityObj = await Integrate.identities.create({
    names: ["NotarySimulationxxxx", "Test Identityxxx"]
  });
  console.log(identityObj);
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
