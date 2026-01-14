const terminal = document.getElementById("terminal");

function print(text) {
    terminal.innerHTML += text + "<br>";
    terminal.scrollTop = terminal.scrollHeight;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runOSINT() {
    terminal.innerHTML = "";

    const username = document.getElementById("username").value.trim();
    const phone = document.getElementById("phone").value.trim();

    print("[+] Initializing OSINT module...");
    await sleep(600);

    if (username) {
        print(`[+] Checking Telegram: @${username}`);
        await sleep(600);
        print(`[✓] Public profile MAY exist`);
        print(`[→] https://t.me/${username}`);
    }

    if (phone) {
        await sleep(600);
        print(`[+] Analyzing phone number`);
        print(phone.startsWith("+")
            ? "[✓] International format detected"
            : "[!] Missing country code");
        print(`[i] Length: ${phone.length}`);
    }

    if (!username && !phone) {
        print("[!] No input provided");
    }

    await sleep(400);
    print("[✓] Scan completed");
}
