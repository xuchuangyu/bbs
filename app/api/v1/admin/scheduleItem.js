const Router=require('koa-router');
const { Schedule  } = require('../../../models/admin/schedule')
const { ScheduleItem } = require('../../../models/admin/scheduleItem')
const { AdminUser } =  require('../../../models/admin/user');

AdminUser.hasOne(ScheduleItem)
ScheduleItem.belongsTo(AdminUser)
const router= Router({
    prefix:'/api/v1/admin/scheduleItem',
})


module.exports = router;
