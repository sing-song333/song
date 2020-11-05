var all = JSON.parse(localStorage.getItem('list'))
var tab = document.querySelector('.table-bordered')
var btn = document.querySelector('.btn-default1')
function init() {
    var str = `
        <td>username</td>
        <td> password</td>
        <td>修改</td>`
    all.forEach(function (v, i) {
        str += `
        <tr>
            <td>${v.name}</td>
            <td>${v.password}</td>
            <td><button class="change">修改</button><button class = "delete">删除</button></td>
        </tr>
        `
    })
    tab.innerHTML = str
}
init()
add.onclick = function (e) {
    var e = e || window.event
    if (e.target.tagName == 'BUTTON') {
        var obj = {
            name: uname.value,
            password: password1.value
        }
        if (all) {
            all.push(obj)
            localStorage.setItem('list', JSON.stringify(all))
        } else {
            localStorage.setItem('list', JSON.stringify([obj]))
        }
        init()
    }
}
tab.onclick = function(e){
    var e = e || window.event
    if(e.target.className == 'delete'){
        var deletes = [...document.querySelectorAll('.delete')]
        var index = deletes.indexOf(e.target)
        all.splice(index,1)
        localStorage.setItem('list',JSON.stringify(all))
        e.target.parentElement.parentElement.remove()
    }
    if(e.target.className == 'change'){
        var changes = [...document.querySelectorAll('.change')]
        var that = e.target
        var name = that.parentElement.previousElementSibling.previousElementSibling.innerText
        var psder = that.parentElement.previousElementSibling.innerText
        uname1.value = name
        psd.value = psder
        btn.onclick = function(){
            var index = changes.indexOf(that)
            var name = uname1.value
            var psder = psd.value
            that.parentElement.previousElementSibling.previousElementSibling.innerText = name
            that.parentElement.previousElementSibling.innerText = psder
            all.splice(index,1,{name:name,password:psder})
            localStorage.setItem('list',JSON.stringify(all))
        }
    }
}
