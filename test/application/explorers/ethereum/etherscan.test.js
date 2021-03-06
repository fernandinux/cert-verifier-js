import * as mockEtherscanResponse from '../mocks/mockEtherscanResponse.json';
import { parsingTransactionDataFunction } from '../../../../src/explorers/ethereum/etherscan';
import { TRANSACTION_APIS } from '../../../../src/constants';
import sinon from 'sinon';
import * as RequestServices from '../../../../src/services/request';

function getMockEtherscanResponse () {
  return JSON.parse(JSON.stringify(mockEtherscanResponse));
}

describe('Etherscan Explorer test suite', function () {
  let mockResponse;

  beforeEach(function () {
    mockResponse = getMockEtherscanResponse();
  });

  describe('parsingTransactionDataFunction method', function () {
    it('should return the transaction data', async function () {
      const assertionTransactionData = {
        issuingAddress: '0x3d995ef85a8d1bcbed78182ab225b9f88dc8937c',
        remoteHash: 'ec049a808a09f3e8e257401e0898aa3d32a733706fd7d16aacf0ba95f7b42c0c',
        revokedAddresses: undefined,
        time: new Date('2019-06-02T08:38:26.000Z')
      };

      const res = await parsingTransactionDataFunction(mockResponse, TRANSACTION_APIS.Etherscan);
      expect(res).toEqual(assertionTransactionData);
    });

    describe('given the ether scan block cannot get retrieved', function () {
      let stubRequest;

      it('should throw the right error', function () {
        stubRequest = sinon.stub(RequestServices, 'request').rejects();
        expect(parsingTransactionDataFunction(mockResponse, TRANSACTION_APIS.Etherscan))
          .rejects.toThrow('Unable to get remote hash');
        stubRequest.restore();
      });
    });
  });
});
