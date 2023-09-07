import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { config } from "dotenv";
config();

import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const PROTO_PATH = __dirname + "../proto/mail.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const mailProto = grpc.loadPackageDefinition(packageDefinition).mail;

const client = new mailProto.Mail(
    `127.0.0.1:${process.env.MAIL_PORT}`,
    grpc.credentials.createInsecure()
);

const sendEmail = async (to, subject, body) => {
    try {
        const result = await new Promise((resolve, reject) => {
            client.sendEmail({ to, subject, body }, (err, response) => {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        });
        console.log("RPC result", result);
        return result;
    } catch (error) {
        console.log(error);
        // throw new Error(error);
    }
};

export default sendEmail;
