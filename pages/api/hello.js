// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      res.status(200).json({ name: "GET MAPPING" });
      break;
    case "POST":
      res.status(200).json({ name: "POST MAPPING" });
      break;
    case "DELETE":
      res.status(200).json({ name: "DELETE MAPPING" });
      break;
    default:
      res.status(200).json({ name: "OTHER MAPPING" });
      break;
  }
}
