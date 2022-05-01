import {
  Account,
  Address,
  Deadline,
  Mosaic,
  MosaicId,
  NetworkType,
  PlainMessage,
  TransferTransaction,
  UInt64,
} from 'symbol-sdk'

const PRIVATE_KEY = 'EDB671EB741BD676969D8A035271D1EE5E75DF33278083D877F23615EB839FEC'
const EPOCH_ADJUSTMENT = 1637848847
const GENERATION_HASH = '7FCCD304802016BEBBCD342A332F91FF1F3BB5E902988B352697BE245F48E836'

const networkType = NetworkType.TEST_NET
const signerAccount = Account.createFromPrivateKey(PRIVATE_KEY, networkType)

export function createTransferTransaction() {
  const deadline = Deadline.create(EPOCH_ADJUSTMENT)
  const message = PlainMessage.create('GoodLuck!')
  const mosaic = new Mosaic(
    new MosaicId('3A8416DB2D53B6C8'),
    UInt64.fromUint(1000000)
  )

  const transferTx = TransferTransaction.create(
    deadline,
    Address.createFromRawAddress('TD4WXUXYAPPB5Y42VT6FHISG6T32I2IBUXIKKPQ'),
    [ mosaic ],
    message,
    networkType
  )

  const signedTx = signerAccount.sign(transferTx, GENERATION_HASH)

  return signedTx.payload
}
