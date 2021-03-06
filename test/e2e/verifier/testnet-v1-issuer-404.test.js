import { Certificate, VERIFICATION_STATUSES } from '../../../src';
import FIXTURES from '../../fixtures';
import sinon from 'sinon';
import * as explorer from '../../../src/explorers/explorer';

describe('given the certificate\'s issuer returns a 404', function () {
  let certificate;
  let result;

  beforeAll(async function () {
    sinon.stub(explorer, 'getTransactionFromApi').resolves({
      remoteHash: '68f3ede17fdb67ffd4a5164b5687a71f9fbb68da803b803935720f2aa38f7728',
      issuingAddress: '1Q3P94rdNyftFBEKiN1fxmt2HnQgSCB619',
      time: '2016-10-03T19:37:59.141Z',
      revokedAddresses: [
        '1Q3P94rdNyftFBEKiN1fxmt2HnQgSCB619'
      ]
    });
    certificate = new Certificate(FIXTURES.TestnetV1IssuerUrl404);
    await certificate.init();
    result = await certificate.verify();
  });

  afterAll(function () {
    sinon.restore();
  });

  it('should fail', function () {
    expect(result.status).toBe(VERIFICATION_STATUSES.FAILURE);
  });

  it('should expose the error message', function () {
    expect(result.message).toBe('Unable to get issuer profile');
  });
});
