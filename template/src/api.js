//WEBPACK_CONIFG_HOST的值

export default {
    weeklist: WEBPACK_CONIFG_HOST + '/sys/mykbxt/api/getMyTimeTableList.do',
    daylist: WEBPACK_CONIFG_HOST + '/sys/mykbxt/api/queryDayAndFutureCourses.do',
    week: WEBPACK_CONIFG_HOST + '/sys/mykbxt/api/getSchoolCalendar.do',
    memberList: WEBPACK_CONIFG_HOST + '/sys/mykbxt/api/queryCourseMembers.do',
    geterr: WEBPACK_CONIFG_HOST + '/sys/mykbxt/api/queryErrorMessages.do',
    err: WEBPACK_CONIFG_HOST + '/sys/mykbxt/api/feedBackInfo.do',
    userInfo: WEBPACK_CONIFG_HOST + '/sys/itservicecommon/api/queryAppAndUserDatas.do'
}
