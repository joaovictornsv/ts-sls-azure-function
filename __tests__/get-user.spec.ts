import { expect } from 'chai';
import * as sinon from 'sinon';
import { handler } from '../src/handlers/get-user';
import { api } from '../src/utils/api';
import { contextMock } from './mocks/contextMock';
import { requestMock } from './mocks/requestMock';

describe('get-user', () => {
  let sandbox: sinon.SinonSandbox;
  let apiMock: sinon.SinonStub;

  before(() => {
    sandbox = sinon.createSandbox();
    apiMock = sinon.stub(api, 'get');
    apiMock.returns({ data: 'mock-user-data' })
  })

  beforeEach(() => {
    sandbox.restore();
    requestMock.params = {}
  })

  it('should return a user', async () => {
    requestMock.params = { name: 'mock-name' };

    await handler(contextMock, requestMock);

    expect(contextMock.res.body).to.have.property('data').to.equal('mock-user-data');
    expect(contextMock.res.body).to.have.property('user').to.equal('mock-name');
  });

  it('should not return a user if name not provided', async () => {
    await handler(contextMock, requestMock);

    expect(contextMock.res.body).to.have.property('error').to.equal('Provide a username');
  });
});