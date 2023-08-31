import HttpRequest from "../utilities/httpRequest";
// const URL = process.env.NEXT_PUBLIC_URL;
const URL = "https://64ef8878219b3e2873c49be4.mockapi.io/api/collectit";
// const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
// const TOKEN = "rdflhu4j5rwr1i5uv68dkxfso4cuy7quz3o3puum";

import { uid } from "uid";

const httpRequest = new HttpRequest();
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  // Authorization: `Bearer ${TOKEN}`,
};

export default class UseCollectionService {
  getCollectionsConfigurations = async () => {
    const configurations = await httpRequest.get(URL + "/configurations", {
      headers,
    });
    return configurations;
  };

  getCollections = async () => {
    const collections = await httpRequest.get(URL + "/collections", {
      headers,
    });
    return collections;
  };

  createCollection = async ({ payload, collections }) => {
  
    if (collections?.length > 0) {
      (payload.id = uid(16)), (payload.createdAt = new Date().toLocaleString());
      payload.lastUpdated = new Date().toLocaleString();
      collections[0]?.collections?.push(payload);
      // return console.log(collections);
      const updateResult = httpRequest.update(
        URL + "/collections",
        JSON.stringify(collections[0]),
        {
          headers,
        }
      );

      return updateResult;
    } else {
      (payload.id = uid(16)), (payload.createdAt = new Date().toLocaleString());
      payload.lastUpdated = new Date().toLocaleString();
      const result = httpRequest.create(
        URL + "/collections",
        JSON.stringify({
          collections: [payload],
        }),
        {
          headers,
        }
      );
      return result;
    }
  };

  updateCollection = async (body) => {
    body.lastUpdated = "DATETIME";

    const result = await httpRequest.update(
      URL + "/collections",
      JSON.stringify({
        body: JSON.stringify({
          data: body,
        }),
      }),
      {
        headers,
      }
    );
    return result;
  };

  deleteCollection = async (id) => {
    const result = await httpRequest.delete(URL, id + "/collections", {
      headers,
    });
    return result;
  };
}
