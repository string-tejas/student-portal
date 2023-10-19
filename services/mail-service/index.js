require("dotenv").config();

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const sendEmail = require("./mail");
const LamportClock = require("./lamport");
const lamportClock = new LamportClock();

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
        const { to, subject, body, time } = call.request;
        try {
            await sendEmail(to, subject, body);
            if (time) {
                lamportClock.updateTime(time);
            } else {
                lamportClock.tick();
            }
            callback(null, {
                success: true,
                message: "Email sent",
                time: lamportClock.getTime(),
            });
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
        lamportClock.tick();
    }
);
