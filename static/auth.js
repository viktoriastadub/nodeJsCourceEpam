async function render(resp) {
    const json = await resp.json();
    lastresponce.innerHTML = JSON.stringify(json, null, 4);
}
const headers = new Headers();
headers.append('content-type', 'application/json');
loginbtn.addEventListener('click', evt => {
    const password = passwordinp.value;
    const login = logininp.value;
    fetch('/auth/google', {method: 'GET',headers, credentials: 'include', body: JSON.stringify({email:login, password})}).then(render).catch(() => lastresponce.innerHTML = 'credential is wrong');
});

getproducts.addEventListener('click', evt => {
    fetch('api/products',{credentials: 'include'}).then(render).catch(() => lastresponce.innerHTML = 'not access');
});