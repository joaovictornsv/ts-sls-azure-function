import { Context } from '@azure/functions';

export const contextMock = {
  log: (u) => u
} as Context;