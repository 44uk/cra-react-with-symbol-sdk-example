import { facade, CryptoTypes } from 'symbol-sdk-3'

const PRIVATE_KEY = 'EDB671EB741BD676969D8A035271D1EE5E75DF33278083D877F23615EB839FEC'
const EPOCH_ADJUSTMENT = 1637848847

const symbolFacade = new facade.SymbolFacade('testnet')
const privateKey = new CryptoTypes.PrivateKey(PRIVATE_KEY)
const keypair = new facade.SymbolFacade.KeyPair(privateKey)

function createDeadline(secs = 7200) {
  const value = ((~~(Date.now() / 1000) + secs) - EPOCH_ADJUSTMENT) * 1000
  return BigInt(value)
}

export function createTransferTransaction() {
  const deadline = createDeadline()
  const message = [
    ...new Uint8Array([0]),
    ...(new TextEncoder('utf-8')).encode('GoodLuck!')
  ]

  const transaction = symbolFacade.transactionFactory.create({
    type: 'transfer_transaction',
    signerPublicKey: keypair.publicKey.toString(),
    fee: 1000000n,
    deadline,
    recipientAddress: 'TD4WXUXYAPPB5Y42VT6FHISG6T32I2IBUXIKKPQ',
    message,
    mosaics: [
      { mosaicId: 0x3A8416DB2D53B6C8n, amount: 1000000n }
    ]
  })

  const signature = symbolFacade.signTransaction(
    keypair,
    transaction
  )
  const jsonPayload = symbolFacade.transactionFactory.constructor.attachSignature(transaction, signature)

  return jsonPayload
}
