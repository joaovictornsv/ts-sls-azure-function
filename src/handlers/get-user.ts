import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { api } from '../utils/api';


export const handler: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  const { name } = req.query;
  context.log(`Get ${name} data`);
  if (!name) {
    context.res = {
      status: 404,
      headers: {
        'Content-type': 'application-json',
      },
      body: { error: 'Provide a username' },
    };
  } else {
    const { data } = await api.get(`/${name}`);

    context.res = {
      headers: {
        'Content-type': 'application-json',
      },
      body: { user: name, data },
    };
  }
};