
const {
    TodoList
} = require('../../models/todoList')
// const {} =require('@validators')
const {success} = require('../../lib/helper')
const {
    TodoListValidator,
    DelIdValidator
} =require('../../validators/validator')
const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/todoList'
})
router.post('/', async (ctx) => {
     const v = await new TodoListValidator().validate(ctx)
    const todoList = {
        title:v.get('body.title'),
        status: v.get('body.status')||0 
    }
    await TodoList.create(todoList)
    ctx.body={
        success:1,
        msg:'操作成功'
    }
})
router.put('/', async (ctx) => {
    const v = await new TodoListValidator().validate(ctx)
    const todoList = {
        title:v.get('body.title'),
        status: v.get('body.status')?1:0 
    }
    await TodoList.update(todoList,{
        where:{
            id:v.get('body.id'),
        },
    })
    ctx.body={
        success:1,
        msg:'操作成功'
    }
})
router.delete('/:id', async (ctx)=>{
    const v = await new DelIdValidator().validate(ctx)
    let datas = await TodoList.findOne({
        where:{
            id:v.get('path.id')
        }
    })

        await TodoList.update({del:1},{
            where:{
                id:v.get('path.id')
            },
        })
        ctx.body={
            success:1,
            msg:'操作成功'
        }
    
    // console.log(datas)
})
router.get('/',async (ctx,next)=>{
    let datas = await TodoList.findAll({
        where:{
            del:-1
        },
        order:[
            ["id","DESC"]
        ]
    });
    ctx.body = {
        success:1,
        msg:'操作成功',
        datas
    }
})
module.exports = router
