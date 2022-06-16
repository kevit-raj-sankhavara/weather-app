console.log("Client side js");

const form = document.querySelector("form");
const m1 = document.getElementById("m1");
const m2 = document.getElementById("m2");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    m1.innerText = "Getting data...";
    m2.innerText = "";
    m1.style.color = "black";

    const location = document.getElementById("location");
    if (!location.value) {
        m1.innerText = "Please enter some value";
    }
    else {
        const url = `http://localhost:3000/weather?address=${location.value}`;

        fetch(url)
            .then(response => response.json()
                .then((data) => {
                    // console.log(data)
                    if (data.err) {
                        m1.innerText = data.err;
                        m1.style.color = "red";
                        m2.style.color = "red";
                    } else {
                        m1.innerText = `Location : ${data.location}`;
                        m2.innerText = `Forecast : ${data.forecast}`;
                        m1.style.color = "green";
                        m2.style.color = "green";
                    }
                }))
        location.value = "";
    }
})