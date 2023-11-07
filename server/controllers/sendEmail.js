import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import { config } from "dotenv";
config();

import * as url from "url";
import lamportClock from "../index.js";
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
    `${process.env.MAIL_PORT}`,
    grpc.credentials.createInsecure()
);

const sendEmail = async (to, subject, body) => {
    const time = lamportClock.getTime();
    try {
        const result = await new Promise((resolve, reject) => {
            client.sendEmail({ to, subject, body, time }, (err, response) => {
                if (err) {
                    reject(err);
                }
                resolve(response);
            });
        });
        console.log("RPC result", result);
        if (lamportClock.getTime() < result.time - 1) {
            lamportClock.updateTime(result.time);
        }

        return result;
    } catch (error) {
        console.log(error);
        // throw new Error(error);
    }
};

export default sendEmail;
