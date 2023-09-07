import socket

HOST = 'localhost'
PORT = 5000

client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect((HOST, PORT))

request = f"GET / HTTP/1.1\r\nHost: {HOST}:{PORT}\r\n\r\n"
client_socket.sendall(request.encode())

response = b""

while True:
    recv = client_socket.recv(1024)
    if not recv:
        break
    response += recv

print(response.decode())
client_socket.close()
