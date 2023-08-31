import grpc from "grpc";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { URL } from "url";

const __dirname = new URL(".", import.meta.url).pathname;

const PROTO_PATH = path.join(__dirname, "mail.proto").substring(1);

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});

const grpcObj = grpc.loadPackageDefinition(packageDefinition);

const mailPackage = grpcObj.mail;

const client = new mailPackage.Mail(
    "127.0.0.1:50051",
    grpc.credentials.createInsecure()
);

const sendEmail = async (email, subject, message) => {
    try {
        console.log("About to invoke sendEmail");
        const result = await new Promise((resolve, reject) => {
            client.sendEmail(
                {
                    to: email,
                    subject: subject,
                    text: message,
                },
                (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(res);
                }
            );
        });
        console.log("Result", result);

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

export default sendEmail;
