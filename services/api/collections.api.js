import HttpRequest from "../utilities/httpRequest";
// const URL = process.env.NEXT_PUBLIC_URL;
const URL = "https://sheetdb.io/api/v1/7ff55d2lxc4hr";
// const TOKEN = process.env.NEXT_PUBLIC_TOKEN;
const TOKEN = "rdflhu4j5rwr1i5uv68dkxfso4cuy7quz3o3puum";

const httpRequest = new HttpRequest();
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Bearer ${TOKEN}`,
};

export default class UseCollectionService {
  getCollectionsConfigurations = async () => {
    const configurations = await httpRequest.get(
      URL + "?sheet=configurations",
      {
        headers,
      }
    );
    return configurations;
  };

  getCollections = async () => {
    const collections = await httpRequest.get(URL + "?sheet=collections", {
      headers,
    });
    return collections;
  };

  createCollection = async (body) => {
    body.id = "INCREMENT";
    body.createdAt = "DATETIME";
    body.lastUpdated = "DATETIME";

    const result = await httpRequest.create(
      URL + "?sheet=collections",
      JSON.stringify({
        data: [body],
      }),
      {
        headers,
      }
    );
    return result;
  };

  updateCollection = async (body) => {
    body.lastUpdated = "DATETIME";

    const result = await httpRequest.update(
      URL + "?sheet=collections",
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
    const result = await httpRequest.delete(URL, id + "?sheet=collections", {
      headers,
    });
    return result;
  };
}
