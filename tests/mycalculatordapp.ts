import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Mycalculatordapp } from "../target/types/mycalculatordapp";

const assert = require ('assert');

const {SystemProgram} = anchor.web3
// describe("mycalculatordapp", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.Mycalculatordapp as Program<Mycalculatordapp>;

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const tx = await program.methods.initialize().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });

describe("mycalculatordapp", () => {
  // Configure the client to use the local cluster.
  // anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.AnchorProvider.local()
  anchor.setProvider(provider)
  
const calculator = anchor.web3.Keypair.generate()
const program = anchor.workspace.Mycalculatordapp as Program<Mycalculatordapp>;
  it("Create a calculator", async () => {
    // Add your test here.
    // const tx = await program.methods.initialize().rpc();
    await program.rpc.create("Chinh",{
      accounts: {
        calculator: calculator.publicKey,
        user: provider.publicKey,
        systemProgram: SystemProgram.programId
      }, 
      signers: [calculator]
    })
    const account = await program.account.caculator.fetch(calculator.publicKey)
    assert.ok(account.greeting === "Chinh")
    // console.log("Your transaction signature", tx);
  });

  it("Add 2 number", async () => {
    await program.rpc.add(new anchor.BN(2),new anchor.BN(5),{
      accounts:{
        sum: calculator.publicKey,
      },
      // signers: [calculator]
    })
    const account = await program.account.caculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(7)))
  });
  
});