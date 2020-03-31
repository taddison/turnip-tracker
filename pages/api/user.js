import fetch from "isomorphic-unfetch";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handlePost(req, res);
      break;
    default:
      console.log(`Welp, don't know how to handle ${req.method}`);
      res.status(500).end();
      break;
  }

  res.status(201).end();
};

const getHeaders = () => {
  return {
    Authorization: `Bearer ${process.env.FAUNA_SECRET}`,
    "Content-type": "application/json",
    Accept: "application/json"
  };
};

const handlePost = async (req, res) => {
  const { name, island } = req.body;

  const query = `mutation CreateUser($island: String!, $name: String!) {
    createUser(data: {
      island: $island,
      name: $name
    }) {
      _id
    }
  }`;

  await fetch(process.env.FAUNA_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      query,
      variables: { island, name }
    })
  });

  res.status(201).end();
};
