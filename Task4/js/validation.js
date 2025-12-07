function signupUser() {
    let name = document.getElementById("signupName").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value.trim();

    if (name === "" || email === "" || password === "") {
        alert("❗ Please fill all fields.");
        return false;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);

    alert("🎉 Account created successfully!");
    window.location.href = "login.html";
    return false;
}

function loginUser() {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let savedEmail = localStorage.getItem("userEmail");
    let savedPassword = localStorage.getItem("userPassword");

    if (email === "" || password === "") {
        alert("❗ Please enter both email and password.");
        return false;
    }

    if (email === savedEmail && password === savedPassword) {
        alert("✅ Login successful!");
        window.location.href = "index.html"; // Redirect to dashboard/home
    } else {
        alert("❌ Incorrect email or password.");
    }

    return false;
}
