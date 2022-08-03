import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import type { NextApiRequest } from "next";

export interface NextApiRequestExtended extends NextApiRequest {
  token: DecodedIdToken | null;
}