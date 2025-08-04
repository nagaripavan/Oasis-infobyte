async function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const confirmpassword = document.getElementById('reg-confirmpassword').value;
    
    if(password==confirmpassword){
        const res = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
    
        const data = await res.json();
        alert(data.message);
    }else{
        alert("Password is not matching !")
    }


    
}

async function login() {
    const username = document.getElementById('log-username').value;
    const password = document.getElementById('log-password').value;

    try {
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: 'include'
        });

        const data = await res.json();

        if (res.ok) {
            alert(`Welcome ${username}!`);
            window.location.href = 'tributepage.html';
        } else {
            alert(data.message|| "Login failed."); 
        }
    } catch (err) {
        alert('Something went wrong. Please try again.');
        console.error(err);
    }
}
