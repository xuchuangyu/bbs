const Router=require('koa-router');
const { Schedule  } = require('../../../models/admin/schedule')
const { ScheduleItem } = require('../../../models/admin/scheduleItem')
const { cheduleData } = require('../../../models/admin/scheduleData')

Schedule.hasMany(ScheduleItem)
const router= Router({
    prefix:'/api/v1/admin/scheduleItem',
})


module.exports = router;
