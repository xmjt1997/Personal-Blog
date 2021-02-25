
(function(){
    var obj = {
        name:'lcz',
        age:24
    }
    
    function add(obj){
        console.log(obj.name,obj.age);
    }
    window.obj=obj
    window.add = add
})(window)

