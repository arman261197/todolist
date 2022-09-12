let button=document.querySelector('.add-from-button')
let input=document.getElementById('text-of-input')
let wrapper=document.querySelector('.wrapper')

let task;
let todo=[];

function Tasks(description) {
	this.description=description;
	this.completed=false;
}

!localStorage.task? task=[]: task=JSON.parse(localStorage.getItem('task'))

updatelocal=()=>{
	localStorage.setItem('task', JSON.stringify(task))
}


button.addEventListener('click', ()=>{
	task.push(new Tasks(input.value)); 
	updatelocal(); 
	input.value="";
	fillHTML()
});

let create = (tasks, index)=>{
	return `
	<div class="wrapper-todo ${tasks.completed? "checked":""}">
      <div class="todo">${tasks.description}</div>
      <div class="buttons">
        <input onclick=completedtasks(${index}) type="checkbox" name="" ${tasks.completed? "checked":""}>
        <button onclick=deletetasks(${index}) class="delete">Удалить</button>
      </div>
    </div>
	`
}

let deletetasks=(index)=>{
	todo[index].classList.add('animation')
	setTimeout(()=> {task.splice(index, 1);
	updatelocal();
	fillHTML()}, 500)
}

let filteredtasks=()=>{
	let active=task.length&&task.filter(item=>item.completed==false);
	let complete=task.length&&task.filter(item=>item.completed==true);
	task=[...active, ...complete];
}

let completedtasks=(index)=>{
	task[index].completed=!task[index].completed;
	if(task[index].completed) {
		todo[index].classList.add('checked');
	}
	else {
		todo[index].classList.remove('checked');
	}
	updatelocal();
	fillHTML()
}

let fillHTML=()=>{
	wrapper.innerHTML="";
	if(task.length>0) {
		filteredtasks();
		task.forEach((item, index)=>{
			wrapper.innerHTML+=create(item, index)
		})
		todo=document.querySelectorAll('.wrapper-todo')
	}
}

fillHTML()

