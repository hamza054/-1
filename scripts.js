
    var note = new Note(document.getElementById("myInput").value, document.getElementById('realDate').value);

function Note(text, date) {
    this.text = text;
    this.date = date;
}

/*validate*/
function validate(){
    var write = document.getElementById('myInput').value;
    var date = document.getElementById('realDate').value;
   
    

    if (write == "") {
        alret ('You must write text!');
    }   else {
        return true;
    }
}


/*add note to screen */
function newNote() {
    var note = new Note(document.getElementById("myInput").value, document.getElementById('realDate').value);
    console.log(note);
    if(validate(note)) {
        writeNotee(note);
        store().addStorge(note);
    }
    
}

function writeNotee(note) {
    var write = note.text;
    var date = note.date;



    var noteScreen = document.createElement('div');
    noteScreen.className = 'test';
    noteScreen.innerHTML = '<br>' + write + '<br>' + date + '<br>' + '<br>';
    var trash = document.createElement('button');
    trash.className = 'glyphicon glyphicon-trash';
    var bigNote = document.getElementById('bigdiv');
    noteScreen.appendChild(trash);
    bigNote.appendChild(noteScreen);
    trash.addEventListener('click', function (){
        var tempNotes;
        this.parentNode.remove(noteScreen);
        tempNotes = store().getStorage();
        for( var i = 0; i<tempNotes.length; i++) {
            if (tempNotes[i].date === note.date && tempNotes[i].text=== note.text) {
                tempNotes.splice(i, 1);
                localStorage.setItem("tasks",JSON.stringify(tempNotes));
        }
    }
});
}

var store = function (){
    function addToLocalStorge(note) {
        var storedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (storedTasks == null){
            storedTasks = [];
        }
        var write = note.text;
        var date = note.date;
        var task1 = {
            'text': date,
            'date': date
        };
        localStorage.setItem("task",JSON.stringify(task1));
        storedTasks.push(note);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    function getFromLStorgee (){
        var temp = JSON.parse(localStorage.getItem('tasks'));
        return temp;
    }
    return {
        addStorge: addToLocalStorge,
        getStorage: getFromLStorgee
    }
};

(function begin() {
    var addBtn = document.getElementById('add');
    addBtn.addEventListener('click',newNote);
    loading();
}) ();

function loading (){
    var oldTasks = store().getStorage();
    for( var i = 0; i < oldTasks.length; i++) {
        writeNotee(oldTasks[i]);
    }
}

