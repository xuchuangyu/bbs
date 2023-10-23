const Router=require('koa-router');
const moment = require('moment')
const { Schedule  } = require('../../../models/admin/schedule')
const { ScheduleItem } = require('../../../models/admin/scheduleItem')
const { addScheduleValidator } = require('../../../validators/admin/schedule')
const { AdminUser } =  require('../../../models/admin/user');

const { success } = require('../../../lib/helper')

Schedule.hasMany(ScheduleItem)
ScheduleItem.belongsTo(Schedule)

const router= Router({
    prefix:'/api/v1/admin/schedule',
})

router.get('/pages',async (ctx)=>{
    const { pageNumber,pageSize } = ctx.query;
    const data= await Schedule.findAndCountAll({
        offset:parseInt(pageSize)*(parseInt(pageNumber)-1),
        limit:parseInt(pageSize)||10,
    })
    ctx.body={
        code:200,
        data
    }
})

router.post('/',async(ctx)=>{
    const v = await new  addScheduleValidator().validate(ctx)
    Schedule.create({
        name: v.get('body.name'),
        setting: v.get('body.setting'),
        type: v.get('body.type'),
        state: 0,
    })
    success()
})


router.get('/:id/byId',async (ctx)=>{
    const {id} = ctx.params;
    const data= await Schedule.findOne({
        where:{
            id
        },
        attributes:{
            exclude:['created_at','deleted_at','updated_at'],
        }
    })
    ctx.body={
        code:200,
        data,
        msg:'一切ok'
    }
})

router.get('/record',async (ctx)=>{
    const { startDate,endDate,scheduleId } = ctx.query;
    const data= await Schedule.findOne({
        where:{
            id:scheduleId
        },
        attributes:{
            exclude:['created_at','deleted_at','updated_at'],
        }
    })
    const day=moment(endDate).add(1,'day').diff(moment(startDate),'day');
    if(day<=0){
        // 时间有问题、

    }
      const ScheduleItems= await data.getScheduleItems({
          group:['adminUserId'],
          rows:true
      })
    const headerDates=[];
    const rows=[]
    const after={
        headerDates:[],
        row:[],
    }
    const before={
        headerDates:[],
        row:[],
    }
    const dateStatistics=[];
    const week={1:'周一',2:'周二',3:'周三',4:'周四',5:'周五',6:'周六',7:'周日'}
        // 没有班表记录

        for(let i=0;i<day;i++){
                if(moment(startDate).add(i+1,'day').isBefore(moment())){
                    before.headerDates.push({
                        date:moment(startDate).add(i,'day').format('YYYY-MM-DD'),
                        week: week[moment(startDate).add(i,'day').isoWeekday()]
                    })
                }else{
                    after.headerDates.push({
                        date:moment(startDate).add(i,'day').format('YYYY-MM-DD'),
                        week: week[moment(startDate).add(i,'day').isoWeekday()]
                    })
                }
                dateStatistics.push({
                    date:moment(startDate).add(i,'day').format('YYYY-MM-DD'),
                    total:0
                })
        }

        // for(let [j,item2] of ScheduleItems.entries()) {

        headerDates.push(...after.headerDates,...before.headerDates)
        if(after.row.length>0&&before.row.length>0){
            rows.push({
                positionId:'',
                dateItems:[...after.row,...before.row]
            })
        }


        // data.get

    // for(let i=0;i<day;i++){
    //     const ScheduleItemByDate= await data.getScheduleItems({
    //         rows:true
    //     })
    //
    //     if(moment(startDate).add(i+1,'day').isBefore(moment())){
    //         before.headerDates.push({
    //             date:moment(startDate).add(i,'day').format('YYYY-MM-DD'),
    //             week: week[moment(startDate).add(i,'day').isoWeekday()]
    //         })
    //     }else{
    //         after.headerDates.push({
    //             date:moment(startDate).add(i,'day').format('YYYY-MM-DD'),
    //             week: week[moment(startDate).add(i,'day').isoWeekday()]
    //         })
    //     }
    //     dateStatistics.push({
    //         date:moment(startDate).add(i,'day').format('YYYY-MM-DD'),
    //         total:ScheduleItemByDate.length
    //     })
    // }
    ctx.body={
        code:200,
        data:{
            headerDates,
            rows,
            "statistics": {
                "dateStatistics": dateStatistics,
                "totalNum": 0
            }
        },
        msg:'一切ok'
    }
})
router.post('/record',async (ctx)=>{
    const {scheduleId,rows} = ctx.request.body;
    const data= await Schedule.findOne({
        where:{
            id:scheduleId
        },
        attributes:{
            exclude:['created_at','deleted_at','updated_at'],
        }
    })
    for(let rowItem of rows){
        const { positionId,dateItems } = rowItem

        // if(positionId){}
    }
    success()
})

module.exports = router;
