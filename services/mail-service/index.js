require("dotenv").config();

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const sendEmail = require("./mail");

const PROTO_PATH = __dirname + "/mail.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const mailProto = grpc.loadPackageDefinition(packageDefinition).mail;
const server = new grpc.Server();

server.addService(mailProto.Mail.service, {
    sendEmail: async (call, callback) => {
        const { to, subject, body } = call.request;
        try {
            await sendEmail(to, subject, body);
            callback(null, { success: true, message: "Email sent" });
        } catch (error) {
            callback({ code: grpc.status.INTERNAL, details: error });
        }
    },
});

server.bindAsync(
    `127.0.0.1:${process.env.PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if (err != null) {
            return console.error(err);
        }
        server.start();
        console.log(
            `Mail service running at http://127.0.0.1:${process.env.PORT}`
        );
    }
);
