from flask import Flask, request, jsonify, send_from_directory
import time

app = Flask(__name__, static_folder='.', static_url_path='')

# Главная страница
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# Эндпоинт OSINT (демо)
@app.route('/api/osint', methods=['POST'])
def osint():
    data = request.json
    username = data.get("username", "").strip()
    phone = data.get("phone", "").strip()

    results = []

    if username:
        results.append(f"[+] Checking Telegram: @{username}")
        results.append(f"[✓] Public profile MAY exist")
        results.append(f"[→] https://t.me/{username}")

    if phone:
        results.append(f"[+] Analyzing phone number: {phone}")
        if phone.startswith("+"):
            results.append("[✓] International format detected")
        else:
            results.append("[!] Missing country code")
        results.append(f"[i] Length: {len(phone)}")

    if not username and not phone:
        results.append("[!] No input provided")

    time.sleep(1)  # имитация работы
    results.append("[✓] Scan completed")

    return jsonify(results)

if name == '__main__':
    app.run(host='0.0.0.0', port=10000)
