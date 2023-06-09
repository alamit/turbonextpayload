import withPayload from "@payloadcms/next-payload/dist/middleware/withPayload";
import util from "util";

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const handler = async (req, res) => {
  const { slug, filename } = req.query;
  if (!slug || !filename || req.method !== "GET") {
    return res.status(404).send({ message: "Not found" });
  }
  if (!req.payload) return res.status(500).send();
  const collections = req.payload.config.collections.filter(
    ({ upload, slug: name }) => !!upload.handlers && name === slug
  );
  if (!collections.length)
    return res.status(404).send({ message: "Not found" });
  const handlers = collections[0].upload.handlers;
  req.params = req.query;
  res.header = (headers) => {
    const adapted = new Map(Object.entries(headers));
    res.setHeaders(adapted);
  };
  const premises = handlers.map((handler) => util.promisify(handler));
  for (let promise of premises) {
    await promise(req, res);
  }

  return res.status(500).json({ message: "No response" });
};

export default withPayload(handler);
