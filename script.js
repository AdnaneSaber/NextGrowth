let users = [
    {
        id: "123456789",
        createdDate: "2021-01-06T00:00:00.000Z",
        status: "En validation",
        firstName: "Mohamed",
        lastName: "Taha",
        userName: "mtaha",
        registrationNumber: "2584",
    },
    {
        id: "987654321",
        createdDate: "2021-07-25T00:00:00.000Z",
        status: "Validé",
        firstName: "Hamid",
        lastName: "Orrich",
        userName: "horrich",
        registrationNumber: "1594",
    },
    {
        id: "852963741",
        createdDate: "2021-09-15T00:00:00.000Z",
        status: "Rejeté",
        firstName: "Rachid",
        lastName: "Mahidi",
        userName: "rmahidi",
        registrationNumber: "3576",
    }
]
const templateMaker = ({ id, createdDate, status, firstName, lastName, userName, registrationNumber }) => {
    const fullDate = new Date(createdDate)
    const Month = ("0" + (fullDate.getMonth() + 1)).slice(-2)
    const Day = ("0" + fullDate.getDate()).slice(-2)
    const Year = fullDate.getFullYear()
    const colors = {
        'Validé': 'success',
        'En validation': 'warning',
        'Rejeté': 'danger'
    }
    const template = `
        <tr id="user-${id}">
            <td>${id}</td>
            <td>${Day}/${Month}/${Year}</td>
            <td><span class="${colors[status]}">${status}</span></td>
            <td>${lastName}</td>
            <td>${firstName}</td>
            <td>${userName}</td>
            <td>${registrationNumber}</td>
            <td><button onclick="deleteUser('${id}')"></button></td>
        </tr>
    `
    return template
}
const addUser = (user) => {
    const tablebody = document.querySelector('#table tbody')
    tablebody.innerHTML += templateMaker(user)
}
const deleteUser = (id) => {
    document.getElementById(`user-${id}`).remove()
    users = users.filter(el => el.id !== id)
}
const toggleModal = () => {
    const classes = document.getElementById("modalContainer").classList
    if (classes.contains("show")) {
        classes.remove('show')
    } else {
        classes.add('show')
    }
}
for (let i = 0; i < users.length; i++) {
    const element = users[i];
    addUser(element)
}
document.getElementById('modalcloser').addEventListener('click', () => {
    toggleModal()
})
document.getElementById('createdDate').value = new Date().toISOString()
document.getElementById('addForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const newuser = {id: new Date().getTime()}
    const form = new FormData(e.target)
    form.forEach((value, key) => {
        newuser[key] = value;
    });
    users.push(newuser)
    addUser(newuser)
    toggleModal()
    e.target.reset()
})