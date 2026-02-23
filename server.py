import http.server
import socketserver
import os

PORT = 8002

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_GET(self):
        if self.path == '/api/images':
            images = []
            if os.path.exists('images'):
                for f in os.listdir('images'):
                    if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp', '.gif')) and os.path.isfile(os.path.join('images', f)):
                        images.append(f"images/{f}")
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            import json
            self.wfile.write(json.dumps(images).encode('utf-8'))
        else:
            super().do_GET()

    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.end_headers()

    def do_POST(self):
        if self.path == '/save':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            with open('mockData.js', 'wb') as f:
                f.write(post_data)
                
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'Saved successfully')
        else:
            self.send_error(404, "Not Found")

# Zorg ervoor dat we in de juiste map zitten
os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
    print(f"Serving at port {PORT} with Save functionality")
    httpd.serve_forever()
