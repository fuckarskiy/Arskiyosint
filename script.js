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

    print("[+] Connecting to ARSKIY core...");
    await sleep(500);

    try {
        const response = await fetch("/api/osint", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                phone: phone
            })
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();

        for (let line of data) {
            await sleep(350);
            print(line);
        }

    } catch (err) {
        print("[-] Connection failed");
        print("[!] Server is unreachable");
        console.error(err);
    }
}
