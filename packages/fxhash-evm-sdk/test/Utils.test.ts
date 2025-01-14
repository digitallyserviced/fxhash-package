import { config as dotenvConfig } from "dotenv"
import {
  concat,
  fromHex,
  getContractAddress,
  keccak256,
  toBytes,
  toHex,
} from "viem"

dotenvConfig()

describe("createProject", () => {
  it("should correctly predict ticket address", async () => {
    const hexByteCode = toHex(
      concat([
        fromHex("0x3d602d80600a3d3981f3363d3d373d3d3d363d73", "bytes"),
        fromHex("0x4622376Cb7Befe201384753d8dc234Da38e1F567", "bytes"),
        fromHex("0x5af43d82803e903d91602b57fd5bf3", "bytes"),
      ])
    )
    const ticketAddress = await getContractAddress({
      bytecode: hexByteCode,
      from: "0x80fEE32F8BDda62bb67e883691C3c94c6ED4C525" as `0x${string}`,
      opcode: "CREATE2",
      salt: toBytes(0),
    })
    expect(ticketAddress).toEqual("0xDb807b799addfeA3c4Ba0741C9f6DDAfbFa50F3b")
  })
})
