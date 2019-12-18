import './shim.js'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FactomIntegrateSDK from 'factom-harmony-integrate';

const configure = {
    baseUrl: 'https://api.factom.com/v1',
    accessToken: {
        appId: '836767c1',
        appKey: '85cd2bfee845a34f67353ead3cd7ea25',
    }
};

const Integrate = new FactomIntegrateSDK(configure);


// Execute an Integrate SDK Method
const result = Integrate.claim.create({
  id: 'did:factom:2a779d41a2bb745b3050bd4d7f63ec2be050941dace52cad19036d9684afee79',
  FullName: 'Lukas Murray'
});

console.log(result);

getIdentity();

async function getIdentity(){
  const identityObj = await Integrate.identities.create({
    names: ["NotarySimulation", "Test Identity"]
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
