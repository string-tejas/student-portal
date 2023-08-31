const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const parseEnvFile = require("./parseEnvFile");
parseEnvFile();
const sendEmail = require("./mail");

const path = require("path");
const PROTO_PATH = path.join(__dirname, "mail.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {});
const grpcObj = grpc.loadPackageDefinition(packageDefinition);
const mailPackage = grpcObj.mail;
const server = new grpc.Server();

server.addService(mailPackage.Mail.service, {
    sendEmail: async (call, callback) => {
        const { to, subject, text } = call.request;

        try {
            await sendEmail(to, subject, text);
            callback(null, { success: true, message: "Email sent" });
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: error.message,
            });
        }
    },
});

server.bind("127.0.0.1:50051", grpc.ServerCredentials.createInsecure());
console.log("gRPC server running at http://127.0.0.1:50051");
server.start();
