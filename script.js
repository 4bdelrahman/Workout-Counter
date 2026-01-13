  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getDatabase, ref, set, onValue, push, update, remove } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-database.js";
  const firebaseConfig = {
    databaseURL: "https://workouts-counter-default-rtdb.europe-west1.firebasedatabase.app/"
    };
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const referenceInDB = ref(database , 'Workouts-num-db')
 
  

const incrementBtn = document.getElementById("increment-btn")
const decrementBtn = document.getElementById("decrement-btn")
const numberInputEl = document.getElementById("number-input-el")
const addInputBtn = document.getElementById("add-input-btn")
const workoutsEl = document.getElementById("workouts-el")



 let numberOfWorkouts
onValue(referenceInDB , function(snapshot) {
    if (snapshot.exists()) {
    const dataObject = snapshot.val()
    const data = Object.values(dataObject)
    numberOfWorkouts = data[0]
    render()
    }
})

incrementBtn.addEventListener("click" , function() {
    numberOfWorkouts += 1
    remove(referenceInDB)
    push (referenceInDB , numberOfWorkouts)
    render()
})
decrementBtn.addEventListener("click" , function() {
    numberOfWorkouts -= 1
    remove(referenceInDB)
    push (referenceInDB , numberOfWorkouts)
    render()
})
addInputBtn.addEventListener("click" , function () {
    numberOfWorkouts =   Number(numberInputEl.value)
    remove(referenceInDB)
    push (referenceInDB , numberOfWorkouts)
    render()
    numberInputEl.value = ""
})




function render() {
    workoutsEl.innerHTML = `<strong>${numberOfWorkouts}</strong> Workouts`

}

