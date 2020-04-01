import fetch from "isomorphic-unfetch";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    default:
      console.log(`Welp, don't know how to handle ${req.method}`);
      res.status(500).end();
      break;
  }
};

const getHeaders = () => {
  return {
    Authorization: `Bearer ${process.env.FAUNA_SECRET}`,
    "Content-type": "application/json",
    Accept: "application/json"
  };
};

const handleGet = async (req, res) => {
  // GET /api/user/4/prices
  // query.userId = 4
  // https://nextjs.org/docs/routing/dynamic-routes

  const query = `query Users { 
    users {
      users: data {
        _id
        island
        name
      }
    }
  }`;

  const result = await fetch(process.env.FAUNA_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ query })
  });
  const json = await result.json()

  res.status(200).json(json?.data?.users ?? { users: []});
};
