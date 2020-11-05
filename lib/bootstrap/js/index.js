$(function () {
    var all = JSON.parse(localStorage.getItem('list'))
    $('.btn-default').click(function () {
        var obj = {
            name: $('#uname').val(),
            password: $('#password1').val()
        }
        if (all) {
            all.push(obj)
            localStorage.setItem('list', JSON.stringify(all))
        } else {
            localStorage.setItem('list', JSON.stringify([obj]))
        }
        init()
    })
   function init(){
    var str = `
    <td>username</td>
    <td>password</td>
    <td>修改</td> `
    $.each(all, function (i, v) {
        str += `<tr>
            <td>${v.name}</td>
            <td>${v.password}</td>
            <td><button class="change">修改</button><button class = "delete">删除</button></td>
            </tr>`
    })
    $('.table').html(`<tbody>${str}</tbody>`)
   }
   init()
   $('.table-bordered').on('click',function(e){
        if(e.target.className == 'delete'){
            var index = $('.delete').index($(e.target))
            $(`tr:eq(${index + 1})`).remove()
            all.splice(index, 1)
            localStorage.setItem('list', JSON.stringify(all))
        }
        if(e.target.className == 'change'){
            var index = $('.change').index($(e.target))
            var name = $(e.target).parents(`tr`).children().eq(0).text()
            var psd = $(e.target).parents(`tr`).children().eq(1).text()
            $('#uname1').val(`${name}`)
            $('#psd').val(`${psd}`)
            $('.btn-default1').off('click')
            var that = e.target
            $('.btn-default1').on('click', function () {
                var name = $('#uname1').val()
                var psd = $('#psd').val()
                all.splice(index, 1, {name: name,password: psd})
                localStorage.setItem('list', JSON.stringify(all))
                $(that).parents(`tr`).children().eq(0).text(`${name}`)
                $(that).parents(`tr`).children().eq(1).text(`${psd}`)
            })
        }
   })
})
